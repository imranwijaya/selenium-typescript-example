import { after, before, beforeEach, describe, it } from "mocha";
import { expect } from "chai";
import { WebDriverFactory } from "@lib/webdriver.factory";
import Pages from "@pages/index";
import customerRepository from "@repositories/customer.repository";

const customerCreatePage = {
  id: "customer",
  title: "Create Customer",
  menu: "Customer",
  url: "/customer/create",
  headerText: "Create Customer",
  breadcrumbs: [
    { text: "Home", link: "/admin" },
    { text: "Customer", link: "/admin/customer" },
    { text: "Create", link: "" },
  ],
};

const fields = {
  name: {
    label: "Name",
    required: "Name required",
    minlength: "Name must consist of at least 3 character",
    maxlength: "Name only accept maximum 200 character",
  },
  address: {
    label: "Address",
    required: "Address required",
    minlength: "Address must consist of at least 3 character",
  },
  email: {
    label: "Email",
    required: "Email required",
    email: "Email must be a valid email address",
  },
  phone: {
    label: "Phone",
    required: "Phone Number required",
    number: "Phone Number must be valid number",
    minlength: "Phone Number must consist at least 9 numbers",
    maxlength: "Phone Number only accept maximum 14 numbers",
  },
};

describe("Create Customer", function () {
  let page: Pages;

  before(async function () {
    const driver = await new WebDriverFactory().build();
    page = new Pages(driver);

    await page.auth.login();
  });

  context("Basic page", function () {
    before(async function () {
      await page.customer.create.open();
    });

    it("shows document title", async function () {
      expect(await page.customer.create.title()).to.be.equal(
        customerCreatePage.title,
      );
    });

    it("shows header text", async function () {
      expect(await page.customer.create.contentHeader.getText()).to.be.equal(
        customerCreatePage.headerText,
      );
    });

    customerCreatePage.breadcrumbs.forEach(({ text, link }, index) => {
      const level = index + 1;

      it(`shows breadcrumb level ${level}`, async function () {
        const breadcrumb = await page.customer.create.breadcrumb(level);

        expect(await breadcrumb.getText()).to.be.equal(text);

        if (link) {
          expect(await breadcrumb.getAttribute("href")).to.contain(link);
        }
      });
    });

    it("has active class", async function () {
      expect(
        await page.customer.create
          .menuActiveClass(customerCreatePage.id)
          .getAttribute("class"),
      ).to.contain("active");
    });

    it(`shows menu text '${customerCreatePage.menu}'`, async function () {
      expect(
        await page.customer.create.menuText(customerCreatePage.id).getText(),
      ).to.be.equal(customerCreatePage.menu);
    });
  });

  context("Form", function () {
    beforeEach(async function () {
      await page.customer.create.open();
    });

    const mapped = Object.entries(fields).map(([name, field]) => ({
      name,
      label: field.label,
    }));

    mapped.forEach((field) => {
      it(`renders the ${field.label} field`, async function () {
        expect(
          await page.customer.create.label(field.name).getText(),
        ).to.be.equal(field.label);
        expect(
          await page.customer.create.input(field.name).isDisplayed(),
        ).to.be.equal(true);
      });
    });
  });

  context("Validation", function () {
    beforeEach(async function () {
      await page.customer.create.open();
    });

    it("shows required errors when submitted empty", async function () {
      await page.customer.create.submitButton.click();

      expect(
        await page.customer.create.errorMessage("name").getText(),
      ).to.be.equal(fields.name.required);
      expect(
        await page.customer.create.errorMessage("address").getText(),
      ).to.be.equal(fields.address.required);
      expect(
        await page.customer.create.errorMessage("email").getText(),
      ).to.be.equal(fields.email.required);
      expect(
        await page.customer.create.errorMessage("phone").getText(),
      ).to.be.equal(fields.phone.required);
    });

    it("shows an error when name is shorter than 3 characters", async function () {
      const input = await page.customer.create.input("name");
      await input.sendKeys("aa");
      await page.customer.create.blur(input);

      expect(
        await page.customer.create.errorMessage("name").getText(),
      ).to.contain(fields.name.minlength);
    });

    it("accepts a name with exactly 3 characters", async function () {
      const input = await page.customer.create.input("name");
      await input.sendKeys("abc");
      await page.customer.create.blur(input);

      expect(await page.customer.create.hasError("name")).to.not.exist;
    });

    it("accepts a name with exactly 200 characters", async function () {
      const name = "a".repeat(200);
      const input = await page.customer.create.input("name");
      await input.sendKeys(name);
      await page.customer.create.blur(input);

      expect(await input.getAttribute("value")).to.be.equal(name);
      expect(await page.customer.create.hasError("name")).to.not.exist;
    });

    it("shows an error when name exceeds 200 characters", async function () {
      const name = "a".repeat(201);
      const input = await page.customer.create.input("name");
      await input.sendKeys(name);
      await page.customer.create.blur(input);

      expect(
        await page.customer.create.errorMessage("name").getText(),
      ).to.contain(fields.name.maxlength);
    });

    it("shows an error when address is shorter than 3 characters", async function () {
      const input = await page.customer.create.input("address");
      await input.sendKeys("aa");
      await page.customer.create.blur(input);

      expect(
        await page.customer.create.errorMessage("address").getText(),
      ).to.be.exist.and.contain(fields.address.minlength);
    });

    it("accepts an address with exactly 3 characters", async function () {
      const input = await page.customer.create.input("address");
      await input.sendKeys("abc");
      await page.customer.create.blur(input);

      expect(await page.customer.create.hasError("address")).to.not.exist;
    });

    it("shows an error for an invalid email", async function () {
      const input = await page.customer.create.input("email");
      await input.sendKeys("this.email@");
      await page.customer.create.blur(input);

      expect(
        await page.customer.create.errorMessage("email").getText(),
      ).to.contain(fields.email.email);
    });

    it("shows an error when phone is shorter than 9 digits", async function () {
      const input = await page.customer.create.input("phone");
      await input.sendKeys("12345678");
      await page.customer.create.blur(input);

      expect(
        await page.customer.create.errorMessage("phone").getText(),
      ).to.contain(fields.phone.minlength);
    });

    it("accepts a phone number with exactly 9 digits", async function () {
      const input = await page.customer.create.input("phone");
      await input.sendKeys("123456789");
      await page.customer.create.blur(input);

      expect(await page.customer.create.hasError("phone")).to.not.exist;
    });

    it("accepts a phone number with exactly 14 digits", async function () {
      const input = await page.customer.create.input("phone");
      await input.sendKeys("12345678901234");
      await page.customer.create.blur(input);

      expect(await page.customer.create.hasError("phone")).to.not.exist;
    });

    it("shows an error when phone exceeds 14 digits", async function () {
      const input = await page.customer.create.input("phone");
      await input.sendKeys("123456789012345");
      await page.customer.create.blur(input);

      expect(
        await page.customer.create.errorMessage("phone").getText(),
      ).to.contain(fields.phone.maxlength);
    });
  });

  context("Successful creation", async function () {
    it("creates a customer with valid data", async function () {
      const customer = customerRepository.generateFakeData();

      await page.customer.create.input("name").sendKeys(customer.name);
      await page.customer.create.input("address").sendKeys(customer.address);
      await page.customer.create.input("email").sendKeys(customer.email);
      await page.customer.create.input("phone").sendKeys(customer.phone);
      await page.customer.create.submitButton.click();

      expect(await page.customer.list.url()).to.contain("/admin/customer");
      expect(await page.customer.list.title()).to.equal("Customer");
      expect(await page.customer.list.toast.getText()).to.equal("Data created");

      const tableSearch = await page.customer.list.tableSearch;
      await page.customer.list.invokeValue(tableSearch, customer.email);
      await page.customer.list.triggerKeyUp(tableSearch);
      const tableData =
        await page.customer.list.getManyElement("#table tbody tr");

      expect(await tableData[0].getText()).to.contain(customer.email);

      const customers = await customerRepository.findByEmails([customer.email]);

      expect(customers).to.have.length(1);

      const result = await customerRepository.removeByEmail(customer.email);

      expect(result.affectedRows).to.equal(1);
    });
  });

  after(async function () {
    await page.quit();
  });
});
