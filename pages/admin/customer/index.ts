import type { WebDriver } from "selenium-webdriver";
import CustomerListPage from "@pages/admin/customer/list.page";
import CustomerCreatePage from "@pages/admin/customer/create.page";
import CustomerUpdatePage from "@pages/admin/customer/update.page";

export default class Customer {
  readonly list: CustomerListPage;
  readonly create: CustomerCreatePage;
  readonly update: CustomerUpdatePage;

  constructor(private driver: WebDriver) {
    this.list = new CustomerListPage(this.driver);
    this.create = new CustomerCreatePage(this.driver);
    this.update = new CustomerUpdatePage(this.driver);
  }
}
