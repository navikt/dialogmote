const express = require('express');
const mockSyfomoteadmin = require('./mockSyfomoteadmin');
const mockSyfomotebehov = require('./mockSyfomotebehov');
const mockIsdialogmote = require('./mockIsdialogmote');

function mockEndepunkter(server, erLokal) {
  server.use(express.json());
  server.use(express.urlencoded());

  server.get('/esso/logout', (req, res) => {
    res.send('<p>Du har blitt sendt til utlogging.</p><p><a href="/sykefravaer">Gå til Ditt sykefravær</a></p>');
  });

  server.get('/dittnav', (req, res) => {
    res.send(
      '<p>Ditt Nav er ikke tilgjengelig - dette er en testside som kun viser Ditt sykefravær.</p><p><a href="/sykefravaer">Gå til Ditt sykefravær</a></p>'
    );
  });

  [mockSyfomoteadmin, mockSyfomotebehov, mockIsdialogmote].forEach((func) => {
    func(server, erLokal);
  });
}

module.exports = mockEndepunkter;
