import { Page } from '@playwright/test';

export class BasePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Launch the application
  async launchSite(url: string) {
    await this.page.goto(url);
    await this.page.waitForLoadState('load');
  }

  // Login to the application
  async login(email: string, password: string) {
    await this.page.locator("#userEmail").click();
    await this.page.locator("#userEmail").fill(email);
    await this.page.locator("#userPassword").click();
    await this.page.locator("#userPassword").fill(password);
    await this.page.locator("input[value='Login']").click();
    await this.page.waitForLoadState('load');
  }

  // Extract Order ID from label and clean it (remove pipes and spaces)
  async getOrderID(): Promise<string | null> {
    const rawOrderID = await this.page.locator("label.ng-star-inserted").textContent();
    return rawOrderID?.replace(/\s*\|\s*/g, '').trim() || null;
  }

  // Sign out from application
  async signOut() {
    await this.page.getByRole('button', { name: 'Sign Out' }).click();
  }
}
