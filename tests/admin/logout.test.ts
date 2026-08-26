import { afterEach, beforeEach, describe, it } from "mocha";
import { expect } from "chai";
import { WebDriverFactory } from "@lib/webdriver.factory";
import Pages from "@pages/index";

describe("Logout", function () {
  let page: Pages;

  beforeEach(async function () {
    const driver = await new WebDriverFactory().build();
    page = new Pages(driver);

    await page.auth.login();
    await page.dashboard.open();
  });

  it("redirects to the login page after logout", async function () {
    await page.dashboard.controlSidebarButton.click();

    const controlSidebar = await page.dashboard.controlSidebar;
    expect(await page.dashboard.waitUntilVisible(controlSidebar)).to.be.equal(
      true,
    );

    const logoutButton = page.dashboard.logoutButton;
    await page.dashboard.waitUntilInteractable(logoutButton);
    await logoutButton.click();
    await page.dashboard.waitUntilHidden(logoutButton);

    expect(await page.login.url()).to.include("/admin/auth/login");
  });

  it("prevents access to protected pages after logout", async function () {
    await page.dashboard.controlSidebarButton.click();

    const controlSidebar = await page.dashboard.controlSidebar;
    await page.dashboard.waitUntilVisible(controlSidebar);

    const logoutButton = page.dashboard.logoutButton;
    await page.dashboard.waitUntilInteractable(logoutButton);
    await logoutButton.click();
    await page.dashboard.waitUntilHidden(logoutButton);

    expect(await page.login.url()).to.include("/admin/auth/login");

    await page.dashboard.open();

    expect(await page.login.url()).to.include("/admin/auth/login");
    expect(await page.login.toast.getText()).to.be.equal("You need to login");
  });

  afterEach(async function () {
    await page.quit();
  });
});
