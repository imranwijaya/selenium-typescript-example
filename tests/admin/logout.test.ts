import { afterEach, beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import { Browser } from '../../lib/browser';
import { Pages } from '../../pages/admin';
import { config } from '../../config/index';
// import { writeFile } from 'fs/promises';

describe('Logout Functionality', function () {
  let page: Pages;

  beforeEach(async function () {
    const browser = await new Browser('firefox').build();
    page = new Pages(browser);
    await page.login.visit('/login');
  });

  afterEach(async function () {
    await page.quit();
  });

  it('redirects to the login page on successful logged out', async function () {
    await page.login.authenticate(config.username, config.password);
    const url = await page.home.unauthenticate();
    // const capture = await page.browser.takeScreenshot();
    // writeFile('reports/out.png', capture, 'base64');
    expect(url).equal(`${config.baseUrl}/login`);
  });
});
