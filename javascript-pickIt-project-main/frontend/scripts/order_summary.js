import {
  cart,
  load_from_storage,
  remove_from_cart,
  update_delivery_option,
  updateCartProduct,
} from "./cart.js";
// import { products, get_product } from "../data/products.js";
import { delivery_options, get_delivery_Option } from "./delivery_options.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { render_payment_summary } from "./payment_summary.js";

export async function render_order_summary() {
  // let cart_quantity=0;
  
  //   cart.products.forEach((item)=>{
  //     cart_quantity += item.quantity;
  //     document.querySelector(".cart-quantity").innerHTML = cart_quantity;
  //   })
  
  // console.log(cart);
  let cartSummaryHTML = ``;
  if (!cart || !cart.products || cart.products.length === 0) {
    cartSummaryHTML += `<p>Your cart is empty !!</p>
     <a class="view-product-link" href="pickIt.html"><button class = "view-product-button">View Products</button></a>`;
  }
  cart.products.forEach((cart_item) => {
    const productId = cart_item.productId._id;

    const delivery_option_id = cart_item.delivery_optionId;
    const deliveryOption = get_delivery_Option(delivery_option_id);

    const today = dayjs();
    const delivery_date = today.add(deliveryOption.delivery_days, "days");
    const date_string = delivery_date.format("dddd, MMMM D");

    cartSummaryHTML += `<div class="cart-item-container cart-item-${productId}">
          <div class="delivery-date">
            Delivery date: ${date_string}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="/javascript-pickIt-project-main/${
              cart_item.productId.image
            }">

            <div class="cart-item-details">
              <div class="product-name">
                ${cart_item.productId.name}
              </div>
              <div class="product-price">
                &#8377;${cart_item.productId.price / 10}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <input value= "${
                    cart_item.quantity
                  }" class="quantity-label-${productId} data-product-id = "${productId}">
                </span>
                <span data-product-id = "${productId}" class="update-quantity-link link-primary">
                  Update
                </span>
                <span class="delete-quantity-link link-primary js_delete_link" data-product-id ="${productId}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${delivery_optionHTML(cart_item.productId, cart_item)}
            </div>
          </div> 
        </div>
        `;
  });

  function delivery_optionHTML(matchingItem, cart_item) {
    let html = ``;
    delivery_options.forEach((delivery_option) => {
      const today = dayjs();
      const delivery_date = today.add(delivery_option.delivery_days, "days");
      const date_string = delivery_date.format("dddd, MMMM D");
      const price_string =
        delivery_option.price === 0
          ? "FREE"
          : `&#8377;${delivery_option.price / 10} -`;

      const is_checked = delivery_option.id === cart_item.delivery_optionId;

      html += `<div class="delivery-option js_delivery_option"
            data-product-id = "${matchingItem._id}"
            data-delivery-option-id="${delivery_option.id}" ">
            <input type="radio" 
            ${is_checked ? "checked" : ""}
            
            class="delivery-option-input" name="delivery_option_${
              matchingItem._id
            }">
            <div>
              <div class="delivery-option-date">
                ${date_string}
              </div>
              <div class="delivery-option-price">
                ${price_string} - Shipping
              // </div>
            </div>
          </div>
          `;
    });
    return html;
  }

  document.querySelector(`.order-summary`).innerHTML = cartSummaryHTML;
  document.querySelectorAll(`.js_delete_link`).forEach((link) => {
    link.addEventListener("click", async () => {
      const productId = link.dataset.productId;

      await remove_from_cart(productId);

      document.querySelector(`.cart-item-${productId}`).remove();
      await render_order_summary();
      await render_payment_summary();
    });
  });

  document.querySelectorAll(`.js_delivery_option`).forEach((element) => {
    element.addEventListener(`click`, async () => {
      const product_id = element.dataset.productId;
      const delivery_option_id = element.dataset.deliveryOptionId;

      await update_delivery_option(product_id, delivery_option_id);
      await render_order_summary();
      await render_payment_summary();
    });
  });

  document.querySelectorAll(`.update-quantity-link`).forEach((element) => {
    element.addEventListener("click", async () => {
      let productId = element.dataset.productId;
      let newValue = document.querySelector(
        `.quantity-label-${productId}`
      ).value;
      await updateCartProduct(productId, newValue);
      await render_order_summary();
      await render_payment_summary();
    });
  });
  await load_from_storage();
}
