const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money = n => Number(n).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const num = n => Math.round(n).toLocaleString('pt-BR');
const dateLabel = (s, options={day:'2-digit',month:'short'}) => new Date(s+'T12:00:00').toLocaleDateString('pt-BR',options);
const icons = {
 route:'M4 17a3 3 0 1 0 3 3 3 3 0 0 0-3-3Zm0 0V7a3 3 0 0 1 3-3h10m0 0-3-3m3 3-3 3M20 7v10a3 3 0 0 1-3 3h-6',
 compass:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm4-16-2 8-8 2 2-8 8-2Z',
 briefcase:'M3 7h18v14H3V7Zm5 0V3h8v4M3 12c5 3 13 3 18 0M10 13v3h4v-3',
 calendar:'M3 5h18v16H3V5Zm4-3v6m10-6v6M3 10h18m-13 4h2m4 0h2m-8 3h2',
 building:'M4 22V3h12v19m0-13h5v13M8 7h4M8 11h4M8 15h4M9 22v-3h2v3',
 activity:'M2 12h5l3-8 4 16 3-8h5',chevron:'m9 5 7 7-7 7',chevrons:'m8 9 4-4 4 4m-8 6 4 4 4-4',
 menu:'M3 6h18M3 12h18M3 18h18',plus:'M12 5v14M5 12h14',minus:'M5 12h14',
 help:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm-3-14a3 3 0 0 1 6 0c0 2-3 2-3 5m0 4h.01',
 arrow:'M3 12h18m-6-6 6 6-6 6',swap:'M3 7h17m-4-4 4 4-4 4M21 17H4m4-4-4 4 4 4',
 pin:'M12 22s8-8 8-13a8 8 0 1 0-16 0c0 5 8 13 8 13Zm0-10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
 map:'m2 5 6-3 8 3 6-3v17l-6 3-8-3-6 3V5Zm6-3v17m8-14v17',
 list:'M8 6h13M8 12h13M8 18h13M3 6h.1M3 12h.1M3 18h.1',
 wallet:'M21 7H3V3h15v4M3 7v14h18V7m0 5h-6v5h6m-3-2.5h.01',
 search:'M21 21l-6-6m-6 2a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z',
 clock:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-16v6l4 2',
 equipment:'M3 8h18v12H3V8Zm5 0V3h8v5M7 12h2m6 0h2M7 16h10',
 alert:'m12 2 11 19H1L12 2Zm0 6v5m0 4h.01',check:'m5 12 4 4L20 5',
 info:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-11v6m0-10h.01',
 close:'m6 6 12 12M6 18 18 6',target:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-5a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-5h.01',
 car:'m3 9 2-6h14l2 6M3 9H1v10h22V9h-2M3 9h18M5 19v3m14-3v3M4 14h3m10 0h3',
 save:'M3 3h15l3 3v15H3V3Zm4 0v6h10V3M7 21v-8h10v8',
 up:'m5 15 7-7 7 7',down:'m5 9 7 7 7-7',trash:'M3 6h18M5 6l1 16h12l1-16M9 6V2h6v4M10 10v7m4-7v7',
 download:'M12 2v13m-5-5 5 5 5-5M3 16v6h18v-6',print:'M6 8V2h12v6M6 18H2V8h20v10h-4M6 14h12v8H6V14Z',
 people:'M16 22v-3a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v3m7-11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm10-5a4 4 0 0 1 0 8m0 1a4 4 0 0 1 4 4v3',
 reset:'M4 8a9 9 0 1 1-1 8M4 2v6h6',external:'M14 2h8v8m0-8L12 12M10 3H2v19h19v-8',mail:'M2 4h20v16H2V4Zm0 0 10 9L22 4'
};
const icon = name => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${icons[name] || icons.info}"/></svg>`;
function paintIcons(root=document){$$('[data-icon]',root).forEach(el=>el.innerHTML=icon(el.dataset.icon));}
icons.edit='m16 3 5 5-12 12-6 1 1-6L16 3Zm-3 3 5 5';
const STORAGE='trf-posvendas-mvp3';
function nextMonday(){const now=new Date();now.setDate(now.getDate()+((8-now.getDay())%7||7));return [now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-')}
const initialDraft=()=>({owner:memberFilter||DEMO.members.find(m=>stored.members?.find(x=>x.id===m.id)?.active!==false)?.id||'ana',origin:'São Miguel do Oeste, SC',destination:'São Paulo, SP',start:nextMonday(),end:dayOfTrip(nextMonday(),4),segment:'Aves',radius:50,selected:[]});
let stored={};try{stored=JSON.parse(localStorage.getItem(STORAGE)||localStorage.getItem('trf-posvendas-mvp2')||'{}')}catch{}
function coreTrip(t){return {ownOnly:!!t.ownOnly,owner:t.owner||DEMO.trips.find(x=>x.id===t.id)?.owner||'ana',id:t.id,name:t.name,origin:t.origin,destination:t.destination,start:t.start,end:t.end,segment:t.segment||'Aves',radius:t.radius||50,durations:t.durations||{},records:t.records||{},manualOrder:!!t.manualOrder,selected:[...new Set((t.selected||[]).filter(id=>DEMO.clients.some(c=>c.id===id)))],editingId:t.editingId}}
const reportAnchor=stored.reportAnchor||localDay();
const ledger=invoiceLedger(reportAnchor);
let state={reportAnchor,members:DEMO.members.map(m=>({...m,active:stored.members?.find(x=>x.id===m.id)?.active!==false})),teamSeed:true,draft:stored.draft?coreTrip(stored.draft):initialDraft(),trips:[...(stored.trips||DEMO.trips),...(stored.teamSeed?[]:mockPrograms()),...(stored.reportAnchor?[]:mockHistory(reportAnchor)),...(stored.teamSeed&&!stored.reportAnchor?mockPrograms().slice(8):[])].map(coreTrip)};
if(!stored.reportAnchor){try{localStorage.setItem(STORAGE,JSON.stringify(state))}catch{}}
let sortMode='relationship', mobileMap=false;
let view='planejar',step='clientes',search='',activePin=null,geo=null,mapZoom=1,mapPan=[0,0],previousFocus=null,toastTimer;
const clientById=id=>DEMO.clients.find(c=>c.id===id);
const coords=city=>DEMO.cities[city];
const plural=(n,s,p=s+'s')=>n+' '+(n===1?s:p);
function persist(){try{localStorage.setItem(STORAGE,JSON.stringify(state))}catch{toast('O navegador não permitiu salvar. Suas alterações ficam apenas nesta sessão.')}}
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),3800)}
function haversine(a,b){const r=Math.PI/180,dy=(b[1]-a[1])*r,dx=(b[0]-a[0])*r;return 12742*Math.asin(Math.sqrt(Math.sin(dy/2)**2+Math.cos(a[1]*r)*Math.cos(b[1]*r)*Math.sin(dx/2)**2))}
function metrics(d=state.draft){const points=[coords(d.origin),...d.selected.map(id=>clientById(id).coords),coords(d.destination)];return {visits:d.selected.length,equipment:d.selected.reduce((n,id)=>n+clientById(id).equipment,0),km:Math.round(points.slice(1).reduce((n,p,i)=>n+haversine(points[i],p)*1.25,0))}}
function daysSince(c){return Math.max(0,Math.round((new Date(state.draft.start+'T12:00:00')-new Date(c.last+'T12:00:00'))/864e5))}
function detour(c){const d=state.draft;if(d.origin==='São Miguel do Oeste, SC'&&d.destination==='São Paulo, SP'&&Number.isFinite(c.detour))return c.detour;const a=coords(d.origin),b=coords(d.destination),p=c.coords;const t=Math.max(0,Math.min(1,((p[0]-a[0])*(b[0]-a[0])+(p[1]-a[1])*(b[1]-a[1]))/((b[0]-a[0])**2+(b[1]-a[1])**2||1)));return Math.round(haversine(p,[a[0]+t*(b[0]-a[0]),a[1]+t*(b[1]-a[1])])*2)}
function candidates(){return DEMO.clients.filter(c=>(!state.draft.ownOnly||c.owner===state.draft.owner)&&(state.draft.segment==='Todos'||c.segment===state.draft.segment)&&detour(c)<=state.draft.radius&&(c.name+' '+c.city).toLocaleLowerCase('pt-BR').includes(search.toLocaleLowerCase('pt-BR'))).sort((a,b)=>sortMode==='distance'?detour(a)-detour(b):priority(b)-priority(a)||detour(a)-detour(b))}
function orderStops(){const remaining=state.draft.selected.slice(),ordered=[];let from=coords(state.draft.origin);while(remaining.length){remaining.sort((a,b)=>haversine(from,clientById(a).coords)-haversine(from,clientById(b).coords));const id=remaining.shift();ordered.push(id);from=clientById(id).coords}state.draft.selected=ordered}
function titleBlock(title,description,actions=''){return `<div class="page-head"><div><h1>${title}</h1><p>${description}</p></div><div class="head-actions">${actions}</div></div>`}
function render(){const hash=location.hash.slice(1);const oldView=view;view=hash.startsWith('viagem/')?'detalhe':['equipe','mapa','planejar','viagens','melhorias'].includes(hash)?hash:'equipe';if(oldView!==view){resetAtlas();activePin=null;}sidebarTeam();const nav=view==='detalhe'?'viagens':view;$('#breadcrumb').textContent={equipe:memberFilter?'Painel individual':'Painel de gestão',mapa:'Mapa de clientes',planejar:'Planejar viagem',viagens:'Roteiros salvos',melhorias:'Possíveis melhorias'}[nav];$$('[data-nav]').forEach(a=>{a.classList.toggle('active',a.dataset.nav===nav);if(a.dataset.nav===nav)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});$('#tripCount').textContent=state.trips.length;$('#main').innerHTML=({equipe:teamPage,mapa:mapPage,planejar:planner,viagens:tripsPage,melhorias:improvementsPage,detalhe:()=>tripPage(hash.split('/')[1])}[view])();if(view==='planejar'&&step==='clientes'){bindMap();renderMap()}if(view==='mapa'){bindMap();atlasDrawing()}syncNavigation()}
function journeyBrief(){const d=state.draft;return `<section class="journey-brief" aria-label="Resumo da viagem"><div class="brief-path"><div class="brief-place"><small>Saída</small><strong>${esc(d.origin)}</strong></div>${icon('arrow')}<div class="brief-place"><small>Destino</small><strong>${esc(d.destination)}</strong></div></div><div class="brief-meta"><span>${esc(teamMember(d.owner).name)}</span><span>${icon('calendar')}${dateLabel(d.start)} a ${dateLabel(d.end)}</span><span class="segment-badge">${d.segment==='Todos'?'Todos os segmentos':d.segment}</span></div><button class="button small" data-action="config">Alterar viagem</button></section>`}
function planner(){return titleBlock('Planejar viagem','Encontre clientes no caminho e reserve tempo para cada visita.')+journeyBrief()+`<section class="planner-surface" aria-label="Planejamento da viagem"><div class="planner-toolbar"><div class="step-tabs" role="tablist" aria-label="Etapas do planejamento"><button class="step-tab ${step==='clientes'?'active':''}" role="tab" aria-selected="${step==='clientes'}" aria-controls="plannerContent" data-step="clientes"><span>1</span>Escolher clientes</button><button class="step-tab ${step==='roteiro'?'active':''}" role="tab" aria-selected="${step==='roteiro'}" aria-controls="plannerContent" data-step="roteiro"><span>2</span>Montar agenda</button></div>${step==='clientes'?`<button class="button small map-switch" data-action="map-switch">${mobileMap?'Ver lista':'Ver mapa'}</button>`:''}</div><div id="plannerContent" role="tabpanel" tabindex="0">${step==='clientes'?explore():review()}</div>${summary()}</section><p class="context-note">${icon('info')}Dados simulados. O trajeto é ilustrativo e não serve para navegação.</p>`}
function explore(){return `<div class="explore-grid ${mobileMap?'mobile-map':''}"><div class="map-wrap"><svg class="map-svg" id="routeMap" viewBox="0 0 760 510" aria-label="Mapa ilustrativo dos clientes e paradas" role="group"><rect width="760" height="510" class="map-bg"/><g id="mapDrawing"></g></svg><div class="map-floating"><span class="map-chip">${icon('map')}Clientes da sua carteira</span></div><div id="mapPopup"></div><div class="map-controls"><button aria-label="Aumentar zoom" data-action="zoom-in">${icon('plus')}</button><button aria-label="Diminuir zoom" data-action="zoom-out">${icon('minus')}</button><button aria-label="Enquadrar rota" data-action="zoom-reset">${icon('target')}</button></div><div class="map-legend"><span><i class="legend-dot selected"></i>Selecionado</span><span><i class="legend-dot"></i>Disponível</span></div><div class="map-attribution"><span>Limites estaduais: IBGE</span><span>Percurso simulado</span></div></div><aside class="client-panel" aria-label="Clientes para visitar"><div class="client-panel-head"><h2>Carteira no trajeto <span id="candidateCount" class="count">${candidates().length}</span></h2><p>Clientes ${state.draft.segment==='Todos'?'da carteira':'de '+esc(state.draft.segment.toLowerCase())} com até ${state.draft.radius} km de desvio estimado.</p><label class="search-field simple-search">${icon('search')}<input id="candidateSearch" type="search" aria-label="Buscar cliente no caminho" placeholder="Buscar cliente ou cidade" value="${esc(search)}"></label><label class="sort-label">Ordenar por <select id="sortMode"><option value="relationship">Prioridade de retorno</option><option value="distance" ${sortMode==='distance'?'selected':''}>Menor desvio</option></select></label></div><div class="client-scroll" id="candidateList">${clientCards()}</div></aside></div>`}
function clientCards(){const cs=candidates();if(!cs.length)return `<div class="empty">${icon('search')}<h3>Nenhum cliente encontrado</h3><p>Limpe a busca ou escolha outro segmento na viagem.</p><button class="button small" data-action="clear-search">Limpar busca</button><button class="text-link" data-action="config">Alterar viagem</button></div>`;return cs.map(c=>{const selected=state.draft.selected.includes(c.id);return `<article class="client-card ${selected?'selected':''}"><div class="client-card-top"><button class="select-client" data-select="${c.id}" aria-pressed="${selected}" aria-label="${selected?'Remover':'Adicionar'} ${esc(c.name)} ${selected?'do':'ao'} roteiro">${icon(selected?'check':'plus')}</button><div class="client-title"><button data-detail="${c.id}">${esc(c.name)}</button><p>${esc(c.city)} · ${c.uf}</p></div></div><p class="client-reason"><i class="signal ${priority(c)>=200?'high':''}"></i>${esc(c.reason)}</p><div class="client-meta"><span>${daysSince(c)} dias sem visita</span><span>${plural(c.equipment,'equipamento')}</span><span class="detour">+${detour(c)} km</span></div></article>`}).join('')}
function summary(){const d=state.draft,m=metrics();return `<div class="planner-summary"><div class="summary-count">${icon('building')}<div><strong>${plural(m.visits,'cliente selecionado','clientes selecionados')}</strong><small>${num(m.km)} km · ${step==='clientes'?'Estimativa de ida com as paradas escolhidas':'Agenda estimada · das 08h às 16h'}</small></div></div><button class="button primary" data-action="${step==='clientes'?'review':'save'}" ${!m.visits||(step==='roteiro'&&agenda(d).over)?'disabled':''}>${step==='clientes'?'Montar agenda':d.editingId?'Salvar alterações':'Salvar roteiro'}${icon(step==='clientes'?'arrow':'save')}</button></div>`}
function refreshCandidates(){if(!$('#candidateList'))return;$('#candidateList').innerHTML=clientCards();$('#candidateCount').textContent=candidates().length;$('.planner-summary').outerHTML=summary();renderMap()}
function toggleClient(id){const ids=state.draft.selected,i=ids.indexOf(id);if(i>=0)ids.splice(i,1);else ids.push(id);persist();if(view==='planejar'){if(step==='clientes')refreshCandidates();else render()}}
function priority(client) {
  const technical = /atendimento técnico|preventiva/.test(client.reason);
  return (technical ? 200 : 0) + Math.min(199,daysSince(client));
}

