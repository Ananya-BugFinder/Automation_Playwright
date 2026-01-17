import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage.page';

export class ShoppingPage extends BasePage {
  page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  // Add product to cart
  async addProductToCart(productName: string) {
    const product = this.page.locator('.card-body', {
      has: this.page.locator('b', { hasText: productName })
    });
    await product.locator('text=Add to Cart').click();
  }

  // Verify success toast message
  async verifyProductAddedToast() {
    await expect(this.page.locator('div').filter({ hasText: 'Product Added To Cart' }).nth(2)).toBeVisible();
  }

  // Navigate to cart
  async goToCart() {
    await this.page.locator(".btn.btn-custom[routerlink='/dashboard/cart']").click();
  }

  // Get cart product text
  async getCartProductName(): Promise<string | null> {
    return await this.page.locator(".cartSection h3").textContent();
  }

  // Verify cart product
  async verifyCartProduct(expectedProductName: string) {
    const cartProduct = await this.getCartProductName();
    expect(cartProduct).toBe(expectedProductName);
  }

  // Click checkout button
  async proceedToCheckout() {
    await this.page.locator("li[class='totalRow'] button[type='button']").click();
  }

  // Fill card details
  async fillCardDetails(cvv: string, cardholderName: string) {
    await this.page.getByRole('textbox').nth(1).click();
    await this.page.getByRole('textbox').nth(1).fill(cvv);
    await this.page.getByRole('textbox').nth(2).click();
    await this.page.getByRole('textbox').nth(2).fill(cardholderName);
  }

  // Apply coupon
  async applyCoupon(couponCode: string) {
    await this.page.locator('input[name="coupon"]').click();
    await this.page.locator('input[name="coupon"]').fill(couponCode);
    await this.page.getByRole('button', { name: 'Apply Coupon' }).click();
  }

  // Verify coupon applied
  async verifyCouponApplied() {
    await expect(this.page.getByText('* Coupon Applied')).toBeVisible();
  }

  // Select country
  async selectCountry(countryName: string) {
    const dropdown = this.page.locator("input[placeholder='Select Country']");
    await dropdown.click();
    await dropdown.pressSequentially(countryName);
    await this.page.locator("section.ta-results").waitFor();
    await this.page.locator(`//span[normalize-space()='${countryName}']`).click();
  }

  // Place order
  async placeOrder() {
    await this.page.getByText('Place Order').click();
    await this.page.waitForLoadState('load');
  }

  // Verify order confirmation
  async verifyOrderConfirmation(expectedProductName: string) {
    await this.page.getByRole('heading', { name: 'Thankyou for the order.' }).click();
    await expect(this.page.locator("td[class='line-item product-info-column m-3'] div[class='title']")).toContainText(expectedProductName);
  }

  // Navigate to orders page
  async goToOrdersPage() {
    await this.page.locator("button[routerlink='/dashboard/myorders']").click();
    await this.page.waitForLoadState('load');
  }

  // Find and verify order in table
  async findOrderInTable(orderID: string | null): Promise<boolean> {
    const orders = this.page.locator("tbody tr");
    const orderCount = await orders.count();

    for (let i = 0; i < orderCount; i++) {
      const orderRow = orders.nth(i);
      const orderRowID = await orderRow.locator("th").textContent();
      if (orderRowID?.trim() === orderID?.trim()) {
        console.log(`Order ID matched: ${orderRowID}`);
        return true;
      }
    }
    return false;
  }

  // Find order and delete
  async deleteOrderFromTable(orderID: string | null): Promise<void> {
    const orders = this.page.locator("tbody tr");
    const orderCount = await orders.count();

    for (let i = 0; i < orderCount; i++) {
      const orderRow = orders.nth(i);
      const orderRowID = await orderRow.locator("th").textContent(); 
      if (orderRowID?.trim() === orderID?.trim()) {
        await orderRow.locator("button[class='btn btn-danger']").click();
        console.log(`Order ID matched and deleted: ${orderRowID}`); 
        break;
      }
      else {
        console.log(`Order ID not matched: ${orderRowID}`);
      } 
    }
  }

  // Verify deletion success toast message
  async verifyOrderDeletedToast() {
    await expect(this.page.locator("#toast-container div[aria-label='Orders Deleted Successfully']")).toBeVisible();
  }
}
