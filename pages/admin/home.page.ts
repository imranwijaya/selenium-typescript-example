import { By, WebDriver } from 'selenium-webdriver';
import { BasePage } from '../base.page';

export class HomePage extends BasePage {
  constructor(readonly driver: WebDriver) {
    super(driver);
  }

  async unauthenticate() {
    await this.click(By.css('[data-test=navigation-control-sidebar]'));
    await this.driver.sleep(500);
    const controlSidebarVisible = await this.isVisible(
      By.css('[data-test=control-sidebar]'),
    );

    if (controlSidebarVisible) {
      await this.click(By.css('[data-test=button-logout]'));
      return await this.url();
    }

    return await this.url();
  }
}
