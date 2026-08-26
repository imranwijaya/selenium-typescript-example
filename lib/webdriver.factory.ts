import { Builder, WebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import firefox from "selenium-webdriver/firefox";
import env from "@config/env";

export type BrowserName = "chrome" | "firefox";
export type BrowserMode = "headless" | "display";

export interface WebDriverFactoryOptions {
  name?: BrowserName;
  mode?: BrowserMode;
}

export class WebDriverFactory {
  constructor(private options: WebDriverFactoryOptions = {}) {}

  async build(): Promise<WebDriver> {
    const { name = env.browser.name, mode = env.browser.mode } = this.options;
    const builder = new Builder().forBrowser(name);

    if (name === "chrome") {
      const chromeOptions = new chrome.Options();

      if (mode === "headless") {
        chromeOptions.addArguments("--headless=new");
        chromeOptions.addArguments("--window-size=1920,1080");
      }

      builder.setChromeOptions(chromeOptions);
    }

    if (name === "firefox") {
      const firefoxOptions = new firefox.Options();

      if (mode === "headless") {
        firefoxOptions.addArguments("--headless");
        firefoxOptions.addArguments("--window-size=1920,1080");
      }

      builder.setFirefoxOptions(firefoxOptions);
    }

    return await builder.build();
  }
}
