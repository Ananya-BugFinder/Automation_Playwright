import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage.page';
import { ShoppingPage } from '../pages/ShoppingPage.page';
import testdata from '../testdata/testdata.json';

test('Product Checkout', async ({ page }) => {
  const basePage = new BasePage(page);
  const shoppingPage = new ShoppingPage(page);
  const productName = testdata.products.zaraCoat;

  //Launching the site
  await test.step('Launch login page', async () => {
    await basePage.launchSite(testdata.applicationUrl);
    const screenshot = await page.screenshot({ path: 'screenshots/01-login-page.png' });
    await test.info().attach('01-login-page', { body: screenshot, contentType: 'image/png' });
  });

  //Login into the application.
  await test.step('Login to application', async () => {
    await basePage.login(testdata.loginCredentials.email, testdata.loginCredentials.password);
    const screenshot = await page.screenshot({ path: 'screenshots/02-after-login.png' });
    await test.info().attach('02-after-login', { body: screenshot, contentType: 'image/png' });
  });

  //Add Zara Coat Product to cart
  await test.step('Add product to cart', async () => {
    await shoppingPage.addProductToCart(productName);
    await shoppingPage.verifyProductAddedToast();
    const screenshot = await page.screenshot({ path: 'screenshots/03-product-added-to-cart.png' });
    await test.info().attach('03-product-added-to-cart', { body: screenshot, contentType: 'image/png' });
  });

  //Go to Cart
  await test.step('Verify product in cart', async () => {
    await shoppingPage.goToCart();
    await shoppingPage.verifyCartProduct(productName);
    const screenshot = await page.screenshot({ path: 'screenshots/04-cart-verified.png' });
    await test.info().attach('04-cart-verified', { body: screenshot, contentType: 'image/png' });
  });

  //click on checkout button
  await test.step('Fill payment details', async () => {
    await shoppingPage.proceedToCheckout();
    await shoppingPage.fillCardDetails(testdata.paymentDetails.cvv, testdata.paymentDetails.cardholderName);
    const screenshot = await page.screenshot({ path: 'screenshots/05-payment-details-filled.png' });
    await test.info().attach('05-payment-details-filled', { body: screenshot, contentType: 'image/png' });
  });

  //Apply Coupon
  await test.step('Apply coupon code', async () => {
    await shoppingPage.applyCoupon(testdata.couponCode);
    await shoppingPage.verifyCouponApplied();
    const screenshot = await page.screenshot({ path: 'screenshots/06-coupon-applied.png' });
    await test.info().attach('06-coupon-applied', { body: screenshot, contentType: 'image/png' });
  });

  //Select Country (simple)
  await test.step('Select country and place order', async () => {
    await shoppingPage.selectCountry(testdata.country);
    const screenshot1 = await page.screenshot({ path: 'screenshots/07-country-selected.png' });
    await test.info().attach('07-country-selected', { body: screenshot1, contentType: 'image/png' });
    
    //Place Order
    await shoppingPage.placeOrder();
    const screenshot2 = await page.screenshot({ path: 'screenshots/08-order-placed.png' });
    await test.info().attach('08-order-placed', { body: screenshot2, contentType: 'image/png' });
  });

  //Verify order confirmation
  await test.step('Verify order confirmation', async () => {
    await shoppingPage.verifyOrderConfirmation(testdata.orderConfirmationProduct);
    const screenshot = await page.screenshot({ path: 'screenshots/09-order-confirmed.png' });
    await test.info().attach('09-order-confirmed', { body: screenshot, contentType: 'image/png' });
  });

  //Sign Out from application
  await test.step('Sign out', async () => {
    await basePage.signOut();
    const screenshot = await page.screenshot({ path: 'screenshots/10-signed-out.png' });
    await test.info().attach('10-signed-out', { body: screenshot, contentType: 'image/png' });
  });
});