const shift = 480;
function displayTime(minutes) {
  const total = 480 + minutes;
  return String(Math.floor(total / 60)).padStart(2,'0') + ':' + String(total % 60).padStart(2,'0');
}
function dayOfTrip(start, offset) {
  const date = new Date(start+'T12:00:00Z');
  date.setUTCDate(date.getUTCDate()+offset);
  return date.toISOString().slice(0,10);
}
function agenda(trip) {
  const events = [];
  let elapsed = 0, driving = 0, visiting = 0, from = coords(trip.origin);
  function addEvent(minutes, fields) {
    const day = Math.floor(elapsed / shift), at = elapsed % shift;
    events.push({...fields, day, time:displayTime(at), until:displayTime(at+minutes)});
    elapsed += minutes;
  }
  function drive(point, label) {
    let minutes = Math.ceil(haversine(from,point)*1.25 / 65 * 12)*5;
    from = point;
    driving += minutes;
    while(minutes>0) {
      const slice = Math.min(minutes,shift-elapsed%shift);
      addEvent(slice,{label});
      minutes -= slice;
    }
  }
  trip.selected.forEach((id,index)=>{
    const c = clientById(id), duration = Number(trip.durations?.[id]) || 60;
    drive(c.coords,c.city);
    if(elapsed%shift+duration>shift) elapsed += shift-elapsed%shift;
    addEvent(duration,{client:c,index,duration});
    visiting += duration;
  });
  drive(coords(trip.destination),trip.destination.split(',')[0]);
  const last = dayOfTrip(trip.start,events.at(-1)?.day||0);
  return {events,driving,visiting,last,over:last>trip.end};
}

