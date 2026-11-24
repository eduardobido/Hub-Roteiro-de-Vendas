/* Carteira e roteiros fictícios para demonstrar somente o planejamento. */
window.DEMO = {
  "today": "2026-11-16",
  "cities": {
    "São Miguel do Oeste, SC": [
      -53.519,
      -26.725
    ],
    "São Paulo, SP": [
      -46.633,
      -23.551
    ],
    "Chapecó, SC": [
      -52.616,
      -27.101
    ],
    "Curitiba, PR": [
      -49.273,
      -25.429
    ],
    "Cascavel, PR": [
      -53.455,
      -24.956
    ],
    "Campinas, SP": [
      -47.061,
      -22.906
    ],
    "Joinville, SC": [
      -48.846,
      -26.305
    ],
    "Ponta Grossa, PR": [
      -50.159,
      -25.095
    ]
  },
  "clients": [
    {
      "id": "c1",
      "name": "Avícola Vale do Sol",
      "city": "Chapecó",
      "uf": "SC",
      "segment": "Aves",
      "coords": [
        -52.616,
        -27.101
      ],
      "equipment": 4,
      "detour": 12,
      "reason": "Revisão preventiva próxima",
      "last": "2026-08-09"
    },
    {
      "id": "c2",
      "name": "Aves Campos Gerais",
      "city": "Ponta Grossa",
      "uf": "PR",
      "segment": "Aves",
      "coords": [
        -50.159,
        -25.095
      ],
      "equipment": 2,
      "detour": 8,
      "reason": "Retorno após atendimento técnico",
      "last": "2026-08-31"
    },
    {
      "id": "c3",
      "name": "Alimentos Serra Verde",
      "city": "Curitiba",
      "uf": "PR",
      "segment": "Aves",
      "coords": [
        -49.273,
        -25.429
      ],
      "equipment": 3,
      "detour": 18,
      "reason": "Acompanhamento de performance",
      "last": "2026-09-26"
    },
    {
      "id": "c4",
      "name": "Avícola Horizonte",
      "city": "Itapetininga",
      "uf": "SP",
      "segment": "Aves",
      "coords": [
        -48.049,
        -23.592
      ],
      "equipment": 5,
      "detour": 24,
      "reason": "Cliente há mais de 90 dias sem visita",
      "last": "2026-07-24"
    },
    {
      "id": "c5",
      "name": "Granja Nova Aurora",
      "city": "Sorocaba",
      "uf": "SP",
      "segment": "Aves",
      "coords": [
        -47.458,
        -23.502
      ],
      "equipment": 2,
      "detour": 6,
      "reason": "Revisão do plano de peças",
      "last": "2026-10-13"
    },
    {
      "id": "c6",
      "name": "Proteína Paulista",
      "city": "São Paulo",
      "uf": "SP",
      "segment": "Aves",
      "coords": [
        -46.633,
        -23.551
      ],
      "equipment": 3,
      "detour": 4,
      "reason": "Visita de relacionamento",
      "last": "2026-09-17"
    },
    {
      "id": "c7",
      "name": "Aves do Planalto",
      "city": "Lages",
      "uf": "SC",
      "segment": "Aves",
      "coords": [
        -50.326,
        -27.817
      ],
      "equipment": 2,
      "detour": 86,
      "reason": "Revisão de contrato de manutenção",
      "last": "2026-08-16"
    },
    {
      "id": "c8",
      "name": "Suínos Alto Uruguai",
      "city": "Concórdia",
      "uf": "SC",
      "segment": "Suínos",
      "coords": [
        -52.027,
        -27.235
      ],
      "equipment": 4,
      "detour": 26,
      "reason": "Revisão preventiva próxima",
      "last": "2026-08-01"
    },
    {
      "id": "c9",
      "name": "Bovinos Araucária",
      "city": "Castro",
      "uf": "PR",
      "segment": "Bovinos",
      "coords": [
        -50.012,
        -24.793
      ],
      "equipment": 2,
      "detour": 32,
      "reason": "Acompanhamento de performance",
      "last": "2026-10-02"
    },
    {
      "id": "c10",
      "name": "Alimentos Bom Trigo",
      "city": "Campinas",
      "uf": "SP",
      "segment": "Alimentos",
      "coords": [
        -47.061,
        -22.906
      ],
      "equipment": 3,
      "detour": 42,
      "reason": "Treinamento da equipe de operação",
      "last": "2026-09-06"
    }
  ],
  "trips": [
    {
      "id": "t1",
      "name": "Relacionamento · Oeste catarinense",
      "origin": "São Miguel do Oeste, SC",
      "destination": "Chapecó, SC",
      "start": "2026-11-16",
      "end": "2026-11-18",
      "segment": "Aves",
      "selected": [
        "c1"
      ]
    },
    {
      "id": "t2",
      "name": "Acompanhamento · Paraná",
      "origin": "Cascavel, PR",
      "destination": "Curitiba, PR",
      "start": "2026-11-09",
      "end": "2026-11-13",
      "segment": "Aves",
      "selected": [
        "c2",
        "c3"
      ]
    },
    {
      "id": "t3",
      "name": "Visitas · Interior de São Paulo",
      "origin": "Curitiba, PR",
      "destination": "Campinas, SP",
      "start": "2026-10-19",
      "end": "2026-10-22",
      "segment": "Aves",
      "selected": [
        "c4",
        "c5"
      ]
    }
  ]
};

