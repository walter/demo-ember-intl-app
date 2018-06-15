/* eslint-env node */
'use strict';

const fs = require('fs');
const bodyParser = require('body-parser');

// To use it create some files under `mocks/`
// e.g. `server/mocks/ember-hamsters.js`
//
// module.exports = function(app) {
//   app.get('/ember-hamsters', function(req, res) {
//     res.send('hello');
//   });
// };

module.exports = function(app) {
  const globSync   = require('glob').sync;
  const mocks      = globSync('./mocks/**/*.js', { cwd: __dirname }).map(require);
  const proxies    = globSync('./proxies/**/*.js', { cwd: __dirname }).map(require);

  // Log proxy requests
  const morgan = require('morgan');
  app.use(morgan('dev'));

  mocks.forEach(route => route(app));
  proxies.forEach(route => route(app));

  app.get('/translations/en-nz.json', function(req, res) {
    const json = JSON.parse(fs.readFileSync('./server/translations/en-nz.json'));
    res.send(json);
  });

  app.get('/translations/mi.json', function(req, res) {
    const json = JSON.parse(fs.readFileSync('./server/translations/mi.json'));
    res.send(json);
  });

  app.get('/translations/ar.json', function(req, res) {
    const json = JSON.parse(fs.readFileSync('./server/translations/ar.json'));
    res.send(json);
  });
};
