let memberFilter='', horizon=30, mapSegment='', mapUF='', mapRoute='', mapClient='';
function localDay(){
  const d=new Date();
  return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');
}
function teamMember(id){return state.members.find(m=>m.id===id)}
function activeMembers(){return state.members.filter(m=>m.active!==false)}
function initials(name){return name.split(/\s+/).filter(Boolean).map(v=>v[0]).filter((v,i,a)=>!i||i===a.length-1).join('')}
function avatar(m){return `<span class="person-avatar" style="--person:${m.color}">${esc(initials(m.name))}</span>`}
function memberOptions(selected,all=false){
  return (all?'<option value="">Toda a equipe</option>':'')+state.members.filter(m=>m.active!==false||m.id===selected).map(m=>`<option value="${m.id}" ${selected===m.id?'selected':''}>${esc(m.name)}</option>`).join('');
}
function mockPrograms(){
  return DEMO.programs.map(([owner,origin,destination,selected,offset],i)=>({
    id:'programa'+i,owner,origin,destination,selected,start:dayOfTrip(nextMonday(),offset),end:dayOfTrip(nextMonday(),offset+2),
    name:'Visitas em '+destination.split(',')[0],segment:'Todos'
  }));
}
function scheduled(t){
  const today=localDay();
  return t.end>=today && t.start<=dayOfTrip(today,horizon-1) && completed(t)<t.selected.length;
}
function memberTrips(){const ids=new Set(activeMembers().map(m=>m.id));return state.trips.filter(t=>ids.has(t.owner)&&(!memberFilter||t.owner===memberFilter)&&scheduled(t)).sort((a,b)=>a.start.localeCompare(b.start))}
function memberClients(){const ids=new Set(activeMembers().map(m=>m.id));return DEMO.clients.filter(c=>ids.has(c.owner)&&(!memberFilter||c.owner===memberFilter))}
function average(trips){
  return trips.length?(trips.reduce((n,t)=>n+t.selected.length,0)/trips.length).toLocaleString('pt-BR',{maximumFractionDigits:1}):'—';
}
function sidebarTeam(){
  $('#teamList').innerHTML=activeMembers().map(m=>`<button class="person-link ${m.id===memberFilter?'chosen':''}" data-person="${m.id}" aria-pressed="${m.id===memberFilter}">${avatar(m)}${esc(m.name)}</button>`).join('');
}
function teamPage(){
  const people=activeMembers().filter(m=>!memberFilter||m.id===memberFilter),clients=memberClients(),trips=memberTrips();
  const stats=[[clients.length,'Clientes na carteira'],[trips.length,'Viagens programadas'],[average(trips),'Clientes por viagem']];
  return (memberFilter?'<button class="back-link" data-person="">← Painel de gestão</button>':'')+titleBlock(memberFilter?esc(teamMember(memberFilter).name):'Painel de gestão',memberFilter?esc(teamMember(memberFilter).region):'Faturamento das carteiras e atividade de campo do pós-vendas.',`<button class="button" data-manage>Configurar equipe</button><button class="button primary" data-action="new">${icon('plus')}${memberFilter?'Criar rota para '+esc(teamMember(memberFilter).name.split(' ')[0]):'Planejar viagem'}</button>`)+historicalPanel()+
    `<h2 class="operation-title">Planejamento da equipe</h2><div class="team-filters"><label>Responsável<select id="teamOwner">${memberOptions(memberFilter,true)}</select></label><label>Período<select id="horizon">${[7,30,90].map(n=>`<option value="${n}" ${n===horizon?'selected':''}>Próximos ${n} dias</option>`).join('')}</select></label></div>
    <section class="team-stats">${stats.map(([number,label])=>`<div><span>${label}</span><strong>${number}</strong></div>`).join('')}</section>
    <section class="team-sheet"><header><h2>Distribuição das carteiras</h2><a href="#mapa" class="button small">Ver no mapa ${icon('map')}</a></header><div class="table-scroll"><table><thead><tr><th>Responsável</th><th>Clientes</th><th>Com visita prevista¹</th><th>Viagens</th><th>Clientes / viagem</th></tr></thead><tbody>${people.map(m=>{
      const portfolio=clients.filter(c=>c.owner===m.id), booked=trips.filter(t=>t.owner===m.id), stops=new Set(booked.flatMap(t=>t.selected));
      const count=portfolio.filter(c=>stops.has(c.id)).length;
      return `<tr><th><button class="who" data-person="${m.id}">${avatar(m)}<span>${esc(m.name)}<small>${esc(m.region)}</small></span></button></th><td>${portfolio.length}</td><td><span class="coverage"><i style="width:${portfolio.length?count/portfolio.length*100:0}%"></i></span>${count}</td><td>${booked.length}</td><td>${average(booked)}</td></tr>`;
    }).join('')}</tbody></table></div><p class="sheet-note">¹ Clientes distintos da carteira com parada prevista em viagem do responsável no período.</p></section>
    <section class="team-sheet"><header><h2>Próximas viagens</h2><button class="button small" data-action="new">${icon('plus')}Planejar viagem</button></header>${trips.length?trips.map(t=>`<button class="upcoming" data-trip="${t.id}"><time>${dateLabel(t.start)}</time><span><strong>${esc(t.origin.split(',')[0])} → ${esc(t.destination.split(',')[0])}</strong><small>${esc(teamMember(t.owner).name)} · ${plural(t.selected.length,'cliente')}</small></span>${icon('chevron')}</button>`).join(''):'<p class="sheet-note">Nenhuma viagem programada neste período.</p>'}</section>`;
}
function manageTeam(){
  openModal(modalHeading('Configurar equipe','Selecione quem aparece no painel e no mapa. Os roteiros ficam no histórico.')+`<form id="manageTeam"><div class="roster">${state.members.map(m=>`<label><input type="checkbox" name="included" value="${m.id}" ${m.active!==false?'checked':''}>${avatar(m)}<span>${esc(m.name)}<small>${esc(m.region)}</small></span></label>`).join('')}</div><p id="rosterError" role="alert"></p><div class="modal-actions"><button type="button" data-action="close" class="button">Cancelar</button><button class="button primary">Salvar equipe</button></div></form>`);
}
function smoothPath(points,project){
  const xy=points.map(project);
  if(xy.length<3)return linePath(points,project);
  let path='M'+xy[0].join(',');
  for(let i=1;i<xy.length-1;i++){const [x,y]=xy[i],next=xy[i+1];path+=' Q'+x+','+y+' '+(x+next[0])/2+','+(y+next[1])/2;}
  return path+' L'+xy.at(-1).join(',');
}
function tripPath(points,project){
  const spine=DEMO.corridor;
  function closest(pt){return spine.reduce((best,p,i)=>haversine(pt,p)<haversine(pt,spine[best])?i:best,0)}
  return points.slice(1).map((to,i)=>{
    const from=points[i],a=closest(from),b=closest(to);
    if(Math.abs(a-b)<3||haversine(from,spine[a])+haversine(to,spine[b])>haversine(from,to)*.65)return linePath([from,to],project);
    const via=a<b?spine.slice(a+1,b):spine.slice(b+1,a).reverse();
    return smoothPath([from,...via,to],project);
  }).join(' ');
}