test('Check order in Order Page', async ({ page }) => {
  const basePage = new BasePage(page);
  const shoppingPage = new ShoppingPage(page);
  const productName = testdata.products.iPhone;
  let orderID: string | null = null;

  //Launching the site
  await test.step('Launch login page', async () => {
    await basePage.launchSite(testdata.applicationUrl);
    const screenshot = await page.screenshot({ path: 'screenshots/delete-01-login-page.png' });
    await test.info().attach('delete-01-login-page', { body: screenshot, contentType: 'image/png' });
  });

  //Login into the application.
  await test.step('Login to application', async () => {
    await basePage.login(testdata.loginCredentials.email, testdata.loginCredentials.password);
    const screenshot = await page.screenshot({ path: 'screenshots/delete-02-after-login.png' });
    await test.info().attach('delete-02-after-login', { body: screenshot, contentType: 'image/png' });
  });

  //Add product to cart
  await test.step('Add product to cart', async () => {
    await shoppingPage.addProductToCart(productName);
    await shoppingPage.verifyProductAddedToast();
    const screenshot = await page.screenshot({ path: 'screenshots/delete-03-product-added-to-cart.png' });
    await test.info().attach('delete-03-product-added-to-cart', { body: screenshot, contentType: 'image/png' });
  });

  //Go to Cart
  await test.step('Verify product in cart', async () => {
    await shoppingPage.goToCart();
    await shoppingPage.verifyCartProduct(productName);
    const screenshot = await page.screenshot({ path: 'screenshots/delete-04-cart-verified.png' });
    await test.info().attach('delete-04-cart-verified', { body: screenshot, contentType: 'image/png' });
  });

  //click on checkout button
  await test.step('Fill payment details', async () => {
    await shoppingPage.proceedToCheckout();
    await shoppingPage.fillCardDetails(testdata.paymentDetails.cvv, testdata.paymentDetails.cardholderName);
    const screenshot = await page.screenshot({ path: 'screenshots/delete-05-payment-details-filled.png' });
    await test.info().attach('delete-05-payment-details-filled', { body: screenshot, contentType: 'image/png' });
  });

  //Apply Coupon
  await test.step('Apply coupon code', async () => {
    await shoppingPage.applyCoupon(testdata.couponCode);
    await shoppingPage.verifyCouponApplied();
    const screenshot = await page.screenshot({ path: 'screenshots/delete-06-coupon-applied.png' });
    await test.info().attach('delete-06-coupon-applied', { body: screenshot, contentType: 'image/png' });
  });

  //Select Country and Place Order
  await test.step('Select country and place order', async () => {
    await shoppingPage.selectCountry(testdata.country);
    const screenshot1 = await page.screenshot({ path: 'screenshots/delete-07-country-selected.png' });
    await test.info().attach('delete-07-country-selected', { body: screenshot1, contentType: 'image/png' });
    
    //Place Order
    await shoppingPage.placeOrder();
    const screenshot2 = await page.screenshot({ path: 'screenshots/delete-08-order-placed.png' });
    await test.info().attach('delete-08-order-placed', { body: screenshot2, contentType: 'image/png' });
  });

  //Verify order confirmation
  await test.step('Verify order confirmation and get Order ID', async () => {
    await shoppingPage.verifyOrderConfirmation(productName);
    
    //Store Order ID  
    orderID = await basePage.getOrderID();
    console.log(`Order ID: ${orderID}`);
    const screenshot = await page.screenshot({ path: 'screenshots/delete-09-order-confirmed.png' });
    await test.info().attach('delete-09-order-confirmed', { body: screenshot, contentType: 'image/png' });
  });

  //Go to Orders page
  await test.step('Navigate to orders page', async () => {
    await shoppingPage.goToOrdersPage();
    const screenshot = await page.screenshot({ path: 'screenshots/delete-10-orders-page.png' });
    await test.info().attach('delete-10-orders-page', { body: screenshot, contentType: 'image/png' });
  });

  //Find the order in orders table
  await test.step('Find order in table', async () => {
    const found = await shoppingPage.findOrderInTable(orderID);
    const screenshot = await page.screenshot({ path: 'screenshots/delete-11-order-found.png' });
    await test.info().attach('delete-11-order-found', { body: screenshot, contentType: 'image/png' });
  });

  //Sign Out from application
  await test.step('Sign out', async () => {
    await basePage.signOut();
    const screenshot = await page.screenshot({ path: 'screenshots/delete-12-signed-out.png' });
    await test.info().attach('delete-12-signed-out', { body: screenshot, contentType: 'image/png' });
  });
});

