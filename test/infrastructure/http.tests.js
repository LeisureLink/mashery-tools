'use strict';

import Http from '../../src/infrastructure/http';

describe('HTTP Client', () => {

  const apiKey = process.env.API_KEY;
  const secret = process.env.SECRET;

  const URI = 'http://api.sandbox.mashery.com/v2/rest';

  let http;
  before(() => {
    http = new Http(URI, apiKey, secret);
    expect(http).to.be.ok;
  });

  describe('#request(method, uri, options)', () => {

    it(`performs a request`, async () => {

      let result = await http.request('GET', '/123/reports/area/cache-hit-rate');
      console.log(result.payload.toString());


    });


  });

});