// Identificadores estáveis relacionam carteira, pessoas e viagens nesta demonstração.
DEMO.members = [
  ['ana','Ana Ribeiro','Oeste catarinense','#42644b'],
  ['bruno','Bruno Martins','Campos Gerais','#5e5088'],
  ['clara','Clara Souza','Interior paulista','#925831'],
  ['diego','Diego Lima','Oeste do Paraná','#38637e'],
  ['elisa','Elisa Costa','Serra catarinense','#8c4766'],
  ['felipe','Felipe Rocha','Grande São Paulo','#59662e'],
  ['ines','Inês Duarte','Vale do Itajaí','#326e71']
].map(([id,name,region,color])=>({id,name,region,color}));
const baseOwners=['ana','bruno','bruno','clara','clara','felipe','elisa','ana','bruno','felipe'];
DEMO.clients.forEach((c,i)=>c.owner=baseOwners[i]);
const regionalClients=[
 ['Agroindústria Cristal','Xaxim','SC',-52.54,-26.96,'ana','Aves'],
 ['Cooperativa Rio Branco','Maravilha','SC',-53.17,-26.75,'ana','Suínos'],
 ['Frigorífico Horizonte Sul','Carambeí','PR',-50.10,-24.95,'bruno','Aves'],
 ['Aves Boa Colheita','Tatuí','SP',-47.86,-23.35,'clara','Aves'],
 ['Alimentos Santa Elisa','Boituva','SP',-47.67,-23.28,'clara','Alimentos'],
 ['Cooperativa Vale Azul','Cascavel','PR',-53.46,-24.95,'diego','Aves'],
 ['Avícola Itaipu','Medianeira','PR',-54.09,-25.30,'diego','Aves'],
 ['Proteína Oeste','Toledo','PR',-53.74,-24.73,'diego','Suínos'],
 ['Agro Serra Alta','Curitibanos','SC',-50.59,-27.28,'elisa','Bovinos'],
 ['Alimentos Campo Belo','Campos Novos','SC',-51.22,-27.40,'elisa','Alimentos'],
 ['Frigorífico Japi','Jundiaí','SP',-46.88,-23.19,'felipe','Bovinos'],
 ['Cooperativa Bandeirantes','Indaiatuba','SP',-47.22,-23.09,'felipe','Aves'],
 ['Avícola Rio do Sul','Rio do Sul','SC',-49.65,-27.21,'ines','Aves'],
 ['Alimentos Vale Claro','Blumenau','SC',-49.07,-26.92,'ines','Alimentos'],
 ['Frigorífico Alto Vale','Ibirama','SC',-49.52,-27.06,'ines','Suínos']
];
regionalClients.forEach(([name,city,uf,x,y,owner,segment],i)=>{
  DEMO.clients.push({id:'r'+i,name,city,uf,coords:[x,y],owner,segment,equipment:2+i%5,
    reason:['Revisão preventiva próxima','Retorno após atendimento técnico','Treinamento da operação'][i%3],last:'2026-10-14'});
  DEMO.cities[city+', '+uf]??=[x,y];
});
DEMO.trips.forEach((t,i)=>t.owner=['ana','bruno','clara'][i]);
DEMO.programs=[
 ['ana','São Miguel do Oeste, SC','Chapecó, SC',['c1','r0'],0],
 ['bruno','Curitiba, PR','Ponta Grossa, PR',['c3','c2','r2'],1],
 ['clara','São Paulo, SP','Tatuí, SP',['c5','r4','r3'],2],
 ['diego','Cascavel, PR','Medianeira, PR',['r5','r6'],3],
 ['elisa','Campos Novos, SC','Curitibanos, SC',['r9','r8'],4],
 ['felipe','São Paulo, SP','Campinas, SP',['c6','r10','c10'],7],
 ['ana','Chapecó, SC','Maravilha, SC',['c8','r1'],9],
 ['clara','Tatuí, SP','São Paulo, SP',['c4','c5'],10]
];


