import BasePage from "@pages/base.page";

export default class Admin extends BasePage {
  get contentHeader() {
    return this.getDataTest("content-header");
  }

  get controlSidebarButton() {
    return this.getDataTest("navigation-control-sidebar");
  }

  get controlSidebar() {
    return this.getDataTest("control-sidebar");
  }

  get logoutButton() {
    return this.getDataTest("button-logout");
  }

  menuActiveClass(id: string) {
    return this.getDataTest(`menu-${id}-link`);
  }

  menuText(id: string) {
    return this.getDataTest(`menu-${id}-text`);
  }

  breadcrumb(level: number) {
    return this.getDataTest(`breadcrumb-${level}`);
  }

  breadcrumbText(level: number) {
    return this.getDataTest(`breadcrumb-${level}`);
  }

  breadcrumbLink(level: number) {
    return this.getDataTest(`breadcrumb-${level}`);
  }
}
