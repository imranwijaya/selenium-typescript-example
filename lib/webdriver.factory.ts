import { Builder, WebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import firefox from "selenium-webdriver/firefox";
import type { BrowserMode, BrowserName } from "@lib/browser.types";
import type { TestMetadataInput } from "@lib/test.metadata";
import env from "@config/env";

export interface WebDriverFactoryOptions {
  name?: BrowserName;
  mode?: BrowserMode;
}

export class WebDriverFactory {
  private _metadata?: TestMetadataInput;

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

    const driver = await builder.build();
    const capabilities = await driver.getCapabilities();

    this._metadata = {
      browser: {
        name: capabilities.get("browserName") as BrowserName,
        version: capabilities.get("browserVersion") as string,
        mode,
      },
      platform: {
        name: capabilities.get("platformName") as string,
      },
    };

    return driver;
  }

  get metadata(): TestMetadataInput {
    if (!this._metadata) {
      throw new Error("WebDriverFactory has not built a WebDriver yet.");
    }

    return this._metadata;
  }
}
