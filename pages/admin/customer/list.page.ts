import AdminPage from "@pages/admin";

export default class CustomerListPage extends AdminPage {
  static url = "/admin/customer";

  get addButton() {
    return this.getDataTest("button-add");
  }

  get deleteConfirmationModal() {
    return this.getDataTest("delete-modal");
  }

  get deleteConfirmationCancelButton() {
    return this.getDataTest("delete-cancel");
  }

  get deleteConfirmationConfirmButton() {
    return this.getDataTest("delete-confirm");
  }

  get tableSearch() {
    return this.getDataTest("table-search");
  }

  get deleteButtonContains() {
    return this.getDataTestContains("button-delete-table-row-");
  }

  tableHeaderName(column: number) {
    return this.getDataTest(`table-head-col-${column}`);
  }

  tableDataName(row: number, column: number) {
    return this.getDataTest(`table-row-${row}-col-${column}`);
  }

  editButton(row: number) {
    return this.getDataTest(`button-edit-table-row-${row}`);
  }

  deleteButton(row: number) {
    return this.getDataTest(`button-delete-table-row-${row}`);
  }
}
