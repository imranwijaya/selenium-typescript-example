import { afterEach, beforeEach, describe, it } from "mocha";
import { expect } from "chai";
import { WebDriverFactory } from "@lib/webdriver.factory";
import Pages from "@pages/index";
import env from "@config/env";

describe("Login", function () {
  let page: Pages;

  beforeEach(async function () {
    const driver = await new WebDriverFactory().build();
    page = new Pages(driver);

    await page.login.open();
  });

  it("displays the login page", async function () {
    expect(await page.login.title()).to.be.equal("Login Admin");
    expect(await page.login.greetings.getText()).to.be.equal(
      "Login to start your session",
    );
  });

  it("shows required validation errors when submitting an empty form", async function () {
    await page.login.loginButton.click();

    expect(await page.login.errorMessage("email").getText()).to.be.equal(
      "Email required",
    );
    expect(await page.login.errorMessage("password").getText()).to.be.equal(
      "Password required",
    );
  });

  it("shows an error when email format is invalid", async function () {
    await page.login.input("email").sendKeys("invalid-email");
    await page.login.input("password").sendKeys("some-password");
    await page.login.loginButton.click();

    expect(await page.login.errorMessage("email").getText()).to.be.equal(
      "Email must be a valid email address",
    );
  });

  it("logs in successfully with valid credentials", async function () {
    const sessionBeforeLogin = await page.login.getCookie(
      "BACKENDSESSIONID_PFT",
    );
    await page.login.input("email").sendKeys(env.login.email);
    await page.login.input("password").sendKeys(env.login.password);
    await page.login.loginButton.click();

    expect(await page.dashboard.url()).to.contain("/admin");
    expect(await page.dashboard.title()).to.be.equal("Dashboard");
    expect(await page.dashboard.toast.getText()).to.be.equal(
      `Welcome ${env.login.name}`,
    );

    const sessionAfterLogin = await page.dashboard.getCookie(
      "BACKENDSESSIONID_PFT",
    );

    expect(sessionBeforeLogin).to.exist;
    expect(sessionAfterLogin).to.exist;
    expect(sessionAfterLogin?.value).to.not.equal(sessionBeforeLogin?.value);
  });

  afterEach(async function () {
    await page.quit();
  });
});
