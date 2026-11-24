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
  return titleBlock(memberFilter?esc(teamMember(memberFilter).name):'Visão da equipe',memberFilter?esc(teamMember(memberFilter).region):'Carteiras, cobertura e próximas viagens do pós-vendas.',`<button class="button" data-manage>Configurar equipe</button>`)+
    `<div class="team-filters"><label>Responsável<select id="teamOwner">${memberOptions(memberFilter,true)}</select></label><label>Período<select id="horizon">${[7,30,90].map(n=>`<option value="${n}" ${n===horizon?'selected':''}>Próximos ${n} dias</option>`).join('')}</select></label></div>
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
    `<section class="map-room"><div class="team-filters"><label>Responsável<select id="mapOwner">${memberOptions(memberFilter,true)}</select></label><label>Segmento<select id="mapSegment"><option value="">Todos</option>${options(['Aves','Suínos','Bovinos','Alimentos'],mapSegment)}</select></label><label>Estado<select id="mapUF"><option value="">Todos</option>${options(['PR','SC','SP'],mapUF)}</select></label><label>Roteiro<select id="mapRoute"><option value="">Todos os roteiros</option>${trips.map(t=>`<option value="${t.id}" ${t.id===mapRoute?'selected':''}>${esc(t.name)} · ${dateLabel(t.start)}</option>`).join('')}</select></label><button class="text-link" data-reset-map>Limpar filtros</button></div>
    <div class="atlas"><svg class="map-svg" id="routeMap" viewBox="0 0 760 510" aria-label="Clientes e rotas da equipe" role="group"><g id="mapDrawing"></g></svg><div class="atlas-count">${plural(points.length,'cliente')} · ${plural(visible.length,'roteiro')}</div><div id="atlasCard"></div>${!points.length?'<div class="atlas-empty">Nenhum cliente neste recorte.<button data-reset-map class="button small">Limpar filtros</button></div>':''}<div class="map-controls"><button aria-label="Aumentar zoom" data-action="zoom-in">+</button><button aria-label="Diminuir zoom" data-action="zoom-out">−</button><button aria-label="Enquadrar mapa" data-action="zoom-reset">${icon('target')}</button></div></div>
    <footer><span>● Cliente　 ━ Roteiro ilustrativo · Limites estaduais IBGE</span>${mapRoute?`<button class="button small" data-trip="${mapRoute}">Abrir agenda</button>`:''}</footer></section>`;
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
  const pins=points.map(c=>{const [x,y]=project(c.coords);return `<g role="button" tabindex="0" aria-label="${esc(c.name)}" data-atlas-client="${c.id}" class="atlas-pin" transform="translate(${x} ${y})"><circle r="10" fill="transparent"/><circle r="5.5" stroke="white" stroke-width="2" fill="${teamMember(c.owner).color}"><title>${esc(c.name)}</title></circle></g>`}).join('');
  const labels=[['PARANÁ',[-52.35,-24.40]],['SÃO PAULO',[-48.55,-22.7]],['SANTA CATARINA',[-50.9,-27.83]]];
  const occupied=[];
  const cityLabels=points.map(c=>{
    const [x,y]=project(c.coords), box={x:x+9,y:y-13,width:c.city.length*6+5};
    if(occupied.some(b=>Math.abs(b.y-box.y)<17 && b.x<box.x+box.width && box.x<b.x+b.width))return '';
    occupied.push(box);
    return `<text class="atlas-city" x="${box.x}" y="${y-6}">${esc(c.city)}</text>`;
  }).join('');
  drawing.innerHTML=shapes+`<path class="map-road" d="${smoothPath(DEMO.corridor,project)}"/>`+labels.map(([name,p])=>{const [x,y]=project(p);return `<text x="${x}" y="${y}" class="state-label">${name}</text>`}).join('')+chains.map((chain,i)=>`<path d="${tripPath(chain,project)}" fill="none" stroke="${teamMember(visible[i].owner).color}" stroke-width="3" stroke-linecap="round" opacity=".88"/>`).join('')+cityLabels+pins;
  applyMapTransform();atlasCard();
}
function atlasCard(){
  const c=clientById(mapClient),el=$('#atlasCard');if(!el)return;
  el.innerHTML=c?`<section class="atlas-card"><button class="icon-button" aria-label="Fechar cliente" data-atlas-close>×</button><small>${esc(c.segment)} · ${esc(c.city)} / ${c.uf}</small><h3>${esc(c.name)}</h3><p>${esc(c.reason)}</p><p>Responsável · ${esc(teamMember(c.owner).name)}</p><button class="button small" data-plan-client="${c.id}">Planejar visita</button></section>`:'';
}
function resetAtlas(){mapZoom=1;mapPan=[0,0];mapClient='';}
document.addEventListener('change',e=>{
  const id=e.target.id;
  if(!['teamOwner','mapOwner','mapSegment','mapRoute','mapUF','horizon'].includes(id))return;
  if(id==='teamOwner'||id==='mapOwner')memberFilter=e.target.value;
  if(id==='mapSegment')mapSegment=e.target.value;
  if(id==='mapUF')mapUF=e.target.value;
  if(id==='mapRoute')mapRoute=e.target.value;
  if(id==='horizon')horizon=Number(e.target.value);
  resetAtlas();render();document.getElementById(id)?.focus();
});
document.addEventListener('click',e=>{
  const b=e.target.closest('button,[data-atlas-client]');
  if(!b)return;
  if(b.hasAttribute('data-manage'))manageTeam();
  if(b.hasAttribute('data-person')){memberFilter=b.dataset.person;mapRoute='';resetAtlas();navigate('equipe');}
  if(b.hasAttribute('data-atlas-client')){mapClient=b.dataset.atlasClient;atlasCard();}
  if(b.hasAttribute('data-atlas-close')){mapClient='';atlasCard();}
  if(b.hasAttribute('data-reset-map')){memberFilter='';mapSegment='';mapUF='';mapRoute='';resetAtlas();render();}
  if(b.dataset.planClient)configModal(true,clientById(b.dataset.planClient));
});
document.addEventListener('keydown',e=>{
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
