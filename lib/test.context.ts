import { WebDriver } from "selenium-webdriver";

import Pages from "@pages/index";
import {
  WebDriverFactory,
  type WebDriverFactoryOptions,
} from "@lib/webdriver.factory";
import { createTestMetadata, type TestMetadata } from "@lib/test.metadata";

export default class TestContext {
  private _driver?: WebDriver;
  private _pages?: Pages;
  private _metadata?: TestMetadata;

  constructor(private readonly options: WebDriverFactoryOptions = {}) {}

  async start(): Promise<void> {
    if (this._driver) {
      throw new Error("TestContext has already been started.");
    }

    const factory = new WebDriverFactory(this.options);
    this._driver = await factory.build();
    this._metadata = createTestMetadata(factory.metadata);
    this._pages = new Pages(this._driver);
  }

  get driver(): WebDriver {
    if (!this._driver) {
      throw new Error("TestContext has not been started. Call start() first.");
    }

    return this._driver;
  }

  get pages(): Pages {
    if (!this._pages) {
      throw new Error("TestContext has not been started. Call start() first.");
    }

    return this._pages;
  }

  get metadata(): TestMetadata {
    if (!this._metadata) {
      throw new Error("TestContext has not been started. Call start() first.");
    }

    return this._metadata;
  }

  async stop(): Promise<void> {
    if (!this._driver) {
      return;
    }

    try {
      await this._driver.quit();
    } finally {
      this._driver = undefined;
      this._pages = undefined;
      this._metadata = undefined;
    }
  }
}
