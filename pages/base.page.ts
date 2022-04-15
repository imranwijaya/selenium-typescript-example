import { Locator, WebDriver } from 'selenium-webdriver';
import { elementLocated } from 'selenium-webdriver/lib/until';
import { config } from '../config/index';

export class BasePage {
  public driver: WebDriver;

  constructor(private readonly webDriver: WebDriver) {
    this.driver = this.webDriver;
  }

  waitUntilElementLocated(locator: Locator) {
    const untilElementLocated = elementLocated(locator);
    return this.driver.wait(untilElementLocated, 30000);
  }

  async browserName() {
    const capabilities = await this.driver.getCapabilities();
    return capabilities.getBrowserName();
  }

  /**Visit the given url
  @param url The URL to visit. If relative uses baseUrl (defined in rootDirectory/config/index.ts)
  @example
   this.visit('http://localhost:3000')
   this.visit('/somewhere') // opens ${baseUrl}/somewhere
  */
  async visit(url: string) {
    if (!url.startsWith('/')) {
      return this.driver.navigate().to(url);
    }
    const baseUrl = config.baseUrl;
    return this.driver.navigate().to(`${baseUrl}${url}`);
  }

  async title() {
    return await this.driver.getTitle();
  }

  find(locator: Locator) {
    // this.waitUntilElementLocated(locator);
    return this.driver.findElement(locator);
  }

  async finds(locator: Locator) {
    return await this.driver.findElements(locator);
  }

  async type(
    locator: Locator,
    inputText: string | number | Promise<string | number>,
  ) {
    return await this.find(locator).sendKeys(inputText);
  }

  async click(locator: Locator) {
    return await this.find(locator).click();
  }

  async isVisible(locator: Locator) {
    return await this.find(locator).isDisplayed();
  }

  async text(locator: Locator) {
    return await this.find(locator).getText();
  }

  async class(locator: Locator) {
    return await this.find(locator).getAttribute('class');
  }

  async url() {
    return await this.driver.getCurrentUrl();
  }

  async attribute(locator: Locator, attribute: string) {
    return await this.find(locator).getAttribute(attribute);
  }

  async tag(locator: Locator) {
    return await this.find(locator).getTagName();
  }
}
