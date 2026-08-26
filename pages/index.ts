import { WebDriver } from "selenium-webdriver";

import Admin from "@pages/admin";
import Auth from "@pages/admin/auth";

import CustomerPage from "@pages/admin/customer";
import DashboardPage from "@pages/admin/dashboard.page";
import LoginPage from "@pages/admin/auth/login.page";

export default class Pages {
  readonly auth: Auth;
  readonly admin: Admin;

  readonly login: LoginPage;
  readonly dashboard: DashboardPage;
  readonly customer: CustomerPage;

  constructor(private driver: WebDriver) {
    this.auth = new Auth(this.driver);
    this.admin = new Admin(this.driver);

    this.login = new LoginPage(this.driver);
    this.dashboard = new DashboardPage(this.driver);
    this.customer = new CustomerPage(this.driver);
  }

  async quit() {
    if (this.driver != null) {
      await this.driver.quit();
    }
  }
}