DEMO.corridor=[[-53.519,-26.725],[-53.36,-26.54],[-53.21,-26.50],[-53.08,-26.36],[-52.84,-26.27],[-52.67,-26.22],[-52.50,-26.09],[-52.35,-26.06],[-52.19,-25.97],[-52.02,-25.96],[-51.83,-25.80],[-51.67,-25.68],[-51.54,-25.57],[-51.46,-25.39],[-51.26,-25.37],[-51.04,-25.42],[-50.89,-25.46],[-50.68,-25.38],[-50.46,-25.39],[-50.28,-25.22],[-50.16,-25.095],[-49.98,-24.98],[-49.84,-24.80],[-49.65,-24.73],[-49.53,-24.59],[-49.35,-24.42],[-49.23,-24.31],[-49.04,-24.25],[-48.90,-24.14],[-48.69,-24.04],[-48.55,-23.94],[-48.34,-23.86],[-48.21,-23.68],[-48.05,-23.59],[-47.84,-23.57],[-47.63,-23.58],[-47.46,-23.50],[-47.24,-23.53],[-47.08,-23.53],[-46.92,-23.58],[-46.76,-23.54],[-46.633,-23.551]];
[
 ['Aves do Sudoeste','Pato Branco',-52.67,-26.22,'diego',8],
 ['Avícola Campo Real','Guarapuava',-51.46,-25.39,'bruno',12],
 ['Cooperativa das Araucárias','Irati',-50.65,-25.47,'bruno',18],
 ['Avícola Vale do Itararé','Itararé',-49.33,-24.11,'clara',28],
 ['Granja das Colinas','Itapeva',-48.88,-23.98,'clara',22],
 ['Avícola Alto Paranapanema','Capão Bonito',-48.35,-24.00,'clara',20]
].forEach(([name,city,x,y,owner,detour],i)=>DEMO.clients.push({id:'via'+i,name,city,uf:i<3?'PR':'SP',segment:'Aves',coords:[x,y],owner,detour,equipment:i%4+2,last:'2026-09-17',reason:['Revisão preventiva próxima','Acompanhamento de performance','Retorno após atendimento técnico'][i%3]}));


DEMO.clients.forEach(c=>DEMO.cities[c.city+', '+c.uf]??=c.coords);

DEMO.members.push(
  {id:'joao',name:'João Almeida',region:'Sudoeste do Paraná',color:'#406778'},
  {id:'lara',name:'Lara Freitas',region:'Alto Paranapanema',color:'#855e37'},
  {id:'marcos',name:'Marcos Vieira',region:'Meio-Oeste catarinense',color:'#4f7163'}
);
const territories=[
 ['Chapecó','Xaxim','Maravilha'],['Ponta Grossa','Carambeí','Castro'],['Sorocaba','Tatuí','Boituva'],
 ['Cascavel','Toledo','Medianeira'],['Lages','Curitibanos','Campos Novos'],['Campinas','Jundiaí','Indaiatuba'],
 ['Blumenau','Ibirama','Rio do Sul'],['Pato Branco','Guarapuava','Irati'],['Itapeva','Itararé','Capão Bonito'],
 ['Concórdia','Chapecó','Campos Novos']
];
const enterprise=['Avícola','Frigorífico','Agroindústria','Alimentos'];
const territoryNames=['Rio Branco','Campos Altos','Boa Vista','Vale Azul','Santa Rita','Bela Serra','Novo Horizonte','Campo Verde','Rio Dourado','Boa Esperança'];
const units=['Central','Norte','Sul','Leste','Oeste'];
for(let i=0;DEMO.clients.length<180;i++){
  const region=i%territories.length,unit=Math.floor(i/territories.length);
  const city=territories[region][unit%3],base=DEMO.clients.find(c=>c.city===city);
  const kind=(region+unit)%enterprise.length,angle=i*2.39996,radius=.034+(unit%6)*.023;
  DEMO.clients.push({id:'unidade'+i,name:enterprise[kind]+' '+territoryNames[region]+' · '+units[Math.floor(unit/4)],
    city,uf:base.uf,coords:[base.coords[0]+radius*Math.cos(angle),base.coords[1]+radius*Math.sin(angle)],
    segment:['Aves','Suínos','Bovinos','Alimentos'][kind],owner:DEMO.members[region].id,
    equipment:2+(i*7)%11,last:'2026-10-'+String(1+i%26).padStart(2,'0'),
    reason:['Revisão preventiva próxima','Avaliação de capacidade instalada','Retorno após atendimento técnico','Treinamento da operação'][unit%4]});
}
for(const [i,id] of ['ines','joao','lara','marcos'].entries()){
  const group=DEMO.clients.filter(c=>c.owner===id);
  const start=group[0],last=group.find(c=>c.city!==start.city);
  DEMO.programs.push([id,start.city+', '+start.uf,last.city+', '+last.uf,[start.id,last.id],i+1]);
}
