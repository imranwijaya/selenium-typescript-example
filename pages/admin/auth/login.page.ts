import BasePage from "@pages/base.page";
import env from "@config/env";

export default class LoginPage extends BasePage {
  static url = "/admin/auth/login";

  get loginButton() {
    return this.getDataTest("button-login");
  }

  get greetings() {
    return this.getDataTest("login-message");
  }

  label(id: string) {
    return this.getDataTest(`label-${id}`);
  }

  input(id: string) {
    return this.getDataTest(`input-${id}`);
  }

  errorMessage(id: string) {
    return this.getDataTest(`error-${id}`);
  }

  async hasError(id: string) {
    const elements = await this.getManyElement(`[data-test=error-${id}]`);
    return elements.length ? elements[0] : null;
  }

  async auth() {
    await this.open();
    await this.input("email").sendKeys(env.login.email);
    await this.input("password").sendKeys(env.login.password);
    await this.loginButton.click();
  }

  async _auth() {
    await this.open();
    const inputEmail = await this.input("email");
    const inputPassword = await this.input("password");
    await this.invokeValue(inputEmail, env.login.email);
    await this.invokeValue(inputPassword, env.login.password);
    await this.loginButton.click();
  }

  async _authViaApi() {}
}
