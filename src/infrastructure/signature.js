'use strict';

import Crypto from 'crypto';
import Moment from 'moment';
import _ from 'lodash';


const createHash = (value) => {
  return Crypto.createHash('md5').update(value).digest('hex');
};

export default {
  sign(apiKey, secret, options = {}){

    if (!_.isString(apiKey) || _.isEmpty(apiKey)) {
      throw new Error('API key is required');
    }

    if (!_.isString(secret) || _.isEmpty(secret)) {
      throw new Error('API secret is required');
    }

    const timestamp = options.timestamp || Moment().unix();
    const raw = `${apiKey}${secret}${timestamp}`;
    return createHash(raw);
  }
}