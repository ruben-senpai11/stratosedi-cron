require('dotenv').config();
const cron = require('node-cron');
const axios = require('axios');

// Replace with your Remix app's URL and API route
const url = process.env.APP_URL;

// Replace with your Shopify shop domain and API credentials if needed
// Using dotenv
require('dotenv').config();

const shopDomain = process.env.SHOPIFY_SHOP_DOMAIN;
const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;

const data = { action: "make_importations" };

// Define the cron schedule (e.g., every hour)
const schedule = '*/2 * * * *'; // Every hour at the beginning (0th minute)

cron.schedule(schedule, async () => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        'X-Shopify-Shop-Domain': shopDomain, // Optional, if using Shopify API credentials
        'Authorization': `Bearer ${accessToken}` // Optional, if using Shopify API credentials
      }
    });

    console.log("Products exported successfully:", response.data);
  } catch (error) {
    console.error("Error exporting products:", error);
  }
});

console.log("Worker started, the cron is launched...");