function durationLabel(m) {
  return [Math.floor(m/60) ? Math.floor(m/60)+'h' : '',m%60 ? m%60+'min' : ''].filter(Boolean).join(' ') || '0min';
}
function completed(trip) {
  return trip.selected.filter(id=>trip.records?.[id]?.outcome==='Realizada').length;
}
function timeline(trip, editing) {
  const plan = agenda(trip);
  return plan.events.map((e,i)=>{
    const heading = (i===0 || e.day!==plan.events[i-1].day)
      ? `<h3 class="day-heading">Dia ${e.day+1}<span>${dateLabel(dayOfTrip(trip.start,e.day),{weekday:'long',day:'numeric',month:'long'})}</span></h3>` : '';
    if(!e.client) return heading+`<div class="leg"><time>${e.time}–${e.until}</time>${icon('route')}Deslocamento até ${esc(e.label)}</div>`;
    const c=e.client, record=trip.records?.[c.id];
    const controls=editing?`<div class="stop-tools"><label>Duração <select data-duration="${c.id}">${[30,60,90,120].map(n=>`<option value="${n}" ${n===e.duration?'selected':''}>${n} min</option>`).join('')}</select></label><button class="button small" data-move="-1" data-id="${c.id}" aria-label="Antecipar ${esc(c.name)}" ${e.index===0?'disabled':''}>↑</button><button class="button small" data-move="1" data-id="${c.id}" aria-label="Adiar ${esc(c.name)}" ${e.index===trip.selected.length-1?'disabled':''}>↓</button></div>`
      :`<div class="stop-tools"><button class="button small" data-report="${c.id}" data-for="${esc(trip.id)}">${record?'Editar registro':'Registrar visita'}</button></div>`;
    return heading+`<article class="field-stop"><time>${e.time}<small>${e.until}</small></time><div><small class="stop-city">Parada ${e.index+1} · ${esc(c.city)} / ${esc(c.uf)}</small><h4>${esc(c.name)}</h4><p>${esc(c.reason)}</p>${record?`<div class="visit-note"><strong>${esc(record.outcome)}</strong><p>${esc(record.note)}</p>${record.next?`<p>${record.closed?'Retorno concluído':'Retorno em '+dateLabel(record.due)} · ${esc(record.next)}</p>`:''}</div>`:''}${controls}</div></article>`;
  }).join('');
}
function tripSummary(trip) {
  const plan=agenda(trip), stops=new Set(trip.selected);
  const turnover=ledger.reduce((sum,entry)=>sum+(stops.has(entry.client)?entry.amount:0),0);
  return `<aside class="field-summary"><h3>Previsão de ida</h3><strong>${num(metrics(trip).km)} <small>km</small></strong><dl><dt>Em deslocamento</dt><dd>${durationLabel(plan.driving)}</dd><dt>Em atendimento</dt><dd>${durationLabel(plan.visiting)}</dd><dt>Chegada prevista</dt><dd>${dateLabel(plan.last)} · ${plan.events.at(-1)?.until||'08:00'}</dd></dl><p>Simulação a 65 km/h, com até 8 horas diárias entre estrada e visitas. Confirme os horários com as unidades.</p><div class="route-revenue"><small>Faturamento dos clientes da rota</small><b>${money(turnover)}</b><small>Seis meses de notas simuladas até ${dateLabel(state.reportAnchor)}.</small></div></aside>`;
}
function review() {
  const d=state.draft;
  if(!d.selected.length) return `<div class="empty"><h3>Escolha pelo menos um cliente</h3><button class="button" data-step="clientes">Voltar à carteira</button></div>`;
  const plan=agenda(d);
  return `<div class="essential-review"><section><h2>Agenda da viagem</h2><p class="muted">Ajuste a ordem e a duração das paradas.</p>${plan.over?`<div class="capacity" role="alert">A chegada prevista é ${dateLabel(plan.last)}, depois do fim da viagem. Ajuste as visitas ou <button class="text-link" data-action="config">amplie o período</button>.</div>`:''}${timeline(d,true)}</section>${tripSummary(d)}</div>`;
}
function tripPage(id) {
  const t=state.trips.find(trip=>trip.id===id);
  if(!t) return titleBlock('Roteiro não encontrado','Abra um roteiro salvo neste navegador.')+'<a href="#viagens">Roteiros salvos</a>';
  return '<a class="back-link" href="#viagens">← Roteiros salvos</a>'+titleBlock(esc(t.name),esc(teamMember(t.owner).name)+' · '+esc(t.origin)+' → '+esc(t.destination)+' · '+dateLabel(t.start)+' a '+dateLabel(t.end),`<button class="button" data-edit="${t.id}">${icon('edit')}Editar roteiro</button><button class="button" data-action="print">Imprimir</button>`)+`<section class="surface essential-review"><div><h2>Agenda de campo</h2><p class="muted">${completed(t)} de ${plural(t.selected.length,'visita')} realizadas</p>${timeline(t,false)}</div>${tripSummary(t)}</section>`;
}
function reportModal(trip,id) {
  const r=trip.records?.[id]||{};
  openModal(modalHeading('Registro da visita',esc(clientById(id).name))+`<form id="reportForm" data-trip-id="${trip.id}" data-client-id="${id}"><div class="form-grid"><label class="field full">Situação<select name="outcome">${['Realizada','Reagendar'].map(o=>`<option ${o===r.outcome?'selected':''}>${o}</option>`).join('')}</select></label><label class="field full">Resumo do atendimento<textarea name="note" required maxlength="1000" rows="3">${esc(r.note)}</textarea></label><label class="field full">Próxima ação (opcional)<input name="next" maxlength="180" value="${esc(r.next)}"></label><label class="field">Prazo do retorno<input type="date" name="due" value="${esc(r.due)}" ${r.next?'required':''}></label>${r.next?`<label class="closed-field"><input type="checkbox" name="closed" ${r.closed?'checked':''}> Retorno concluído</label>`:''}</div><div class="modal-actions"><button type="button" class="button" data-action="close">Cancelar</button><button class="button primary">Salvar registro</button></div></form>`);
}
document.addEventListener('click',e=>{
  const b=e.target.closest('button');
  if(!b) return;
  if(b.dataset.action==='map-switch'){ mobileMap=!mobileMap;render(); }
  if(b.dataset.action==='print') window.print();
  if(b.dataset.move){
    const d=state.draft, i=d.selected.indexOf(b.dataset.id), j=i+Number(b.dataset.move);
    if(i<0||j<0||j>=d.selected.length)return;
    [d.selected[i],d.selected[j]]=[d.selected[j],d.selected[i]];
    d.manualOrder=true;persist();render();
    document.querySelector('[data-duration="'+b.dataset.id+'"]')?.focus();
  }
  if(b.dataset.report) reportModal(state.trips.find(t=>t.id===b.dataset.for),b.dataset.report);
});
document.addEventListener('change',e=>{
  if(e.target.id==='sortMode'){sortMode=e.target.value;refreshCandidates();}
  const id=e.target.dataset.duration;
  if(id){(state.draft.durations??={})[id]=Number(e.target.value);persist();render();document.querySelector('[data-duration="'+id+'"]').focus();}
});
document.addEventListener('input',e=>{
  if(e.target.form?.id==='reportForm'){
    const f=e.target.form;
    f.elements.due.required=Boolean(f.elements.next.value.trim());
    f.elements.next.required=Boolean(f.elements.due.value);
    f.elements.note.setCustomValidity(f.elements.note.value.trim()?'':'Descreva o atendimento.');
  }
});
document.addEventListener('submit',e=>{
  const f=e.target;
  if(f.id!=='reportForm')return;
  e.preventDefault();
  const t=state.trips.find(t=>t.id===f.dataset.tripId),id=f.dataset.clientId;
  const record=Object.fromEntries(new FormData(f));
  (t.records??={})[id]=record;
  if(!record.next)delete record.closed;
  if(state.draft.editingId===t.id)(state.draft.records??={})[id]={...record};
  persist();closeModal();render();toast('Registro salvo neste navegador.');
});

