import { cart, load_from_storage } from "./cart.js";
// import { get_product } from "../data/products.js";
import { get_delivery_Option } from "./delivery_options.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { add_order } from "./orders.js";

export async function render_payment_summary() {
  await load_from_storage();
  let product_price = 0;
  let delivery_product = 0;
  let total_items = 0;
  // console.log(cart);
  cart.products.forEach((cart_item) => {
    const productId = cart_item.productId._id;
    total_items++;

    product_price +=
      (cart_item.productId.price * cart_item.quantity) / 10;
    const delivery_option = get_delivery_Option(cart_item.delivery_optionId);
    delivery_product += delivery_option.price / 10;
  });

  const total_before_tax = product_price + delivery_product;
  const tax = total_before_tax * 0.1;
  const total = total_before_tax + tax;

  document.querySelector(".return-to-home-link").innerHTML = `${total_items}`;

  const payment_summaryHTML = ` <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (${total_items}):</div>
          <div class="payment-summary-money">&#8377;${product_price.toFixed(
            2
          )}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">&#8377;${delivery_product.toFixed(
            2
          )}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">&#8377;${total_before_tax.toFixed(
            2
          )}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">&#8377;${tax.toFixed(
            2
          )}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">&#8377;${total.toFixed(
            2
          )}</div>
        </div>

        <a href = "orders.html" >
        <button class="place-order-button button-primary 
         js-place-order">
         Place your order
         </button>
         </a>
      `;

  document.querySelector(`.js_payment_summary`).innerHTML = payment_summaryHTML;
  if (cart.products.length === 0) {
    document.querySelector(".js-place-order").disabled = true;
  }
  document
    .querySelector(".js-place-order")
    .addEventListener("click", async () => {
      let order_placed = dayjs().format("MMMM DD YYYY");

      let deliveryDateArray = cart.products.map((cart_item) => {
        let deliveryOption_Id = cart_item.delivery_optionId;
        let deliveryOption = get_delivery_Option(deliveryOption_Id);
        let today = dayjs();
        let delivery_Date = today.add(deliveryOption.delivery_days, "days");
        let date_string = delivery_Date.format("dddd, MMMM D");

        return date_string;
      });

      // localStorage.removeItem("cart");
      await add_order(cart, total, deliveryDateArray, order_placed);
    });
}
