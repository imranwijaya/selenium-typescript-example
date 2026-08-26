import type { Locator, WebDriver, WebElement } from "selenium-webdriver";
import { until } from "selenium-webdriver";
import { elementLocated } from "selenium-webdriver/lib/until";
import env from "@config/env";

export default abstract class BasePage {
  static url: string;
  private readonly driver: WebDriver;

  constructor(private readonly webDriver: WebDriver) {
    this.driver = this.webDriver;
  }

  get toast() {
    return this.getDataTest("toast-title");
  }

  async click(locator: Locator) {
    await this.find(locator).click();
  }

  async type(
    locator: Locator,
    inputText: string | number | Promise<string | number>,
  ) {
    await this.find(locator).sendKeys(inputText);
  }

  async text(locator: Locator) {
    return await this.find(locator).getText();
  }

  async class(locator: Locator) {
    return await this.find(locator).getAttribute("class");
  }

  async attribute(locator: Locator, attribute: string) {
    return await this.find(locator).getAttribute(attribute);
  }

  async isVisible(locator: Locator) {
    return await this.find(locator).isDisplayed();
  }

  async tag(locator: Locator) {
    return await this.find(locator).getTagName();
  }

  async getBrowserName() {
    const capabilities = await this.driver.getCapabilities();
    return capabilities.getBrowserName();
  }

  getCapabilities() {
    return this.driver.getCapabilities();
  }

  getCookie(name: string) {
    return this.driver.manage().getCookie(name);
  }

  title() {
    return this.driver.getTitle();
  }

  url() {
    return this.driver.getCurrentUrl();
  }

  reload() {
    return this.driver.navigate().refresh();
  }

  getOneElement(locator: string) {
    return this.driver.findElement({ css: locator });
  }

  getManyElement(locator: string) {
    return this.driver.findElements({ css: locator });
  }

  getDataTest(locator: string) {
    return this.driver.findElement({ css: `[data-test=${locator}]` });
  }

  getDataTestContains(locator: string) {
    return this.driver.findElement({ css: `[data-test*=${locator}]` });
  }

  getDataTestStartsWith(locator: string) {
    return this.driver.findElement({ css: `[data-test^=${locator}]` });
  }

  getDataTestEndsWith(locator: string) {
    return this.driver.findElement({ css: `[data-test$=${locator}]` });
  }

  async invokeValue(locator: WebElement, value: string) {
    await this.driver.executeScript(
      "arguments[0].value = arguments[1]",
      locator,
      value,
    );
  }

  async triggerKeyUp(locator: WebElement) {
    await this.driver.executeScript(
      `arguments[0].dispatchEvent(new KeyboardEvent("keyup", {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        which: 13,
        bubbles: true
      }))`,
      locator,
    );
  }

  async blur(locator: WebElement) {
    await this.driver.executeScript("arguments[0].blur();", locator);
  }

  waitUntilLocated(locator: Locator) {
    const untilElementLocated = until.elementLocated(locator);
    return this.driver.wait(untilElementLocated, 30000);
  }

  async waitUntilVisible(element: WebElement, timeout = 5000) {
    return await this.driver.wait(async () => {
      try {
        return await element.isDisplayed();
      } catch {
        return false;
      }
    }, timeout);
  }

  async waitUntilHidden(element: WebElement, timeout = 5000) {
    return await this.driver.wait(async () => {
      try {
        return !(await element.isDisplayed());
      } catch {
        return true;
      }
    }, timeout);
  }

  async waitUntilEnabled(element: WebElement, timeout = 5000) {
    return await this.driver.wait(async () => {
      try {
        return await element.isEnabled();
      } catch {
        return false;
      }
    }, timeout);
  }

  async waitUntilInteractable(element: WebElement, timeout = 5000) {
    return await this.driver.wait(async () => {
      try {
        return (await element.isDisplayed()) && (await element.isEnabled());
      } catch {
        return false;
      }
    }, timeout);
  }

  /**
   * Opens the page URL, optionally appending a path parameter.
   *
   * @param {string} [param] - Optional path parameter to append to the static URL.
   *                           The parameter is URL-encoded before being appended.
   * @example await page.customer.update.open(); // Opens: http://localhost:3000/admin/customer/update
   * @example await page.customer.update.open("123"); // Opens: http://localhost:3000/admin/customers/update/123
   */
  async open(param?: string) {
    const baseUrl = env.app.baseUrl;
    let url = (this.constructor as typeof BasePage).url;

    if (param) {
      url = `${url}/${encodeURIComponent(param)}`;
    }

    await this.driver.get(baseUrl + url);
  }

  /**
   * Visit the given url
   * @param url The URL to visit. If relative uses `baseUrl` (defined in `.env`)
   * @example
   *    this.visit("http://localhost:3000")
   *    this.visit("/somewhere") // navigates to "${baseUrl}/somewhere"
   *    this.visit("admin/auth/login") // navigates to "${baseUrl}/admin/auth/login"
   */
  async visit(url: string) {
    if (!url.startsWith("/")) {
      return await this.driver.navigate().to(url);
    }

    const baseUrl = env.app.baseUrl;
    await this.driver.navigate().to(baseUrl + url);
  }

  async quit() {
    if (this.driver != null) {
      this.driver.quit();
    }
  }

  private find(locator: Locator) {
    return this.driver.findElement(locator);
  }

  private finds(locator: Locator) {
    return this.driver.findElements(locator);
  }
}
