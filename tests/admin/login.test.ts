import { afterEach, beforeEach, describe, it } from "mocha";
import { expect } from "chai";
import TestContext from "@lib/test.context";
import env from "@config/env";

describe("Login", function () {
  const ctx = new TestContext();

  beforeEach(async function () {
    await ctx.start();
    await ctx.pages.login.open();
  });

  it("displays the login page", async function () {
    expect(await ctx.pages.login.title()).to.be.equal("Login Admin");
    expect(await ctx.pages.login.greetings.getText()).to.be.equal(
      "Login to start your session",
    );
  });

  it("shows required validation errors when submitting an empty form", async function () {
    await ctx.pages.login.loginButton.click();

    expect(await ctx.pages.login.errorMessage("email").getText()).to.be.equal(
      "Email required",
    );
    expect(
      await ctx.pages.login.errorMessage("password").getText(),
    ).to.be.equal("Password required");
  });

  it("shows an error when email format is invalid", async function () {
    await ctx.pages.login.input("email").sendKeys("invalid-email");
    await ctx.pages.login.input("password").sendKeys("some-password");
    await ctx.pages.login.loginButton.click();

    expect(await ctx.pages.login.errorMessage("email").getText()).to.be.equal(
      "Email must be a valid email address",
    );
  });

  it("logs in successfully with valid credentials", async function () {
    const sessionBeforeLogin = await ctx.pages.login.getCookie(
      "BACKENDSESSIONID_PFT",
    );
    await ctx.pages.login.input("email").sendKeys(env.login.email);
    await ctx.pages.login.input("password").sendKeys(env.login.password);
    await ctx.pages.login.loginButton.click();

    expect(await ctx.pages.dashboard.url()).to.contain("/admin");
    expect(await ctx.pages.dashboard.title()).to.be.equal("Dashboard");
    expect(await ctx.pages.dashboard.toast.getText()).to.be.equal(
      `Welcome ${env.login.name}`,
    );

    const sessionAfterLogin = await ctx.pages.dashboard.getCookie(
      "BACKENDSESSIONID_PFT",
    );

    expect(sessionBeforeLogin).to.exist;
    expect(sessionAfterLogin).to.exist;
    expect(sessionAfterLogin?.value).to.not.equal(sessionBeforeLogin?.value);
  });

  afterEach(async function () {
    await ctx.stop();
  });
});
