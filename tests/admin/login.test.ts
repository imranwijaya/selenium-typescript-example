import { afterEach, beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import { Browser } from '../../lib/browser';
import { Pages } from '../../pages/admin';
import { config } from '../../config/index';

describe('Login Functionality', function () {
  let page: Pages;

  beforeEach(async function () {
    const browser = await new Browser('firefox').build();
    page = new Pages(browser);
    await page.login.visit('/login');
  });

  afterEach(async function () {
    await page.quit();
  });

  it('shows login document title', async function () {
    const title = await page.login.title();
    expect(title).equal('Hypster | Login');
  });

  it('greets with login to start your session', async function () {
    const greet = await page.login.greet();
    expect(greet).equal('Login to start your session');
  });

  it('shows success response message when user submits valid credentials', async function () {
    await page.login.authenticate(config.username, config.password);
    const message = await page.login.successMessagePresent();
    expect(message).contain('Welcome Super Testing');
  });

  it('shows error response message when user submits invalid credentials', async function () {
    await page.login.authenticate(config.username, '!nv4lidP455w0rD');
    const message = await page.login.failureMessagePresent();
    expect(message).contain('Email or Password does not match');
  });
});
