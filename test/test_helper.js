'use strict';

const { Provider } = require('../lib');
const path = require('path');
const supertest = require('supertest');

module.exports = function(dir, basename) {
  let conf = path.format({
    dir,
    name: basename || path.basename(dir),
    ext: '.config.js'
  });
  let profile = require(conf);
  let provider = new Provider('http://localhost', profile);
  let server = provider.application.listen();
  let request = supertest(server);

  provider.issuer = `http://localhost:${server.address().port}`;

  return { provider, request, server, profile };
};
