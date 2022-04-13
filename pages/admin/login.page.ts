import { By, WebDriver } from 'selenium-webdriver';
import { BasePage } from '../base.page';

export class LoginPage extends BasePage {
  constructor(readonly driver: WebDriver) {
    super(driver);
  }

  async adminAuthenticate(username: string, password: string) {
    await this.visit('/login');
    await this.type(By.css('[data-test=input-email]'), username);
    await this.type(By.css('[data-test=input-password]'), password);
    await this.click(By.css('[data-test=button-login]'));
  }

  async authenticate(username: string, password: string) {
    await this.type(By.css('[data-test=input-email]'), username);
    await this.type(By.css('[data-test=input-password]'), password);
    await this.click(By.css('[data-test=button-login]'));
  }

  async successMessagePresent() {
    return await this.text(By.css('[id=swal2-title] > b'));
  }

  async failureMessagePresent() {
    return await this.text(By.css('[data-test=alert-text]'));
  }

  async greet() {
    return await this.text(By.css('[data-test=login-greetings]'));
  }
}
