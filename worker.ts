require('dotenv').config();
const cron = require('node-cron');

const { Shopify, shopifyApi } = require("@shopify/shopify-api");

const { default: setAbstractRuntimeString } = require("@shopify/shopify-api/adapters/node");


setAbstractRuntimeString(nodeRuntimeString);

const shopify = new shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  hostName: process.env.SHOPIFY_HOST_NAME,
  scopes: ['read_orders', 'write_orders'], // Adjust scopes based on your needs
});

async function updateOrders() {
  const orders = await shopify.order.list();

  console.log(orders)

}

const schedule = '*/2 * * * *'; 

cron.schedule(schedule, async () => {
  await updateOrders();
});

console.log("Worker started, the cron is launched...");
