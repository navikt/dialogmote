function addDaysToDate(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);

  return date;
}

exports.siste = {
  moteUuid: '7645eb7f-2e46-4b0d-a19c-8d9b43158eca',
  status: 'OPPRETTET',
  fnr: '19026900010',
  opprettetTidspunkt: '2019-11-08T12:35:37.669+01:00',
  bekreftetTidspunkt: null,
  deltakere: [
    {
      navn: 'Fanny Storm',
      orgnummer: '110110110',
      type: 'arbeidsgiver',
      svartidspunkt: null,
      svar: [
        {
          id: 11802,
          tid: '2019-11-22T10:00:00+01:00',
          created: '2019-11-08T12:35:37.693+01:00',
          sted: 'Storgata 1',
          valgt: false,
        },
        {
          id: 11801,
          tid: '2019-11-14T12:00:00+01:00',
          created: '2019-11-08T12:35:37.687+01:00',
          sted: 'Storgata 1',
          valgt: false,
        },
      ],
    },
    {
      navn: 'Mariann Løvold',
      orgnummer: null,
      type: 'Bruker',
      svartidspunkt: null,
      svar: [
        {
          id: 11802,
          tid: '2019-11-22T10:00:00+01:00',
          created: '2019-11-08T12:35:37.693+01:00',
          sted: 'Storgata 1',
          valgt: false,
        },
        {
          id: 11801,
          tid: '2019-11-14T12:00:00+01:00',
          created: '2019-11-08T12:35:37.687+01:00',
          sted: 'Storgata 1',
          valgt: true,
        },
      ],
    },
    {
      navn: 'Fanny Storm',
      orgnummer: '110110110',
      type: 'arbeidsgiver',
      svartidspunkt: null,
      svar: [
        {
          id: 11802,
          tid: '2019-11-22T10:00:00+01:00',
          created: '2019-11-08T12:35:37.693+01:00',
          sted: 'Storgata 1',
          valgt: false,
        },
        {
          id: 11801,
          tid: '2019-11-14T12:00:00+01:00',
          created: '2019-11-08T12:35:37.687+01:00',
          sted: 'Storgata 1',
          valgt: false,
        },
      ],
    },
    {
      navn: 'Mariann Løvold',
      orgnummer: null,
      type: 'Bruker',
      svartidspunkt: null,
      svar: [
        {
          id: 11802,
          tid: '2019-11-22T10:00:00+01:00',
          created: '2019-11-08T12:35:37.693+01:00',
          sted: 'Storgata 1',
          valgt: false,
        },
        {
          id: 11801,
          tid: '2019-11-14T12:00:00+01:00',
          created: '2019-11-08T12:35:37.687+01:00',
          sted: 'Storgata 1',
          valgt: true,
        },
      ],
    },
  ],
  bekreftetAlternativ: null,
  alternativer: [
    {
      id: 11802,
      tid: addDaysToDate(14),
      created: '2019-11-08T12:35:37.693+01:00',
      sted: 'Storgata 1',
      valgt: false,
    },
    {
      id: 11801,
      tid: addDaysToDate(10),
      created: '2019-11-08T12:35:37.687+01:00',
      sted: 'Storgata 1',
      valgt: false,
    },
  ],
};
