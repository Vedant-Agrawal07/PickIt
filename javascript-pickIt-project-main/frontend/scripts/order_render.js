import { orders, order_placed, fetch_orders } from "./orders.js";
// import { products, get_product } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { add_to_cart, cart, load_from_storage } from "./cart.js";

let user_data = JSON.parse(localStorage.getItem("user"));
if (user_data) {
  await render_orders();
} else {
  window.location.href = "testinggg.html";
}

async function render_orders() {
  // await load_from_storage();
  await fetch_orders();
   document.querySelector(".logout_button").addEventListener("click", () => {
     localStorage.removeItem("user");
     // localStorage.removeItem("cart");
     window.location.href = "testinggg.html";
   });
  let ordershtml = "";

  console.log(cart);
  console.log("hello");

  orders.forEach((element, index) => {
    ordershtml += `
    <div class="order-container"> 
          
         <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${element.orderDate}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>&#8377;${element.totalCost.toFixed(2)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${element._id}</div>
            </div>
          </div>

         <div class="order-details-grid">`;
    const Products = element.products;
    Products.forEach((product) => {
      console.log(product.productId._id);

      ordershtml += `<div class="product-image-container">
              <img src="/javascript-pickIt-project-main/${product.productId.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${product.productId.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${product.deliveryDate}
              </div>
              <div class="product-quantity">
                Quantity: ${product.quantity}
              </div>
              <button class="buy-again-button button-primary" data-buy-again = "${product.productId._id}" >
                <img class="buy-again-icon" src="/javascript-pickIt-project-main/images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>`;
    });
    ordershtml += `</div></div>`;
  });
  document.querySelector(".orders-grid").innerHTML = ordershtml;

  document.querySelectorAll(".buy-again-button").forEach((element) => {
    element.addEventListener("click", async () => {
      let productId = element.dataset.buyAgain;
      console.log(productId);
      add_to_cart(productId);
    });
  });
}
