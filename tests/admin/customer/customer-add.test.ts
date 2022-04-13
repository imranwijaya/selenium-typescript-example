import { afterEach, beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import { Browser } from '../../../lib/browser';
import { Pages } from '../../../pages/admin';
import { config } from '../../../config/index';

describe('Add Customer Functionality', function () {
  let page: Pages;

  context('Basic page components', function () {
    beforeEach(async function () {
      const browser = await new Browser('firefox').build();
      page = new Pages(browser);
      await page.login.adminAuthenticate(config.username, config.password);
      await page.customer.visit('/customer/add');
    });

    afterEach(async function () {
      await page.quit();
    });

    const data = {
      id: 'customer',
      title: 'Add New Customer',
      menu: 'Customer',
      url: '/customer/add',
      header: true,
      headerText: 'Add Customer',
      headerSmall: false,
      headerSmallText: '',
      breadcrumbLevel: 3,
      breadcrumbText1: 'Home',
      breadcrumbText2: 'Customer',
      breadcrumbText3: 'Add',
      breadcrumbText4: '',
      breadcrumbLink1: '',
      breadcrumbLink2: '/customer/',
      breadcrumbLink3: '',
    };

    it('shows document title', async function () {
      const title = await page.customer.title();
      expect(title).equal(data.title);
    });

    it('shows header text', async function () {
      const header = await page.customer.headerName();
      expect(header).equal(data.headerText);
    });

    it(`shows text '${data.breadcrumbText1}' and link on breadcrumb level 1`, async function () {
      const breadcrumbText = await page.customer.breadcrumbText(1);
      const breadcrumbLink = await page.customer.breadcrumbLink(1);
      expect(breadcrumbText).equal(data.breadcrumbText1);
      expect(breadcrumbLink).equal(config.baseUrl);
    });

    it(`shows text '${data.breadcrumbText2}' and link on breadcrumb level 2`, async function () {
      const breadcrumbText = await page.customer.breadcrumbText(2);
      const breadcrumbLink = await page.customer.breadcrumbLink(2);
      expect(breadcrumbText).equal(data.breadcrumbText2);
      const baseUrl = config.baseUrl;
      expect(breadcrumbLink).equal(`${baseUrl}${data.breadcrumbLink2}`);
    });

    it(`shows text '${data.breadcrumbText3}' on breadcrumb level 3`, async function () {
      const breadcrumbText = await page.customer.breadcrumbText(3);
      expect(breadcrumbText).equal(data.breadcrumbText3);
    });

    it('has active class', async function () {
      const activeClass = await page.customer.activeClass();
      expect(activeClass).contain('active');
    });

    it('shows menu text Customer', async function () {
      const menuText = await page.customer.menuText();
      expect(menuText).equal('Customer');
    });
  });

  context('Form components', function () {
    beforeEach(async function () {
      const browser = await new Browser('firefox').build();
      page = new Pages(browser);
      await page.login.adminAuthenticate(config.username, config.password);
      await page.customer.visit('/customer/add');
    });

    afterEach(async function () {
      await page.dispose();
    });

    const form = [
      {
        labelName: 'name',
        labelText: 'Name',
        inputName: 'name',
      },
      {
        labelName: 'address',
        labelText: 'Address',
        inputName: 'address',
      },
      {
        labelName: 'email',
        labelText: 'Email',
        inputName: 'email',
      },
      {
        labelName: 'phone',
        labelText: 'Phone',
        inputName: 'phone',
      },
    ];

    form.forEach(function (data) {
      it(`shows label '${data.labelText}'`, async function () {
        const labelName = await page.customer.formLabel(data.labelName);
        expect(labelName).equal(data.labelText);
      });

      it(`has input '${data.inputName}'`, async function () {
        const inputName = await page.customer.formInputTag(data.inputName);
        expect(inputName).to.be.exist;
      });
    });
  });

  context('Form validations', function () {
    beforeEach(async function () {
      const browser = await new Browser('firefox').build();
      page = new Pages(browser);
      await page.login.adminAuthenticate(config.username, config.password);
      await page.customer.visit('/customer/add');
    });

    afterEach(async function () {
      await page.quit();
    });

    const errorMessage = [
      'Please enter your name',
      'Please provide a address',
      'Please provide a email',
      'Please provide a phone number',
    ];

    it('requires name, address, email, and phone', async function () {
      const message = await page.customer.submitFormErrorMessage();
      message.forEach(async function (data, index) {
        const errorText = await page.customer.errorMessage(data);
        expect(errorText).equal(errorMessage[index]);
      });
    });

    it.skip('requires name to have minimum length', async function () {
      // todo
    });

    it.skip('requires name to have maximum length', async function () {
      // todo
    });

    it.skip('requires address to have minimum length', async function () {
      // todo
    });

    it.skip('requires valid email', async function () {
      // todo
    });

    it.skip('requires phone to have minimum length', async function () {
      // todo
    });

    it.skip('requires phone to have maximum length', async function () {
      // todo
    });
  });
});
