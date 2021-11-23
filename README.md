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

## Deploy mock app til Heroku

Installer heroku, på mac kan du bruke brew: `$ brew install heroku`.

For å kunne deploye til Heroku må du først logge inn:

- `$ heroku login`
- `$ heroku container:login`

Deploy til heroku ved å kjøre deployscript: `$ sh deploy-heroku.sh`.
