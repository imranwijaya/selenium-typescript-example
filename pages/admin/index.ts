import { WebDriver } from 'selenium-webdriver';
import { CustomerPage } from './customer.page';
import { HomePage } from './home.page';
import { LoginPage } from './login.page';

export class Pages {
  public login: LoginPage;
  public home: HomePage;
  public customer: CustomerPage;

  constructor(public browser: WebDriver) {
    this.login = new LoginPage(browser);
    this.home = new HomePage(browser);
    this.customer = new CustomerPage(browser);
  }

  async dispose() {
    await this.cleanup();
    await this.close();
  }

  async quit() {
    if (this.browser != null) {
      await this.browser.quit();
    }
  }

  async cleanup() {
    await this.browser.manage().deleteAllCookies();
  }

  async close() {
    await this.browser.close();
  }
}
