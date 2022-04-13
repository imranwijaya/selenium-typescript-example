import { By, WebDriver } from 'selenium-webdriver';
import { BasePage } from '../base.page';

export class HomePage extends BasePage {
  constructor(readonly driver: WebDriver) {
    super(driver);
  }

  async unauthenticate() {
    await this.click(By.css('[data-test=navigation-control-sidebar]'));
    const buttonLogoutVisible = await this.isVisible(
      By.css('[data-test=button-logout]'),
    );

    if (buttonLogoutVisible) {
      await this.click(By.css('[data-test=button-logout]'));
      return await this.url();
    }

    return await this.url();
  }
}
