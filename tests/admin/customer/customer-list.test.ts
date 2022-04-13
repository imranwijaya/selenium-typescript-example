import { afterEach, beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import { Browser } from '../../../lib/browser';
import { Pages } from '../../../pages/admin';
import { config } from '../../../config/index';

describe('Customer List Functionality', function () {
  let page: Pages;

  context('Table row headers', function () {
    beforeEach(async function () {
      const browser = await new Browser('firefox').build();
      page = new Pages(browser);
      // await page.login.adminAuthenticate(config.username, config.password);
      await page.login.visit('/login');
      await page.login.authenticate(config.username, config.password);
      await page.customer.visit('/customer/');
    });

    afterEach(async function () {
      await page.quit();
    });

    const arrayHeaderName = [
      'No',
      'Name',
      'Address',
      'Phone',
      'Email',
      'Last Update',
      'Action',
    ];

    arrayHeaderName.forEach(function (name, index) {
      it(`shows header text '${name}'`, async function () {
        const headerName = await page.customer.tableHeaderName(index + 1);
        expect(headerName).equal(name);
      });
    });
  });

  context('Table row data', function () {
    beforeEach(async function () {
      const browser = await new Browser('firefox').build();
      page = new Pages(browser);
      // await page.login.adminAuthenticate(config.username, config.password);
      await page.login.visit('/login');
      await page.login.authenticate(config.username, config.password);
      await page.customer.visit('/customer/');
    });

    afterEach(async function () {
      await page.quit();
    });

    const arrayTableRowData = [
      '1',
      'John Doe',
      'address of john doe',
      '08123456789',
      'john@doe.com',
      '09/Nov/2020 23:46:09',
    ];

    arrayTableRowData.forEach(function (data, index) {
      it(`shows data text '${data}'`, async function () {
        const rowData = await page.customer.tableDataName(1, index + 1);
        expect(rowData).equal(data);
      });
    });
  });

  context('Add button', function () {
    beforeEach(async function () {
      const browser = await new Browser('firefox').build();
      page = new Pages(browser);
      // await page.login.adminAuthenticate(config.username, config.password);
      await page.login.visit('/login');
      await page.login.authenticate(config.username, config.password);
      await page.customer.visit('/customer/');
    });

    afterEach(async function () {
      await page.quit();
    });

    it('move to add customer page when the add button is clicked', async function () {
      await page.customer.addButton();
      const addCustomerPageUrl = await page.customer.url();
      expect(addCustomerPageUrl).equal(`${config.baseUrl}/customer/add`);
    });
  });

  context('Edit button', function () {
    beforeEach(async function () {
      const browser = await new Browser('firefox').build();
      page = new Pages(browser);
      // await page.login.adminAuthenticate(config.username, config.password);
      await page.login.visit('/login');
      await page.login.authenticate(config.username, config.password);
      await page.customer.visit('/customer/');
    });

    afterEach(async function () {
      await page.quit();
    });

    it('move to edit customer page when the edit button is clicked', async function () {
      await page.customer.editButton(1);
      const editCustomerPageUrl = await page.customer.url();
      expect(editCustomerPageUrl).contain(`${config.baseUrl}/customer/edit/`);
    });
  });

  context('Delete button', function () {
    beforeEach(async function () {
      const browser = await new Browser('firefox').build();
      page = new Pages(browser);
      // await page.login.adminAuthenticate(config.username, config.password);
      await page.login.visit('/login');
      await page.login.authenticate(config.username, config.password);
      await page.customer.visit('/customer/');
    });

    afterEach(async function () {
      await page.quit();
    });

    it('shows delete confirmation pop-up when the delete button is clicked', async function () {
      const popup = await page.customer.deleteButton(10);
      expect(popup).to.be.exist;
    });

    it(`has 'No' button on the delete confirmation pop-up`, async function () {
      const actionButtonNo = await page.customer.deleteConfirmationActionNo(10);
      expect(actionButtonNo).equal('No');
    });

    it(`has 'Yes' button on the delete confirmation pop-up`, async function () {
      const actionButtonYes = await page.customer.deleteConfirmationActionYes(
        10,
      );
      expect(actionButtonYes).equal('Yes');
    });
  });
});
