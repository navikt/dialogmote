# Dialogmote
Frontend for digitalisering av sykefraværsoppfølging (DigiSYFO) http://tjenester.nav.no/dialogmote/

## TL;DR
React-app for den sykmeldte. Viser dialogmøter

## Kjøre lokalt
Applikasjonen har en mock som kan brukes lokalt. Her mockes diverse endepunkter, dog ikke alle. 

Du må ha Node installert.

* For å kjøre koden lokalt: 
    - `$ npm install`
    - `$ npm run dev`
    - I et annet vindu `$ npm run start-local`
    - Gå til `http://localhost:8080/` 
    - Eventuelt kan komandoene kjøres fra `package.json` i intellij.
    - Data til dialogmøte kan bli endret i `siste.json`
    - Møtebehovstatus kan bli endret i `mockSyfomotebehov.js`: bytt verdi av `motebehovStatusEnum` i `mockPilotEndepunkterForLokalmiljo(...)`

* Kjør tester med `npm test` eller `npm test:watch`
* Lint JS-kode med `npm run lint` eller `npm run lint:fix`

## Deploy mock app til Heroku
Installer heroku, på mac kan du bruke brew: `$ brew install heroku`.

For å kunne deploye til Heroku må du først logge inn: 
* `$ heroku login`
* `$ heroku container:login`

Deploy til heroku ved å kjøre deployscript: `$ sh deploy-heroku.sh`.
