import { Builder } from 'selenium-webdriver';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome';
import { Options as FirefoxOptions } from 'selenium-webdriver/firefox';

type IBrowserName = 'chrome' | 'firefox';
type IBrowserMode = 'headless' | 'display';
enum BrowserName {
  CHROME = 'chrome',
  FIREFOX = 'firefox',
}
enum BrowserMode {
  HEADLESS = 'headless',
  MAXIMIZED = 'display',
}

export class Browser {
  constructor(readonly browserName: IBrowserName) {}

  async build() {
    const BROWSER_ENV = process.env.BROWSER_ENV;
    const BROWSER_NAME = process.env.BROWSER_NAME;
    const BROWSER_MODE = BrowserMode.HEADLESS;

    if (BROWSER_ENV === 'true') {
      if (BROWSER_NAME === BrowserName.CHROME) {
        const chromeOptions = this.setChromeOptions(BROWSER_MODE);
        return await new Builder()
          .forBrowser(BROWSER_NAME)
          .setChromeOptions(chromeOptions)
          .build();
      } else if (BROWSER_NAME === BrowserName.FIREFOX) {
        const firefoxOptions = this.setFirefoxOptions(BROWSER_MODE);
        return await new Builder()
          .forBrowser(BROWSER_NAME)
          .setFirefoxOptions(firefoxOptions)
          .build();
      } else {
        const chromeOptions = this.setChromeOptions(BROWSER_MODE);
        return await new Builder()
          .forBrowser(this.browserName)
          .setChromeOptions(chromeOptions)
          .build();
      }
    }

    const chromeOptions = this.setChromeOptions(BROWSER_MODE);
    const firefoxOptions = this.setFirefoxOptions(BROWSER_MODE);
    return await new Builder()
      .forBrowser(this.browserName)
      .setChromeOptions(chromeOptions)
      .setFirefoxOptions(firefoxOptions)
      .build();
  }

  async buildRemote() {
    // const BROWSER_ENV = process.env.BROWSER_ENV;
    // const BROWSER_NAME = process.env.BROWSER_NAME;
    const BROWSER_MODE = BrowserMode.HEADLESS;

    const chromeOptions = this.setChromeOptions(BROWSER_MODE);
    const firefoxOptions = this.setFirefoxOptions(BROWSER_MODE);
    return await new Builder()
      .forBrowser(this.browserName)
      .setChromeOptions(chromeOptions)
      .setFirefoxOptions(firefoxOptions)
      .build();
  }

  setChromeOptions(mode: IBrowserMode) {
    if (mode === BrowserMode.HEADLESS) {
      const options = new ChromeOptions();
      options.addArguments(BrowserMode.HEADLESS);
      options.addArguments('window-size=1280,720');
      options.excludeSwitches('enable-logging');
      options.addArguments('disable-plugins');
      return options;
    } else {
      const options = new ChromeOptions();
      options.addArguments('start-maximized');
      options.excludeSwitches('enable-logging');
      options.addArguments('disable-plugins');
      return options;
    }
  }

  setFirefoxOptions(mode: IBrowserMode) {
    if (mode === BrowserMode.HEADLESS) {
      const options = new FirefoxOptions();
      options.headless();
      options.windowSize({ width: 1325, height: 744 });
      return options;
    } else {
      const options = new FirefoxOptions();
      return options;
    }
  }
}