function mapData(){
  const clients=memberClients().filter(c=>(!mapSegment||c.segment===mapSegment)&&(!mapUF||c.uf===mapUF));
  const clientIds=new Set(clients.map(c=>c.id));
  const trips=memberTrips().filter(t=>t.selected.some(id=>clientIds.has(id)));
  if(!trips.some(t=>t.id===mapRoute))mapRoute='';
  const visible=mapRoute?trips.filter(t=>t.id===mapRoute):trips;
  const points=mapRoute?clients.filter(c=>visible[0].selected.includes(c.id)):clients;
  if(!points.some(c=>c.id===mapClient))mapClient='';
  return {points,trips,visible};
}
function mapPage(){
  const {points,trips,visible}=mapData();
  const options=(values,current)=>values.map(v=>`<option ${v===current?'selected':''}>${esc(v)}</option>`).join('');
  return titleBlock('Mapa de clientes','Explore a carteira e os roteiros programados nos próximos '+horizon+' dias.')+
    `<section class="map-room"><div class="team-filters"><label>Responsável<select id="mapOwner">${memberOptions(memberFilter,true)}</select></label><label>Segmento<select id="mapSegment"><option value="">Todos</option>${options(['Aves','Suínos','Bovinos','Alimentos'],mapSegment)}</select></label><label>Estado<select id="mapUF"><option value="">Todos</option>${options(['PR','SC','SP'],mapUF)}</select></label><label>Roteiro<select id="mapRoute"><option value="">Todos os roteiros</option>${trips.map(t=>`<option value="${t.id}" ${t.id===mapRoute?'selected':''}>${esc(t.name)} · ${dateLabel(t.start)}</option>`).join('')}</select></label><label>Localizar cliente<select id="findClient"><option value="">Escolher unidade</option>${points.slice().sort((a,b)=>a.name.localeCompare(b.name,'pt-BR')).map(c=>`<option value="${c.id}" ${c.id===mapClient?'selected':''}>${esc(c.name)} · ${esc(c.city)}</option>`).join('')}</select></label><button class="text-link" data-reset-map>Limpar filtros</button></div>
    <div class="atlas"><svg class="map-svg" id="routeMap" viewBox="0 0 760 510" aria-label="Clientes e rotas da equipe" role="group"><g id="mapDrawing"></g></svg><div class="atlas-count">${plural(points.length,'cliente')} · ${plural(visible.length,'roteiro')}</div><div id="atlasCard"></div>${!points.length?'<div class="atlas-empty">Nenhum cliente neste recorte.<button data-reset-map class="button small">Limpar filtros</button></div>':''}<div class="map-controls"><button aria-label="Aumentar zoom" data-action="zoom-in">+</button><button aria-label="Diminuir zoom" data-action="zoom-out">−</button><button aria-label="Enquadrar mapa" data-action="zoom-reset">${icon('target')}</button></div></div>
    <footer><span>Role para ampliar · Arraste para mover · Traçado simulado · IBGE</span>${mapRoute?`<button class="button small" data-trip="${mapRoute}">Abrir agenda</button>`:''}</footer></section>`;
}
function atlasDrawing(){
  const drawing=$('#mapDrawing');if(!drawing)return;
  const {points,visible}=mapData();
  const chains=visible.map(t=>[coords(t.origin),...t.selected.map(id=>clientById(id).coords),coords(t.destination)]);
  const extent=[...points.map(c=>c.coords),...chains.flat()];
  if(!extent.length)extent.push(...DEMO.corridor);
  const xs=extent.map(p=>p[0]),ys=extent.map(p=>p[1]);
  const midX=(Math.max(...xs)+Math.min(...xs))/2,midY=(Math.max(...ys)+Math.min(...ys))/2;
  const scale=Math.min(640/Math.max(1.7,(Math.max(...xs)-Math.min(...xs))*.89),370/Math.max(1.2,Math.max(...ys)-Math.min(...ys)));
  const project=p=>[380+(p[0]-midX)*scale*.89,255-(p[1]-midY)*scale];
  const shapes=(geo?.features||[]).map(f=>{
    const polys=f.geometry.type==='MultiPolygon'?f.geometry.coordinates:[f.geometry.coordinates];
    return `<path class="state-shape" d="${polys.map(poly=>poly.map(r=>linePath(r,project)+'Z').join('')).join('')}"/>`;
  }).join('');
  const cities=new Map();
  for(const c of points){
    const key=c.city+', '+c.uf;
    if(!cities.has(key))cities.set(key,[]);
    cities.get(key).push(c);
  }
  const clusters=[...cities.entries()].filter(([,group])=>group.length>1).map(([city,group])=>{
    const position=project(group.reduce((a,c)=>[a[0]+c.coords[0]/group.length,a[1]+c.coords[1]/group.length],[0,0]));
    return `<g class="city-bundle" data-city-bundle="${esc(city)}" role="button" tabindex="0" aria-label="Ampliar ${esc(city)}, ${group.length} clientes" transform="translate(${position.join(' ')})"><circle r="10"/><text y="3.3">${group.length}</text></g>`;
  }).join('');
  const pins=points.map(c=>{const [x,y]=project(c.coords);return `<g role="button" tabindex="0" aria-label="${esc(c.name)}" data-atlas-client="${c.id}" class="atlas-pin ${cities.get(c.city+', '+c.uf).length>1?'bundled':''}" transform="translate(${x} ${y})"><circle r="10" fill="transparent"/><circle r="5.5" stroke="white" stroke-width="2" fill="${teamMember(c.owner).color}"><title>${esc(c.name)}</title></circle></g>`}).join('');
  const labels=[['PARANÁ',[-52.35,-24.40]],['SÃO PAULO',[-48.55,-22.7]],['SANTA CATARINA',[-50.9,-27.83]]];
  const occupied=[],labeled=new Set();
  const cityLabels=points.map(c=>{
    if(labeled.has(c.city))return '';
    const [x,y]=project(c.coords), box={x:x+9,y:y-13,width:c.city.length*6+5};
    if(occupied.some(b=>Math.abs(b.y-box.y)<17 && b.x<box.x+box.width && box.x<b.x+b.width))return '';
    occupied.push(box);labeled.add(c.city);
    return `<text class="atlas-city" x="${box.x}" y="${y-6}">${esc(c.city)}</text>`;
  }).join('');
  drawing.innerHTML=shapes+`<path class="map-road" d="${smoothPath(DEMO.corridor,project)}"/>`+labels.map(([name,p])=>{const [x,y]=project(p);return `<text x="${x}" y="${y}" class="state-label">${name}</text>`}).join('')+chains.map((chain,i)=>`<path d="${tripPath(chain,project)}" fill="none" stroke="${teamMember(visible[i].owner).color}" stroke-width="3" stroke-linecap="round" opacity=".88"/>`).join('')+cityLabels+pins+clusters;
  applyMapTransform();atlasCard();
}
function atlasCard(){
  const c=clientById(mapClient),el=$('#atlasCard');if(!el)return;
  if($('#findClient'))$('#findClient').value=c?.id||'';
  el.innerHTML=c?`<section class="atlas-card"><button class="icon-button" aria-label="Fechar cliente" data-atlas-close>×</button><small>${esc(c.segment)} · ${esc(c.city)} / ${c.uf}</small><h3>${esc(c.name)}</h3><p>${esc(c.reason)}</p><p>Responsável · ${esc(teamMember(c.owner).name)}</p><button class="button small" data-plan-client="${c.id}">Planejar visita</button></section>`:'';
}
function resetAtlas(){mapZoom=1;mapPan=[0,0];mapClient='';}
document.addEventListener('change',e=>{
  const id=e.target.id;
  if(id==='findClient'){
    mapClient=e.target.value;
    const pin=$('[data-atlas-client="'+mapClient+'"]');
    if(pin){const {e:x,f:y}=pin.transform.baseVal.getItem(0).matrix;mapZoom=4;mapPan=[(380-x)*mapZoom,(255-y)*mapZoom];}else resetAtlas();
    applyMapTransform();atlasCard();return;
  }
  if(!['teamOwner','mapOwner','mapSegment','mapRoute','mapUF','horizon'].includes(id))return;
  if(id==='teamOwner'||id==='mapOwner')memberFilter=e.target.value;
  if(id==='mapSegment')mapSegment=e.target.value;
  if(id==='mapUF')mapUF=e.target.value;
  if(id==='mapRoute')mapRoute=e.target.value;
  if(id==='horizon')horizon=Number(e.target.value);
  resetAtlas();render();document.getElementById(id)?.focus();
});
document.addEventListener('click',e=>{
  if(e.target.closest('[data-nav="equipe"],.brand')){memberFilter='';historyExpanded=false;if(view==='equipe')render();}
  const b=e.target.closest('button,[data-atlas-client],[data-city-bundle]');
  if(!b)return;
  if(b.hasAttribute('data-manage'))manageTeam();
  if(b.hasAttribute('data-person')){memberFilter=b.dataset.person;mapRoute='';historyExpanded=false;resetAtlas();navigate('equipe');window.scrollTo(0,0);}
  if(b.hasAttribute('data-city-bundle')){
    const {e:x,f:y}=b.transform.baseVal.getItem(0).matrix;
    mapZoom=6;mapPan=[(380-x)*mapZoom,(255-y)*mapZoom];mapClient='';applyMapTransform();atlasCard();
    const c=mapData().points.find(p=>p.city+', '+p.uf===b.dataset.cityBundle);
    document.querySelector('[data-atlas-client="'+c.id+'"]')?.focus({preventScroll:true});
  }
  if(b.hasAttribute('data-atlas-client')){mapClient=b.dataset.atlasClient;atlasCard();}
  if(b.hasAttribute('data-atlas-close')){mapClient='';atlasCard();}
  if(b.hasAttribute('data-reset-map')){memberFilter='';mapSegment='';mapUF='';mapRoute='';resetAtlas();render();}
  if(b.dataset.planClient)configModal(true,clientById(b.dataset.planClient));
});
document.addEventListener('keydown',e=>{
  if((e.key==='Enter'||e.key===' ')&&e.target.dataset.cityBundle){e.preventDefault();e.target.dispatchEvent(new MouseEvent('click',{bubbles:true}));}
  if((e.key==='Enter'||e.key===' ')&&e.target.dataset.atlasClient){e.preventDefault();mapClient=e.target.dataset.atlasClient;atlasCard();$('#atlasCard button')?.focus();}
});
document.addEventListener('submit',e=>{
  if(e.target.id!=='manageTeam')return;
  e.preventDefault();
  const ids=new FormData(e.target).getAll('included');
  if(!ids.length){$('#rosterError').textContent='Inclua pelo menos uma pessoa na equipe.';return;}
  state.members.forEach(m=>m.active=ids.includes(m.id));
  if(!ids.includes(memberFilter))memberFilter='';
  persist();closeModal();render();toast('Equipe atualizada.');
});