test('Delete Product from Cart', async ({ page }) => { 
  const basePage = new BasePage(page);
  const shoppingPage = new ShoppingPage(page);
  const productName = testdata.products.iPhone;
  let orderID: string | null = null;

  //Launching the site
  await test.step('Launch login page', async () => {
    await basePage.launchSite(testdata.applicationUrl);
    const screenshot = await page.screenshot({ path: 'screenshots/delete-01-login-page.png' });
    await test.info().attach('delete-01-login-page', { body: screenshot, contentType: 'image/png' });
  });

  //Login into the application.
  await test.step('Login to application', async () => {
    await basePage.login(testdata.loginCredentials.email, testdata.loginCredentials.password);
    const screenshot = await page.screenshot({ path: 'screenshots/delete-02-after-login.png' });
    await test.info().attach('delete-02-after-login', { body: screenshot, contentType: 'image/png' });
  });

  //Add product to cart
  await test.step('Add product to cart', async () => {
    await shoppingPage.addProductToCart(productName);
    await shoppingPage.verifyProductAddedToast();
    const screenshot = await page.screenshot({ path: 'screenshots/delete-03-product-added-to-cart.png' });
    await test.info().attach('delete-03-product-added-to-cart', { body: screenshot, contentType: 'image/png' });
  });

  //Go to Cart
  await test.step('Verify product in cart', async () => {
    await shoppingPage.goToCart();
    await shoppingPage.verifyCartProduct(productName);
    const screenshot = await page.screenshot({ path: 'screenshots/delete-04-cart-verified.png' });
    await test.info().attach('delete-04-cart-verified', { body: screenshot, contentType: 'image/png' });
  });

  //click on checkout button
  await test.step('Fill payment details', async () => {
    await shoppingPage.proceedToCheckout();
    await shoppingPage.fillCardDetails(testdata.paymentDetails.cvv, testdata.paymentDetails.cardholderName);
    const screenshot = await page.screenshot({ path: 'screenshots/delete-05-payment-details-filled.png' });
    await test.info().attach('delete-05-payment-details-filled', { body: screenshot, contentType: 'image/png' });
  });

  //Apply Coupon
  await test.step('Apply coupon code', async () => {
    await shoppingPage.applyCoupon(testdata.couponCode);
    await shoppingPage.verifyCouponApplied();
    const screenshot = await page.screenshot({ path: 'screenshots/delete-06-coupon-applied.png' });
    await test.info().attach('delete-06-coupon-applied', { body: screenshot, contentType: 'image/png' });
  });

  //Select Country and Place Order
  await test.step('Select country and place order', async () => {
    await shoppingPage.selectCountry(testdata.country);
    const screenshot1 = await page.screenshot({ path: 'screenshots/delete-07-country-selected.png' });
    await test.info().attach('delete-07-country-selected', { body: screenshot1, contentType: 'image/png' });
    
    //Place Order
    await shoppingPage.placeOrder();
    const screenshot2 = await page.screenshot({ path: 'screenshots/delete-08-order-placed.png' });
    await test.info().attach('delete-08-order-placed', { body: screenshot2, contentType: 'image/png' });
  });

  //Verify order confirmation
  await test.step('Verify order confirmation and get Order ID', async () => {
    await shoppingPage.verifyOrderConfirmation(productName);
    
    //Store Order ID  
    orderID = await basePage.getOrderID();
    console.log(`Order ID: ${orderID}`);
    const screenshot = await page.screenshot({ path: 'screenshots/delete-09-order-confirmed.png' });
    await test.info().attach('delete-09-order-confirmed', { body: screenshot, contentType: 'image/png' });
  });

  //Go to Orders page
  await test.step('Navigate to orders page', async () => {
    await shoppingPage.goToOrdersPage();
    const screenshot = await page.screenshot({ path: 'screenshots/delete-10-orders-page.png' });
    await test.info().attach('delete-10-orders-page', { body: screenshot, contentType: 'image/png' });
  });

  await page.waitForTimeout(2000);

  //Find the order in orders table and delete
  await test.step('Find order in table and delete', async () => {
    await shoppingPage.deleteOrderFromTable(orderID);
    await shoppingPage.verifyOrderDeletedToast();
    const screenshot = await page.screenshot({ path: 'screenshots/delete-11-order-deleted.png' });
    await test.info().attach('delete-11-order-deleted', { body: screenshot, contentType: 'image/png' });  
  });

  await page.waitForTimeout(2000);

  //Sign Out from application
  await test.step('Sign out', async () => {
    await basePage.signOut();
    const screenshot = await page.screenshot({ path: 'screenshots/delete-12-signed-out.png' });
    await test.info().attach('delete-12-signed-out', { body: screenshot, contentType: 'image/png' });
  });
});
