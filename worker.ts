// my-script.ts

import { Shopify } from "@shopify/shopify-api";

const shopify = new Shopify({
  apiKey: process.env.SHOPIFY_API_KEY,
  password: process.env.SHOPIFY_API_PASSWORD,
  shopName: process.env.SHOPIFY_SHOP_NAME,
});

async function updateOrders(): Promise<void> {
  const orders = await shopify.order.list();

  for (const order of orders) {
    // Mettre à jour l'état de la commande (type attendu par 'update' à vérifier dans la doc si besoin)
    await shopify.order.update(order.id, { status: "shipped" });
  }
}

async function updateInventory(): Promise<void> {
  const products = await shopify.product.list();

  for (const product of products) {
    // Mettre à jour le stock du produit (type attendu par 'update' à vérifier dans la doc si besoin)
    await shopify.product.update(product.id, { inventory_quantity: 100 });
  }
}

async function main(): Promise<void> {
  await updateOrders();
  await updateInventory();
}

main();
