import { By, WebDriver, WebElement } from 'selenium-webdriver';
import { BasePage } from '../base.page';

export class CustomerPage extends BasePage {
  constructor(readonly driver: WebDriver) {
    super(driver);
  }

  // General
  async headerName() {
    return await this.text(By.css('[data-test=content-header]'));
  }

  async activeClass() {
    return await this.attribute(
      By.css('[data-test=menu-customer-link]'),
      'class',
    );
  }

  async menuText() {
    // this will fail in headless browser
    // set window size to 1325x744
    return await this.text(By.css('[data-test=menu-customer-text]'));
  }

  async breadcrumbText(level: number) {
    return await this.text(By.css(`[data-test=breadcrumb-${level}]`));
  }

  async breadcrumbLink(level: number) {
    return await this.attribute(
      By.css(`[data-test=breadcrumb-${level}]`),
      'href',
    );
  }

  // Form
  async formLabel(labelName: string) {
    return await this.text(By.css(`[data-test=label-${labelName}]`));
  }

  async submitFormErrorMessage() {
    await this.click(By.css('[data-test=button-submit]'));
    return await this.finds(By.className('invalid-feedback'));
  }

  async errorMessage(webElement: WebElement) {
    return await webElement.getText();
  }

  async formInputTag(inputName: string) {
    return await this.tag(By.css(`[data-test=input-${inputName}]`));
  }

  // Customer List
  async tableHeaderName(columnIndex: number) {
    return await this.text(
      By.css(`[data-test=data-head-row-col-${columnIndex}]`),
    );
  }

  async tableDataName(rowIndex: number, columnIndex: number) {
    return await this.text(
      By.css(`[data-test=data-row-${rowIndex}-col-${columnIndex}]`),
    );
  }

  async addButton() {
    await this.click(By.css(`[data-test=button-add]`));
  }

  async editButton(rowIndex: number) {
    await this.click(By.css(`[data-test=button-edit-row-${rowIndex}]`));
  }

  async deleteButton(rowIndex: number) {
    await this.click(By.css(`[data-test=button-delete-row-${rowIndex}]`));
    return await this.find(By.css('[aria-labelledby=swal2-title]'));
  }

  async deleteConfirmationActionNo(rowIndex: number) {
    await this.click(By.css(`[data-test=button-delete-row-${rowIndex}]`));
    const popup = await this.find(By.css('[aria-labelledby=swal2-title]'));
    const actions = await popup.findElement(By.css('[class=swal2-actions]'));
    const confirm = await actions.findElement(
      By.css('[class="swal2-cancel swal2-styled"]'),
    );
    return await confirm.getText();
  }

  async deleteConfirmationActionYes(rowIndex: number) {
    await this.click(By.css(`[data-test=button-delete-row-${rowIndex}]`));
    const popup = await this.find(By.css('[aria-labelledby=swal2-title]'));
    const actions = await popup.findElement(By.css('[class=swal2-actions]'));
    const cancel = await actions.findElement(
      By.css('[class="swal2-confirm swal2-styled"]'),
    );
    return await cancel.getText();
  }
}