function returnList() {
  const pending=state.trips.flatMap(trip=>trip.selected.map(id=>({trip,id,record:trip.records?.[id]})))
    .filter(item=>item.record?.next&&!item.record.closed)
    .sort((a,b)=>a.record.due.localeCompare(b.record.due));
  if(!pending.length)return '';
  return `<section class="return-list"><h2>Retornos combinados <span class="count">${pending.length}</span></h2>${pending.map(({trip,id,record})=>`<article><time>${dateLabel(record.due)}</time><div><strong>${esc(record.next)}</strong><p>${esc(clientById(id).name)}</p></div><button class="button small" data-report="${id}" data-for="${trip.id}">Ver registro</button></article>`).join('')}</section>`;
}
let savedLimit=12;
document.addEventListener('click',e=>{if(e.target.closest('[data-more-trips]')){savedLimit+=12;render();}});
function tripsPage(){const ordered=state.trips.slice().sort((a,b)=>Number(b.end>=localDay())-Number(a.end>=localDay())||(a.end>=localDay()?a.start.localeCompare(b.start):b.start.localeCompare(a.start)));return titleBlock('Roteiros salvos','Consulte a agenda das viagens e acompanhe os retornos combinados.',`<button class="button primary" data-action="new">${icon('plus')}Novo roteiro</button>`)+returnList()+`<section class="surface trip-list">${ordered.length?ordered.slice(0,savedLimit).map(t=>`<article class="trip-row"><div><h2><button data-trip="${t.id}">${esc(t.name||'Viagem a '+t.destination.split(',')[0])}</button></h2><p class="trip-route">${esc(t.origin.split(',')[0])}${icon('arrow')}${esc(t.destination.split(',')[0])}</p><div class="trip-info"><span>${dateLabel(t.start)} a ${dateLabel(t.end)}</span><span>${completed(t)}/${t.selected.length} visitas realizadas</span><span>${esc(t.segment)}</span><span>${esc(teamMember(t.owner).name)}</span></div></div><button class="button small" data-trip="${t.id}">Ver roteiro${icon('chevron')}</button></article>`).join(''):`<div class="empty">${icon('briefcase')}<h3>Seu primeiro roteiro começa aqui</h3><p>Escolha o destino e os clientes que deseja visitar.</p><button class="button primary" data-action="new">Planejar viagem</button></div>`}${ordered.length>savedLimit?`<button class="button small" data-more-trips>Mostrar mais roteiros</button>`:''}</section>`}
function openModal(content){previousFocus=document.activeElement;$('#overlay-root').innerHTML=`<div class="overlay"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">${content}</section></div>`;document.body.style.overflow='hidden';syncNavigation();$('.modal input,.modal select,.modal button')?.focus()}
function closeModal(){document.body.style.overflow='';$('#overlay-root').innerHTML='';syncNavigation();if(previousFocus?.isConnected)previousFocus.focus()}
function modalHeading(title,description=''){return `<div class="modal-heading"><div><h2 id="modalTitle">${title}</h2>${description?`<p>${description}</p>`:''}</div><button class="icon-button" data-action="close" aria-label="Fechar janela">${icon('close')}</button></div>`}
function configModal(fresh=false,client=null){const d=fresh?initialDraft():state.draft;
if(fresh){d.owner=memberFilter||activeMembers()[0].id;d.ownOnly=Boolean(memberFilter||client);}
if(fresh&&memberFilter){const portfolio=memberClients(),first=portfolio[0],last=portfolio.find(c=>c.city!==first.city);d.origin=first.city+', '+first.uf;d.destination=last.city+', '+last.uf;d.segment='Todos';}
if(client){d.owner=client.owner;d.segment=client.segment;d.destination=client.city+', '+client.uf;if(d.destination===d.origin)d.origin=d.destination==='Chapecó, SC'?'Maravilha, SC':'Chapecó, SC';}
const options=value=>Object.keys(DEMO.cities).map(c=>`<option ${c===value?'selected':''}>${esc(c)}</option>`).join('');openModal(`${modalHeading('Para onde você vai?','Defina a viagem para encontrar clientes no caminho.')}<form id="configForm" data-fresh="${fresh}" data-seed="${client?.id||''}"><div class="form-grid"><label class="field">Saída<select name="origin">${options(d.origin)}</select></label><label class="field">Destino<select name="destination">${options(d.destination)}</select></label><label class="field">Ida<input name="start" type="date" required value="${d.start}"></label><label class="field">Retorno<input name="end" type="date" min="${d.start}" required value="${d.end}"></label><label class="field full">Responsável pela viagem<select name="owner">${memberOptions(d.owner)}</select></label><label class="field full">Clientes disponíveis<select name="scope"><option value="all">Toda a equipe</option><option value="own" ${d.ownOnly?'selected':''}>Somente a carteira do responsável</option></select></label><label class="field full">Segmento dos clientes<select name="segment">${['Todos','Aves','Suínos','Bovinos','Alimentos'].map(s=>`<option ${s===d.segment?'selected':''}>${s}</option>`).join('')}</select></label><label class="field full">Desvio máximo estimado<select name="radius">${[25,50,100,200].map(n=>`<option value="${n}" ${n===d.radius?'selected':''}>${n} km</option>`).join('')}</select></label></div><div class="validation" id="configError" role="alert"></div><p class="fineprint">${fresh?'Um novo rascunho será aberto. Os roteiros salvos continuam disponíveis.':'A seleção será ajustada ao segmento e ao desvio escolhidos.'}</p><div class="modal-actions"><button class="button" type="button" data-action="close">Cancelar</button><button class="button primary" type="submit">${fresh?'Escolher clientes':'Aplicar'}${icon('arrow')}</button></div></form>`)}
function showClient(id){const c=clientById(id),selected=state.draft.selected.includes(id);openModal(`${modalHeading(esc(c.name),`${esc(c.city)} · ${c.uf} · ${c.segment}`)}<div class="client-context"><div><span>Base instalada</span><strong>${plural(c.equipment,'equipamento')}</strong></div><div><span>Última visita</span><strong>Há ${plural(daysSince(c),'dia')}</strong></div></div><section class="detail-section"><h3>Motivo para visitar</h3><p>${esc(c.reason)}.</p></section><div class="modal-actions"><button class="button" data-action="close">Fechar</button><button class="button primary" data-add="${id}">${icon(selected?'minus':'plus')}${selected?'Remover do roteiro':'Adicionar ao roteiro'}</button></div>`)}
function syncNavigation(){const mobile=matchMedia('(max-width:850px)').matches,open=$('#sidebar').classList.contains('open'),modal=!!$('.modal');$('#sidebar').inert=modal||(mobile&&!open);$('#main').inert=modal||(mobile&&open);$('.topbar').inert=modal}
function closeNavigation(){document.body.classList.remove('nav-open');$('#sidebar').classList.remove('open');$('#sidebarOverlay').hidden=true;$('#menuToggle').setAttribute('aria-expanded','false');syncNavigation()}
function navigate(hash){closeNavigation();if(location.hash==='#'+hash)render();else location.hash=hash}
document.addEventListener('click',e=>{const b=e.target.closest('button,[data-pin]');if(!b||b.disabled)return;const a=b.dataset.action;if(a==='close'){closeModal();return}if(a==='config'){configModal();return}if(a==='new'){configModal(true);return}if(b.dataset.step){if(b.dataset.step==='roteiro'&&!state.draft.manualOrder)orderStops();step=b.dataset.step;persist();render();return}if(b.dataset.select){toggleClient(b.dataset.select);return}if(b.dataset.detail){showClient(b.dataset.detail);return}if(b.dataset.add){toggleClient(b.dataset.add);closeModal();return}if(b.dataset.trip){navigate('viagem/'+b.dataset.trip);return}if(b.dataset.edit){const t=state.trips.find(t=>t.id===b.dataset.edit);state.draft={...structuredClone(t),editingId:t.id};delete state.draft.id;step='clientes';search='';persist();navigate('planejar');return}if(b.dataset.pin){activePin=b.dataset.pin;showPin();return}if(a==='review'){if(!state.draft.manualOrder)orderStops();step='roteiro';persist();render();return}if(a==='save'){if(!state.draft.selected.length||agenda(state.draft).over)return;const d=state.draft,existing=d.editingId&&state.trips.find(t=>t.id===d.editingId),t={...structuredClone(d),id:existing?.id||'t'+Date.now(),name:existing?.destination===d.destination&&existing.segment===d.segment?existing.name:'Viagem a '+d.destination.split(',')[0]+' · '+d.segment};delete t.editingId;if(existing)state.trips[state.trips.indexOf(existing)]=t;else state.trips.unshift(t);state.draft.editingId=t.id;persist();navigate('viagem/'+t.id);toast(existing?'Roteiro atualizado.':'Roteiro salvo. Você pode retomar em Roteiros salvos.');return}if(a==='clear-search'){search='';render();return}if(a==='zoom-in'||a==='zoom-out'||a==='zoom-reset'){mapZoom=a==='zoom-reset'?1:Math.max(.8,Math.min(12,mapZoom+(a==='zoom-in'?.3:-.3)));if(a==='zoom-reset')mapPan=[0,0];applyMapTransform();return}if(a==='close-pin'){activePin=null;showPin()}});
document.addEventListener('input',e=>{if(e.target.id==='candidateSearch'){search=e.target.value;refreshCandidates()}});
document.addEventListener('change',e=>{if(e.target.name==='start'&&e.target.closest('#configForm'))$('#configForm [name="end"]').min=e.target.value});
document.addEventListener('submit',e=>{if(e.target.id!=='configForm')return;e.preventDefault();const fd=new FormData(e.target),error=$('#configError');if(fd.get('origin')===fd.get('destination')){error.textContent='Escolha um destino diferente da saída.';return}if(fd.get('end')<fd.get('start')){error.textContent='O retorno deve ser igual ou posterior à ida.';return}const fresh=e.target.dataset.fresh==='true',d=fresh?initialDraft():state.draft;const ownOnly=fd.get('scope')==='own';const filtersChanged=Boolean(d.ownOnly)!==ownOnly||(ownOnly&&fd.get('owner')!==d.owner)||['origin','destination','segment','radius'].some(k=>String(d[k])!==fd.get(k));Object.assign(d,{ownOnly,owner:fd.get('owner'),origin:fd.get('origin'),destination:fd.get('destination'),start:fd.get('start'),end:fd.get('end'),segment:fd.get('segment'),radius:Number(fd.get('radius'))});const seed=clientById(e.target.dataset.seed);if(seed)d.selected=[seed.id];state.draft=d;step='clientes';search='';const allowed=new Set(candidates().map(c=>c.id));const before=d.selected.length;if(filtersChanged)d.selected=d.selected.filter(id=>allowed.has(id));if(before>d.selected.length)toast(plural(before-d.selected.length,'parada removida','paradas removidas')+' pelos novos filtros.');activePin=null;mapZoom=1;mapPan=[0,0];persist();closeModal();navigate('planejar')});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if($('.modal'))closeModal();else if($('#sidebar').classList.contains('open')){closeNavigation();$('#menuToggle').focus()}else{activePin=null;showPin()}}if(e.key==='Tab'&&$('.modal')){const all=$$('button:not(:disabled),input,select,textarea',$('.modal')),first=all[0],last=all.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
$('#menuToggle').addEventListener('click',()=>{const open=!$('#sidebar').classList.contains('open');$('#sidebar').classList.toggle('open',open);$('#sidebarOverlay').hidden=!open;$('#menuToggle').setAttribute('aria-expanded',String(open));document.body.classList.toggle('nav-open',open);syncNavigation()});$('#sidebarOverlay').addEventListener('click',closeNavigation);$$('[data-nav]').forEach(a=>a.addEventListener('click',closeNavigation));$('.skip').addEventListener('click',e=>{e.preventDefault();$('#main').focus()});matchMedia('(max-width:850px)').addEventListener('change',syncNavigation);window.addEventListener('hashchange',()=>{render();$('#main').focus({preventScroll:true})});
const FUTURE_GROUPS=[
 {title:'Antes de usar com dados reais',intro:'São condições para sair da demonstração e operar de verdade.',items:[
 ['Carteira integrada ao CRM/ERP','Buscar clientes, unidades, segmentos e endereços da base oficial.'],
 ['Rotas rodoviárias reais','Calcular caminho, distância e desvio nas estradas, incluindo a política de ida e volta.'],
 ['Acesso corporativo e dados compartilhados','Autenticar usuários, respeitar permissões e territórios e salvar no servidor.'],
 ['Confiabilidade da operação','Validar dados no servidor, tratar falhas e alterações simultâneas e manter histórico de mudanças.']
 ]},
 {title:'Se o planejamento precisar de mais recursos',intro:'Só entram depois de confirmar a necessidade com o pós-vendas.',items:[
 ['Horários e capacidade por dia','Considerar duração, expediente, janelas do cliente, pausas e deslocamentos viáveis.'],
 ['Confirmação e agenda','Confirmar disponibilidade e sincronizar compromissos com a agenda da equipe.'],
 ['Tipos de viagem e pernoites','Tratar deslocamento aéreo, retorno, estadias e trechos com diferentes transportes.'],
 ['Previsão de custos','Estimar hospedagem, alimentação, pedágios e deslocamento conforme a política interna.'],
 ['Filtros e prioridades avançados','Usar tempo adicional, raio, recência, manutenção, chamados ou importância do relacionamento.'],
 ['Modelos e reaproveitamento','Duplicar roteiros e aproveitar viagens recorrentes ou rascunhos.'],
 ['Compartilhar e exportar','Enviar um resumo, gerar CSV/PDF ou imprimir quando houver uso claro.']
 ]},
 {title:'Se fizer sentido acompanhar a execução',intro:'Possibilidades para uma etapa posterior, sem compromisso de implementação.',items:[
 ['Próximos passos e lembretes','Combinar uma ação com responsável e prazo e acompanhar o retorno.'],
 ['Equipamentos e histórico completo','Consultar contatos, séries, garantias, contratos, chamados e manutenção da unidade.'],
 ['Status e colaboração da equipe','Acompanhar viagens, atribuir responsáveis e compartilhar o trabalho entre pessoas.'],
 ['Aprovação e prestação financeira','Tratar aprovação, comprovantes, reembolso e despesas realizadas.'],
 ['Uso em campo sem conexão','Preparar uma experiência móvel com dados disponíveis offline e sincronização posterior.'],
 ['Check-in ou localização','Avaliar se há necessidade real de comprovar a visita, com critérios de privacidade e autorização.'],
 ['Relatórios e evolução da experiência','Acompanhar cobertura da carteira e avaliar a facilidade de uso sem transformar o MVP em um painel de indicadores.']
 ]}
];
function improvementsPage(){return titleBlock('Possíveis melhorias','Um lugar para guardar ideias e decidir o que vale construir depois.')+`<section class="future-intro"><h2>O MVP de agora tem um objetivo</h2><p>Planejar as visitas, ajustar a agenda e registrar o retorno de cada atendimento.</p><span>As ideias abaixo estão fora do MVP. A prioridade será definida com a equipe após a apresentação.</span></section><div class="future-groups">${FUTURE_GROUPS.map(g=>`<details class="future-group"><summary><strong>${g.title}</strong><span>${plural(g.items.length,'possibilidade')}</span></summary><div class="future-content"><p>${g.intro}</p><ul>${g.items.map(([title,description])=>`<li><h3>${title}</h3><p>${description}</p></li>`).join('')}</ul></div></details>`).join('')}</div><section class="future-validation"><h2>Primeiro, validar o básico</h2><p>Na apresentação, peça para alguém montar e salvar uma viagem sem orientação. Observe se conclui, quanto tempo leva e onde encontra dificuldade. O protocolo fica no material de apresentação; ele não ocupa a operação da ferramenta.</p></section>`}

function projection(){const d=state.draft;const ps=[coords(d.origin),coords(d.destination),...d.selected.map(id=>clientById(id).coords)];let minX=Math.min(...ps.map(p=>p[0]))-1.25,maxX=Math.max(...ps.map(p=>p[0]))+1.25,minY=Math.min(...ps.map(p=>p[1]))-1.15,maxY=Math.max(...ps.map(p=>p[1]))+1.15;const lonScale=.89;let w=(maxX-minX)*lonScale,h=maxY-minY;const ratio=760/510;if(w/h>ratio){const add=(w/ratio-h)/2;minY-=add;maxY+=add}else{const add=(h*ratio-w)/(2*lonScale);minX-=add;maxX+=add}return p=>[(p[0]-minX)/(maxX-minX)*760,510-(p[1]-minY)/(maxY-minY)*510]}
function linePath(points,project){return points.map((p,i)=>{const xy=project(p);return (i?'L':'M')+xy[0].toFixed(1)+','+xy[1].toFixed(1)}).join(' ')}
function renderMap(){if(view==='mapa'){atlasDrawing();return;}const drawing=$('#mapDrawing');if(!drawing)return;const project=projection();let shapes='';if(geo)shapes=geo.features.map(f=>{const g=f.geometry;const polys=g.type==='MultiPolygon'?g.coordinates:[g.coordinates];const path=polys.map(poly=>poly.map(ring=>linePath(ring,project)+'Z').join('')).join('');return `<path class="state-shape" d="${path}"/>`}).join('');
const cities=[['Florianópolis',[-48.548,-27.595]],['Porto Alegre',[-51.23,-30.03]],['Londrina',[-51.16,-23.31]],['Maringá',[-51.94,-23.42]],['Joinville',[-48.85,-26.3]],['Cascavel',[-53.455,-24.956]],['Campinas',[-47.061,-22.906]],['Santos',[-46.33,-23.96]],['Guarapuava',[-51.46,-25.39]]];
const roads=[[[ -53.52,-26.72],[-53.1,-26.22],[-52.7,-26.15],[-52.1,-25.8],[-51.46,-25.39],[-50.6,-25.2],[-50.159,-25.095],[-49.8,-24.7],[-49.2,-24.1],[-48.049,-23.592],[-47.458,-23.502],[-46.633,-23.551]], [[-52.616,-27.101],[-52.1,-26.6],[-51.5,-26.3],[-50.2,-25.8],[-49.273,-25.429],[-48.8,-24.9],[-48.3,-24.5],[-47.8,-24.2],[-47,-23.9],[-46.633,-23.551]], [[-51.23,-30.03],[-50.9,-29.3],[-49.8,-28.5],[-48.548,-27.595],[-48.85,-26.3],[-49.273,-25.429]], [[-53.455,-24.956],[-52.6,-24.5],[-51.94,-23.42],[-51.16,-23.31],[-49.9,-23.3],[-48.5,-23.1],[-47.061,-22.906],[-46.633,-23.551]]];
const d=state.draft;const selected=d.selected.map(clientById).filter(Boolean);const routePoints=[coords(d.origin),...selected.map(c=>c.coords),coords(d.destination)];
const route=tripPath(routePoints,project);const labels=[['SANTA CATARINA',[-50.7,-27.4]],['PARANÁ',[-51.5,-24.5]],['SÃO PAULO',[-48.4,-22.6]],['RIO GRANDE DO SUL',[-52,-29.3]],['MATO GROSSO DO SUL',[-53,-22.5]]];
drawing.innerHTML=`${shapes}${roads.map((r,i)=>`<path class="map-road ${i>1?'road-secondary':''}" d="${smoothPath(r,project)}"/>`).join('')}${labels.map(([label,p])=>{const [x,y]=project(p);return `<text x="${x}" y="${y}" class="state-label">${label}</text>`}).join('')}${cities.map(([label,p])=>{const [x,y]=project(p);return `<circle cx="${x}" cy="${y}" r="1.6" fill="#aab59b"/><text x="${x+6}" y="${y+3}" class="city-label">${label}</text>`}).join('')}<path class="route-underlay" d="${route}"/><path class="route-path" d="${route}"/>${candidates().filter(c=>!d.selected.includes(c.id)).map(c=>{const xy=project(c.coords);return `<g class="map-pin" role="button" tabindex="0" aria-label="Ver ${esc(c.name)} no mapa" data-pin="${c.id}" transform="translate(${xy[0]},${xy[1]})"><circle r="10"/><text y=".5">+</text></g>`}).join('')}${selected.map((c,i)=>{const xy=project(c.coords);return `<g class="map-pin selected" role="button" tabindex="0" aria-label="Parada ${i+1}: ${esc(c.name)}" data-pin="${c.id}" transform="translate(${xy[0]},${xy[1]})"><circle r="12"/><text y=".5">${i+1}</text><text class="city-label" x="19" y="${c.id==='c1'?20:-17}" style="text-anchor:start;font-weight:400;font-size:10px">${esc(c.city)}</text></g>`}).join('')}${[[d.origin,'map-origin'],[d.destination,'map-destination']].map(([name,cls])=>{const p=project(coords(name));return `<circle cx="${p[0]}" cy="${p[1]}" r="6" class="${cls}"/><text x="${p[0]+12}" y="${p[1]+22}" class="city-label" style="font-weight:600;fill:#3e5931">${esc(name.split(',')[0])}</text>`}).join('')}`;applyMapTransform();showPin();
}
function showPin(){const root=$('#mapPopup');if(!root)return;const c=clientById(activePin);if(!c){root.innerHTML='';return}root.innerHTML=`<section class="map-popup"><button class="icon-button" aria-label="Fechar cliente no mapa" data-action="close-pin">${icon('close')}</button><h3>${esc(c.name)}</h3><p>${esc(c.city)} · ${c.uf}<br>${plural(c.equipment,'equipamento')} na unidade</p><button class="button small" data-detail="${c.id}">Ver contexto do cliente</button></section>`;}
function applyMapTransform(){const group=$('#mapDrawing');if(group)group.classList.toggle('atlas-overview',view==='mapa'&&mapZoom<2);if(group)group.style.setProperty('--inverse-zoom',String(1/mapZoom));if(group)group.setAttribute('transform',`translate(${380+mapPan[0]},${255+mapPan[1]}) scale(${mapZoom}) translate(-380,-255)`)}
function bindMap(){const svg=$('#routeMap');if(!svg)return;let drag=null;
svg.addEventListener('wheel',event=>{
  if(event.deltaY===0)return;
  const factor=event.deltaMode===1?16:event.deltaMode===2?svg.clientHeight:1;
  const zoom=Math.max(.8,Math.min(12,mapZoom*Math.exp(-event.deltaY*factor*.0018)));
  if(zoom===mapZoom)return;
  event.preventDefault();
  const position=new DOMPoint(event.clientX,event.clientY).matrixTransform(svg.getScreenCTM().inverse());
  const ratio=zoom/mapZoom;
  mapPan=[position.x-380-(position.x-380-mapPan[0])*ratio,position.y-255-(position.y-255-mapPan[1])*ratio];
  mapZoom=zoom;applyMapTransform();
},{passive:false});svg.addEventListener('pointerdown',e=>{if(e.target.closest('[data-pin],[data-atlas-client],[data-city-bundle]'))return;drag={x:e.clientX,y:e.clientY,start:[...mapPan]};svg.setPointerCapture(e.pointerId)});svg.addEventListener('pointermove',e=>{if(!drag)return;const scale=svg.getScreenCTM().a;mapPan=[drag.start[0]+(e.clientX-drag.x)/scale,drag.start[1]+(e.clientY-drag.y)/scale];applyMapTransform()});svg.addEventListener('pointerup',()=>drag=null);svg.addEventListener('pointercancel',()=>drag=null);svg.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.dataset.pin){e.preventDefault();activePin=e.target.dataset.pin;showPin()}})}


paintIcons();render();
fetch('assets/br-states.geojson').then(r=>{if(!r.ok)throw Error('Map unavailable');return r.json()}).then(data=>{geo=data;renderMap()}).catch(()=>{const el=$('.map-attribution span');if(el)el.textContent='Mapa esquemático · Base indisponível'});
