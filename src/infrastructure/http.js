'use strict';

import Wreck from 'wreck';
import QS from 'qs';
import Signature from './signature';

const HTTP_METHODS = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  patch: 'PATCH',
  delete: 'delete'
};

export default class {

  constructor(baseUrl, apiKey, secret) {
    baseUrl = baseUrl || 'http://api.mashery.com/v2/rest';

    this.apiKey = apiKey;
    this.secret = secret;

    this.wreck = Wreck.defaults({
      baseUrl
    });


    this.qs = { apiKey }
  }

  async get(uri, options) {
    return this.request(HTTP_METHODS.get, uri, options);
  }

  async post(uri, options) {
    return this.request(HTTP_METHODS.post, uri, options);
  }

  async put(uri, options) {
    return this.request(HTTP_METHODS.put, uri, options);
  }

  async delete(uri, options) {
    return this.request(HTTP_METHODS.delete, uri, options);
  }

  async patch(uri, options) {
    return this.request(HTTP_METHODS.patch, uri, options);
  }

  async request(method, uri, options) {
    const wreck = this.wreck;
    const apiKey = this.apiKey;
    const sig = Signature.sign(apiKey, this.secret);
    const params = QS.stringify({ apiKey, sig });
    uri = `${uri}?${params}`;

    return new Promise((resolve, reject) => {
      wreck.request(method, uri, options, (err, response) => {
        if (err) return reject(err);

        wreck.read(response, { json: true }, (err, payload) => {
          if (err) return reject(err);

          return resolve({ response, payload });
        });
      });
    });
  }

}

export const HttpMethods = HTTP_METHODS;