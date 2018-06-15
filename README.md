# demo-ember-intl-app

Demonstrates multiple language support w/ runtime loading of
translations

## Translations git submodule

This app demonstrates loading translations at application load
(i.e. async translation loading) from a separate web server. However,
for simplicity for the demo, the separate web server is the `ember-cli`
included proxy server and therefore translations live in a git
submodule under `server/translations`.

To update translations during demo, you'll need to `cd
server/translations` and `git pull`  to bring them in sync with
separate repository.
