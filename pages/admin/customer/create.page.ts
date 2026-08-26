import AdminPage from "@pages/admin";

export default class CustomerCreatePage extends AdminPage {
  static url = "/admin/customer/create";

  get submitButton() {
    return this.getDataTest("button-submit");
  }

  get backButton() {
    return this.getDataTest("button-back");
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
}
