# Selenium WebDriver Typescript using Page Object Models

This is an [e2e testing example](https://github.com/imranwijaya/selenium-typescript-example) for [this website](https://selenium.testing.abangkito.com/admin) using [`Selenium`](https://www.selenium.dev/).

## Getting Started

First, clone the [repository](https://github.com/imranwijaya/selenium-typescript-example) & install the dependencies:

```bash
#clone github repository
git clone https://github.com/imranwijaya/selenium-typescript-example.git

#after successful clone
npm run install
```

Run test with following command:
```bash
npm run test #run tests using browser specified in tests file
#or
npm run test:chrome #run tests using chrome headless browser
#or
npm run test:firefox #run tests using firefox headless browser
```

## Folder Structure

```
.
├── ...
|── config/index.ts             # Test config (baseUrl, username, password, etc)
├── lib/
│     ├── browser.ts            # Builds WebDriver object for tests
|── pages/                      # Page Object Models
|── reports/                    # Test Report for the tests executed
|── tests/                      # Test Suites and Test Cases
```

## Learn More

To learn more about Selenium, take a look at the following resources:
- [Selenium WebDriver documentation](https://www.selenium.dev/documentation/webdriver/)
- [Learn how it works](https://www.selenium.dev/documentation/webdriver/getting_started/)