function reportMonths(anchor){
  const date=new Date(anchor+'T12:00:00Z');
  return Array.from({length:6},(_,i)=>new Date(Date.UTC(date.getUTCFullYear(),date.getUTCMonth()-5+i,1)).toISOString().slice(0,7));
}
function mockHistory(anchor){
  const trips=[];
  for(const [mi,month] of reportMonths(anchor).entries()){
    for(const [pi,m] of DEMO.members.entries()){
      const pool=DEMO.clients.filter(c=>c.owner===m.id);
      const count=1+(pi%3)+((mi*7+pi)%5<2?1:0);
      for(let n=0;n<count;n++){
        const start=month+'-'+String(2+n*6+(pi+mi)%5).padStart(2,'0');
        const end=dayOfTrip(start,2);
        if(end>=anchor)continue;
        const stops=Array.from({length:2+(n+pi)%3},(_,s)=>pool[(mi+n*3+s)%pool.length]);
        const first=stops[0],last=stops.at(-1),destination=last.city+', '+last.uf;
        const origin=first.city===last.city?(destination==='Curitiba, PR'?'Ponta Grossa, PR':'Curitiba, PR'):first.city+', '+first.uf;
        const records=Object.fromEntries(stops.map(c=>[c.id,{outcome:'Realizada',note:c.reason+'. Visita de acompanhamento concluída.',next:'',due:''}]));
        trips.push({id:'hist-'+month+'-'+m.id+'-'+n,name:'Acompanhamento em '+last.city,owner:m.id,origin,destination,
          start,end,segment:'Todos',selected:stops.map(c=>c.id),records});
      }
    }
  }
  return trips;
}
function invoiceLedger(anchor){
  const invoices=[];
  for(const [mi,month] of reportMonths(anchor).entries()){
    DEMO.clients.forEach((c,i)=>{
      if((i+mi)%6===0)return;
      const date=month+'-'+String(1+(i*17+mi*3)%28).padStart(2,'0');
      if(date>anchor)return;
      invoices.push({client:c.id,month,amount:(930+(i*673+mi*211)%8600)*c.equipment});
    });
  }
  return invoices;
}
let chartMetric='viagens',reportMonth='',historyExpanded=false;
function monthLabel(month,full=false){
  return dateLabel(month+'-01',full?{month:'long',year:'numeric'}:{month:'short'}).replace('.','');
}
function compactMoney(value){
  return 'R$ '+new Intl.NumberFormat('pt-BR',{notation:'compact',maximumFractionDigits:1}).format(value);
}
function historicalPanel(){
  const months=reportMonths(state.reportAnchor),clients=memberClients(),portfolio=new Set(clients.map(c=>c.id));
  const owners=new Set(clients.map(c=>c.owner));
  const rows=months.map(month=>{
    const trips=state.trips.filter(t=>owners.has(t.owner)&&t.start.startsWith(month)&&t.selected.length&&completed(t)===t.selected.length);
    const visits=new Set(trips.flatMap(t=>t.selected));
    const invoices=ledger.filter(i=>i.month===month&&portfolio.has(i.client));
    return {month,trips,visits,invoices,revenue:invoices.reduce((n,i)=>n+i.amount,0),covered:invoices.reduce((n,i)=>n+(visits.has(i.client)?i.amount:0),0)};
  });
  const subset=rows.filter(r=>!reportMonth||r.month===reportMonth),trips=subset.flatMap(r=>r.trips);
  const revenue=subset.reduce((n,r)=>n+r.revenue,0),covered=subset.reduce((n,r)=>n+r.covered,0);
  const visited=new Set(trips.flatMap(t=>t.selected)),series=rows.map(r=>chartMetric==='viagens'?r.trips.length:r.revenue),max=Math.max(...series,1);
  const people=activeMembers().map(m=>({m,count:trips.filter(t=>t.owner===m.id).length})).sort((a,b)=>b.count-a.count);
  const monthOptions=months.map(m=>`<option value="${m}" ${m===reportMonth?'selected':''}>${monthLabel(m,true)}</option>`).join('');
  const scope=reportMonth?monthLabel(reportMonth,true):monthLabel(months[0])+' – '+monthLabel(months.at(-1),true);
  const history=trips.toSorted((a,b)=>b.start.localeCompare(a.start));
  return `<section class="report" aria-label="Histórico comercial"><div class="report-scope"><label>Período do histórico <select id="reportPeriod"><option value="">Últimos 6 meses</option>${monthOptions}</select></label><span>Dados simulados até ${dateLabel(state.reportAnchor)}</span></div>
    <div class="finance-band"><div><span>Faturamento da carteira</span><strong>${money(revenue)}</strong><small>${scope}</small></div><div><span>Faturamento de clientes visitados</span><strong>${money(covered)}</strong><small>Notas de clientes com visita no mesmo mês</small></div><div><span>Viagens realizadas</span><strong>${trips.length}</strong><small>${plural(visited.size,'cliente distinto','clientes distintos')} com visita</small></div></div>
    <div class="report-grid"><section class="report-chart"><div class="chart-title"><h2>Evolução mensal</h2><div class="metric-toggle">${['viagens','faturamento'].map(v=>`<button data-metric="${v}" aria-pressed="${chartMetric===v}">${v==='viagens'?'Viagens':'Faturamento'}</button>`).join('')}</div></div><div class="columns">${rows.map((r,i)=>{
      const value=series[i],label=chartMetric==='viagens'?value:compactMoney(value);
      return `<button class="month-column" data-month="${r.month}" aria-label="Filtrar ${monthLabel(r.month,true)}, ${chartMetric==='viagens'?plural(value,'viagem','viagens'):money(value)}" aria-pressed="${reportMonth===r.month}"><span class="bar-well"><span class="bar-fill" style="height:${Math.max(value?3:0,100*value/max)}%"><b>${label}</b></span></span><span>${monthLabel(r.month)}</span></button>`;
    }).join('')}</div></section>
    <section class="report-chart"><div class="chart-title"><h2>${memberFilter?'Histórico de viagens':'Viagens por pessoa'}</h2><small>${scope}</small></div>${memberFilter?(history.length?history.slice(0,historyExpanded?history.length:4).map(t=>`<button class="history-row" data-trip="${t.id}"><span>${dateLabel(t.start)}</span><strong>${esc(t.destination.split(',')[0])}</strong><small>${plural(t.selected.length,'visita')}</small></button>`).join(''):'<p class="sheet-note">Nenhuma viagem concluída neste período.</p>')+(history.length>4?`<button class="text-link" data-history-more>${historyExpanded?'Ver menos':'Ver todo o histórico'}</button>`:''):`<div class="rank-list">${people.map(({m,count})=>`<button class="rank-row" data-person="${m.id}"><span>${esc(m.name)}</span><i><em style="width:${100*count/Math.max(1,people[0].count)}%"></em></i><b>${count}</b></button>`).join('')}</div>`}</section></div></section>`;
}
document.addEventListener('change',e=>{
  if(e.target.id==='reportPeriod'){reportMonth=e.target.value;historyExpanded=false;render();$('#reportPeriod').focus();}
});
document.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  if(b.dataset.metric){chartMetric=b.dataset.metric;render();document.querySelector('[data-metric="'+chartMetric+'"]').focus({preventScroll:true});}
  if(b.dataset.month){reportMonth=reportMonth===b.dataset.month?'':b.dataset.month;historyExpanded=false;render();document.querySelector('[data-month="'+b.dataset.month+'"]').focus({preventScroll:true});}
  if(b.hasAttribute('data-history-more')){historyExpanded=!historyExpanded;render();}
});
