import { WebDriver } from "selenium-webdriver";

import Auth from "@pages/admin/auth";

import CustomerPage from "@pages/admin/customer";
import DashboardPage from "@pages/admin/dashboard.page";
import LoginPage from "@pages/admin/auth/login.page";

export default class Pages {
  readonly auth: Auth;

  readonly login: LoginPage;
  readonly dashboard: DashboardPage;
  readonly customer: CustomerPage;

  constructor(private driver: WebDriver) {
    this.auth = new Auth(this.driver);

    this.login = new LoginPage(this.driver);
    this.dashboard = new DashboardPage(this.driver);
    this.customer = new CustomerPage(this.driver);
  }
}
