import { afterEach, beforeEach, describe, it } from "mocha";
import { expect } from "chai";
import TestContext from "@lib/test.context";

describe("Logout", function () {
  const ctx = new TestContext();

  beforeEach(async function () {
    await ctx.start();
    await ctx.pages.auth.login();
    await ctx.pages.dashboard.open();
  });

  it("redirects to the login page after logout", async function () {
    await ctx.pages.dashboard.controlSidebarButton.click();

    const controlSidebar = await ctx.pages.dashboard.controlSidebar;
    expect(
      await ctx.pages.dashboard.waitUntilVisible(controlSidebar),
    ).to.be.equal(true);

    const logoutButton = ctx.pages.dashboard.logoutButton;
    await ctx.pages.dashboard.waitUntilInteractable(logoutButton);
    await logoutButton.click();
    await ctx.pages.dashboard.waitUntilHidden(logoutButton);

    expect(await ctx.pages.login.url()).to.include("/admin/auth/login");
  });

  it("prevents access to protected pages after logout", async function () {
    await ctx.pages.dashboard.controlSidebarButton.click();

    const controlSidebar = await ctx.pages.dashboard.controlSidebar;
    await ctx.pages.dashboard.waitUntilVisible(controlSidebar);

    const logoutButton = ctx.pages.dashboard.logoutButton;
    await ctx.pages.dashboard.waitUntilInteractable(logoutButton);
    await logoutButton.click();
    await ctx.pages.dashboard.waitUntilHidden(logoutButton);

    expect(await ctx.pages.login.url()).to.include("/admin/auth/login");

    await ctx.pages.dashboard.open();

    expect(await ctx.pages.login.url()).to.include("/admin/auth/login");
    expect(await ctx.pages.login.toast.getText()).to.be.equal(
      "You need to login",
    );
  });

  afterEach(async function () {
    await ctx.stop();
  });
});
