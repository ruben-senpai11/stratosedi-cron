require('dotenv').config();
const cron = require('node-cron');
const puppeteer = require('puppeteer');

const apiEndpoint = process.env.SHOPIFY_API_ENDPOINT;

async function solveCaptchaAndFetchData() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    // Navigate to the Shopify API endpoint
    await page.goto(apiEndpoint);

    // Add your code to interact with the page and solve the CAPTCHA
    // For example:
    // await page.waitForSelector('#captcha-input');
    // await page.type('#captcha-input', 'captcha_solution');

    // Wait for the page to load after solving the CAPTCHA
    await page.waitForNavigation();

    // Once CAPTCHA is solved, fetch the data
    const response = await page.evaluate(() => {
      return fetch(apiEndpoint, {
        method: 'POST',
        // Add any necessary headers or payload for the request
      }).then(res => res.json());
    });

    console.log('Data:', response);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

async function updateOrders() {
  console.log("Entered in update method");
  try {
    await solveCaptchaAndFetchData();
  } catch (error) {
    console.error("Error Updating:", error);
  }
}

const schedule = '*/1 * * * *'; 

cron.schedule(schedule, async () => {
  await updateOrders();
  const date = new Date();
  const timeString = date.toLocaleTimeString();
  console.log(timeString, "script.js started, the cron is launched...");
});
