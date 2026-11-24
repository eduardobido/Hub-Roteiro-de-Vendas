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
