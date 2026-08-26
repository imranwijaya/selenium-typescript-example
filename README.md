# Selenium WebDriver TypeScript Example

Web automation testing example using [Selenium WebDriver](https://www.selenium.dev/) with TypeScript and the Page Object Model.

The test suite targets the [Project for Testing](https://project-for-testing.abangkito.com) demo application.

📊 [Example Report](https://imranwijaya.github.io/selenium-typescript-example/example/) · 🚀 [Test Report](https://imranwijaya.github.io/selenium-typescript-example/report/)

## Requirements

- Node.js 24+
- npm

## Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/imranwijaya/selenium-typescript-example.git
cd selenium-typescript-example
npm install
```

### Environment Configuration

Create a local `.env` file based on `.env.example`:

Copy the example environment file:

```bash
cp .env.example .env
```

Configure the required environment variables:

```env
BASE_URL="https://example.com"
BROWSER_NAME="chrome"
BROWSER_MODE="headless"
LOGIN_NAME="your-login-name"
LOGIN_EMAIL="your-email@example.com"
LOGIN_PASSWORD="your-password"

DB_HOST="127.0.0.1"
DB_NAME="your-database"
DB_USER="your-database-user"
DB_PASSWORD="your-database-password"
DB_PORT=3306
```

The environment configuration is loaded from `.env` and validated with Zod
before Mocha starts.

## Running Tests

Run the compiled JavaScript test suite:

```bash
npm run test
```

Run the TypeScript development test suite:

```bash
npm run dev
```

Run TypeScript type checking:

```bash
npm run typecheck
```

Build the project:

```bash
npm run build
```

## Browser Configuration

The browser is configured through `BROWSER_NAME`.

Currently supported browsers:

- Chrome
- Firefox

Chrome is the currently validated browser configuration.

## Test Reports

Mochawesome reports are generated under `reports/`. The reports can be viewed locally after test execution.

## GitHub Actions

Selenium E2E tests run automatically whenever code is pushed to `main`.

The CI workflow:

1. Checks out the repository.
2. Runs the Selenium E2E suite on an Ubuntu GitHub-hosted runner.
3. Sets up Node.js 24 and installs project dependencies with `npm ci`.
4. Configures the test environment from GitHub Actions Variables and Secrets.
5. Runs the E2E test suite using the configured browser.
6. Publishes test results to the GitHub Actions job summary.
7. Uploads the generated test reports as workflow artifacts.
8. Publishes the reports to GitHub Pages for pushes to `main`.

### GitHub Variables

The following configuration is stored as GitHub Actions Variables:

- `BASE_URL`
- `BROWSER_NAME`
- `BROWSER_MODE`
- `LOGIN_NAME`
- `LOGIN_EMAIL`
- `LOGIN_PASSWORD`

### GitHub Secrets

The following database configuration is stored as GitHub Actions Secrets:

- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`

Local development continues to use `.env`.

GitHub Actions provides the environment variables through GitHub Variables and Secrets, keeping environment-specific configuration outside the repository.

### Application CD Integration

The Selenium workflow can also be triggered by the Project for Testing Application CD workflow after a successful deployment.

The integration flow is:

```text
Application CI
    ↓
Application CD
    ↓
Deploy application
    ↓
Health / readiness validation
    ↓
repository_dispatch
    ↓
Selenium E2E
    ↓
Validate deployed application
```

This allows Selenium E2E tests to validate the deployed application after the deployment pipeline has completed successfully.

## GitHub Pages

Test reports from successful pushes to `main` are published to GitHub Pages.

📊 [Example Report](https://imranwijaya.github.io/selenium-typescript-example/example/)

🚀 [Test Report](https://imranwijaya.github.io/selenium-typescript-example/report/)

The published reports provide accessible test evidence without requiring access to the GitHub Actions workflow.

## Test Results and Evidence

Test execution provides multiple forms of evidence:

- GitHub Actions job summary
- Mochawesome HTML reports
- GitHub Actions workflow artifacts
- GitHub Pages published reports

## Project Structure

```text
.
├── .github/
│   └── workflows/
│       └── selenium.yml
├── config/
├── lib/
├── pages/
├── repositories/
├── tests/
├── reports/
├── .env.example
├── .mocharc.js
├── .mocharc.dev.js
├── package.json
├── tsconfig.json
└── README.md
```

## Page Object Model

The project uses the Page Object Model to separate test scenarios from browser interaction logic.

- `BasePage` — shared WebDriver functionality
- `Pages` — central Page Object facade
- `pages/admin/` — shared WebDriver functionality for authenticated admin

## Selenium WebDriver

The project uses [Selenium WebDriver](https://www.selenium.dev/documentation/webdriver/) for browser automation.

## License

This project is licensed under the [MIT License](LICENSE).
