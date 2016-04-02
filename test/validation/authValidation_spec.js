import { expect } from 'chai';

import { validateRegister, validateLogin } from '../../src/universal/validation/authValidation';

describe('validation',  () => {
  describe('validateRegister', () => {
    it('passes for acceptable details', () => {
      const username = 'username';
      const password = 'password';
      const email    = 'valid@example.com';

      const errors = validateRegister(username, password, email);

      expect(errors).to.be.empty;
    });

    it('fails with no username', () => {
      const username = '';
      const password = 'password';
      const email    = 'valid@example.com';

      const errors = validateRegister(username, password, email);

      expect(errors.username).to.equal('Please provide a username');
    });

    it('fails for a username with non alpha numeric or hypen', () => {
      const username = 'B4D4$$!!!!';
      const password = 'password';
      const email    = 'valid@example.com';

      const errors = validateRegister(username, password, email);

      expect(errors.username).to.equal('Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen');
    });

    it('fails for a username with spaces', () => {
      const username = 'bad username';
      const password = 'password';
      const email    = 'valid@example.com';

      const errors = validateRegister(username, password, email);

      expect(errors.username).to.equal('Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen');
    });

    it('fails with no password', () => {
      const username = 'username';
      const password = '';
      const email    = 'valid@example.com';

      const errors = validateRegister(username, password, email);

      expect(errors.password).to.equal('Please supply a password');
    });

    it('fails for a password under 6 characters', () => {
      const username = 'username';
      const password = 'passw';
      const email    = 'valid@example.com';

      const errors = validateRegister(username, password, email);

      expect(errors.password).to.equal('Please supply a password over 6 characters');
    });

    it('fails with no email', () => {
      const username = 'username';
      const password = 'password';
      const email    = '';

      const errors = validateRegister(username, password, email);

      expect(errors.email).to.equal('Please provide an email');
    });

    it('fails with an invalid email', () => {
      const username = 'username';
      const password = 'password';
      const email    = '234567';

      const errors = validateRegister(username, password, email);

      expect(errors.email).to.equal('Please provide a valid email address');
    });
  });

  describe('validateLogin', () => {
    it('passes with both username and password', () => {
      const username = 'username';
      const password = 'password';

      const errors = validateLogin(username, password);

      expect(errors).to.be.empty;
    });

    it('fails with no username', () => {
      const username = '';
      const password = 'password';

      const errors = validateLogin(username, password);

      expect(errors.username).to.equal('Please provide a username');
    });

    it('fails with no password', () => {
      const username = 'username';
      const password = '';

      const errors = validateLogin(username, password);

      expect(errors.password).to.equal('Please supply a password');
    });
  });
});
