# Dialogmote

React frontend for sykmeldtes dialogmøter

- Prod: https://www.nav.no/syk/dialogmote
- Test: https://www-gcp.dev.nav.no/syk/dialogmote
- Lokalt: http://localhost:8080/syk/dialogmote

## Kjøre koden lokalt:

- `$ npm install`
- `$ npm start`
- Eventuelt kan komandoene kjøres fra `package.json` i intellij.
- Data til dialogmøte kan bli endret i `siste.json`
- Møtebehovstatus kan bli endret i `mockSyfomotebehov.js`: bytt verdi av `motebehovStatusEnum` i `mockPilotEndepunkterForLokalmiljo(...)`

- Kjør tester med `npm test` eller `npm test:watch`
- Lint JS-kode med `npm run lint` eller `npm run lint:fix`
