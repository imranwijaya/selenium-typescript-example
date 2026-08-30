import type { WebDriver } from "selenium-webdriver";
import LoginPage from "@pages/admin/auth/login.page";

export default class Auth {
  private readonly loginPage: LoginPage;

  constructor(private driver: WebDriver) {
    this.loginPage = new LoginPage(this.driver);
  }

  async login() {
    await this.loginPage._auth();
  }

  async loginViaApi() {
    await this.loginPage._authViaApi();
  }
}
