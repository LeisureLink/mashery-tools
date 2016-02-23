'use strict';

import Signature from '../../src/infrastructure/signature';

describe('Signature', () => {

  const apiKey = '2fvmer3qbk7f3jnqneg58bu2';
  const secret = 'qvxkmw57pec7';

  describe('#sign(apiKey, secret)', () => {

    it(`requires the apiKey`, () => {

      expect(() => {
        Signature.sign(null, secret);
      }).to.throw(/key/);

      expect(() => {
        Signature.sign('', secret);
      }).to.throw(/key/);

      expect(() => {
        Signature.sign(1, secret);
      }).to.throw(/key/);

    });

    it(`requires the secret`, () => {

      expect(() => {
        Signature.sign(apiKey, null);
      }).to.throw(/secret/);

      expect(() => {
        Signature.sign(apiKey, '');
      }).to.throw(/secret/);

      expect(() => {
        Signature.sign(apiKey, 1);
      }).to.throw(/secret/);

    });


    it(`signs the values properly`, () => {
      const timestamp = 1200603038;
      const result = Signature.sign(apiKey, secret, { timestamp });
      expect(result).to.be.equal('65a08176826fa4621116997e1dd775fa');
    });


  });

});