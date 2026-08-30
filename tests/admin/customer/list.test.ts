import { after, before, beforeEach, describe, it } from "mocha";
import { expect } from "chai";
import dayjs from "dayjs";
import TestContext from "@lib/test.context";
import customerRepository from "@repositories/customer.repository";

describe("Customer List", function () {
  const ctx = new TestContext();

  before(async function () {
    await ctx.start();
    await ctx.pages.auth.login();
  });

  context("Table", function () {
    beforeEach(async function () {
      await ctx.pages.customer.list.open();
    });

    it("displays the expected table headers", function () {
      const tableHeaders = [
        "No",
        "Name",
        "Address",
        "Phone",
        "Email",
        "Last Update",
        "Action",
      ];

      tableHeaders.forEach(async function (value, index) {
        expect(
          await ctx.pages.customer.list.tableHeaderName(index + 1).getText(),
        ).to.equal(value);
      });
    });

    it("displays the latest customer data", async function () {
      const customer = await customerRepository.findById(1);
      const expectedData = [
        customer.id,
        customer.name,
        customer.address,
        customer.phone,
        customer.email,
        dayjs(customer.updated_at).format("DD/MMM/YYYY HH:mm:ss"),
      ];

      expectedData.forEach(async function (value, index) {
        expect(
          await ctx.pages.customer.list.tableDataName(1, index + 1).getText(),
        ).to.be.equal(value);
      });
    });
  });

  context("Create Customer", function () {
    beforeEach(async function () {
      await ctx.pages.customer.list.open();
    });

    it("navigates to the create customer page when Create button is clicked", async function () {
      await ctx.pages.customer.list.addButton.click();

      expect(await ctx.pages.customer.create.url()).to.contain(
        "/admin/customer/create",
      );
      expect(await ctx.pages.customer.create.title()).to.be.equal(
        "Create Customer",
      );
    });
  });

  context("Update Customer", function () {
    beforeEach(async function () {
      await ctx.pages.customer.list.open();
    });

    it("navigates to the update customer page when Edit button is clicked", async function () {
      await ctx.pages.customer.list.editButton(1).click();

      expect(await ctx.pages.customer.update.url()).to.include(
        "/admin/customer/update",
      );
      expect(await ctx.pages.customer.update.title()).to.be.equal(
        "Update Customer",
      );
    });
  });

  context("Delete Customer", function () {
    beforeEach(async function () {
      await ctx.pages.customer.list.open();
    });

    it("displays the delete confirmation dialog", async function () {
      await ctx.pages.customer.list.deleteButton(2).click();

      expect(
        await ctx.pages.customer.list.deleteConfirmationModal.isDisplayed(),
      ).to.be.equal(true);
      expect(
        await ctx.pages.customer.list.deleteConfirmationConfirmButton.getText(),
      ).to.be.equal("Yes");
      expect(
        await ctx.pages.customer.list.deleteConfirmationCancelButton.getText(),
      ).to.be.equal("No");
    });

    it("closes the delete confirmation dialog when Cancel is clicked", async function () {
      await ctx.pages.customer.list.deleteButton(2).click();

      expect(
        await ctx.pages.customer.list.deleteConfirmationModal.isDisplayed(),
      ).to.be.equal(true);

      await ctx.pages.customer.list.deleteConfirmationCancelButton.click();
      const deleteConfirmationModal =
        await ctx.pages.customer.list.deleteConfirmationModal;

      expect(
        await ctx.pages.customer.list.waitUntilHidden(deleteConfirmationModal),
      ).to.be.equal(true);
    });

    it("deletes the customer and shows a success message", async function () {
      const customer = customerRepository.generateFakeData();
      const result = await customerRepository.create(customer);

      expect(result.affectedRows).to.be.equal(1);
      expect(result.insertId).to.be.greaterThan(1);

      await ctx.pages.customer.list.reload();

      const tableSearch = await ctx.pages.customer.list.tableSearch;
      await ctx.pages.customer.list.invokeValue(tableSearch, customer.email);
      await ctx.pages.customer.list.triggerKeyUp(tableSearch);
      const tableData =
        await ctx.pages.customer.list.getManyElement("#table tbody tr");

      expect(tableData).to.have.length(1);
      expect(await tableData[0].getText()).to.contain(customer.email);

      await ctx.pages.customer.list.deleteButtonContains.click();
      const deleteModal = await ctx.pages.customer.list.deleteConfirmationModal;

      expect(
        await ctx.pages.customer.list.waitUntilVisible(deleteModal),
      ).to.be.equal(true);

      await ctx.pages.customer.list.deleteConfirmationConfirmButton.click();
      await ctx.pages.customer.list.waitUntilStale(deleteModal);

      expect(await ctx.pages.customer.list.url()).to.contain("/admin/customer");
      expect(await ctx.pages.customer.list.toast.getText()).to.be.equal(
        "Data deleted",
      );

      const deletedCustomer = await customerRepository.findByEmails([
        customer.email,
      ]);

      expect(deletedCustomer).to.have.length(0);
    });
  });

  after(async function () {
    await ctx.stop();
  });
});
