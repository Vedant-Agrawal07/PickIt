import { cart, remove_from_cart, update_delivery_option } from './cart.js';
import { products , get_product } from '../data/products.js';
import { delivery_options , get_delivery_Option} from './delivery_options.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {render_payment_summary} from './payment_summary.js';



export function render_order_summary() {

  let cartSummaryHTML = ``;
  cart.forEach((cart_item) => {
    const productId = cart_item.productId;
    const matchingItem = get_product(productId);
    // console.log(matchingItem);
    const delivery_option_id = cart_item.delivery_optionId;
    const deliveryOption = get_delivery_Option(delivery_option_id);
    // delivery_options.forEach((option) => {
    //   if (option.id === delivery_option_id) {
    //     deliveryOption = option;
    //   }
    // });

    const today = dayjs();
    const delivery_date = today.add(
      deliveryOption.delivery_days,
      'days'
    );
    const date_string = delivery_date.format('dddd, MMMM D');



    cartSummaryHTML += `<div class="cart-item-container cart-item-${matchingItem.id}">
          <div class="delivery-date">
            Delivery date: ${date_string}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingItem.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingItem.name}
              </div>
              <div class="product-price">
                $${matchingItem.priceCents / 100}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label">${cart_item.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                  Update
                </span>
                <span class="delete-quantity-link link-primary js_delete_link" data-product-id ="${matchingItem.id}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${delivery_optionHTML(matchingItem, cart_item)}
            </div>
          </div> 
        </div>
        `;
  });

  function delivery_optionHTML(matchingItem, cart_item) {
    let html = ``;
    delivery_options.forEach((delivery_option) => {
      const today = dayjs();
      const delivery_date = today.add(
        delivery_option.delivery_days,
        'days'
      );
      const date_string = delivery_date.format('dddd, MMMM D');
      const price_string = delivery_option.price_cents === 0
        ? 'FREE'
        : `$${delivery_option.price_cents / 100} -`;

      const is_checked = delivery_option.id ===
        cart_item.delivery_optionId;

      html += `<div class="delivery-option js_delivery_option"
    data-product-id = "${matchingItem.id}"
    data-delivery-option-id="${delivery_option.id}" ">
            <input type="radio" 
            ${is_checked ? 'checked' : ''}
            
            class="delivery-option-input" name="delivery_option_${matchingItem.id}">
            <div>
              <div class="delivery-option-date">
                ${date_string}
              </div>
              <div class="delivery-option-price">
                ${price_string} - Shipping
              </div>
            </div>
          </div>
          `;
    });
    return html;
  }

  document.querySelector(`.order-summary`).innerHTML = cartSummaryHTML;
  document.querySelectorAll(`.js_delete_link`).forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      // console.log(productId);
      remove_from_cart(productId);
      console.log(cart);
      document.querySelector(`.cart-item-${productId}`).remove();
    })
  });

  document.querySelectorAll(`.js_delivery_option`).forEach((element) => {
    element.addEventListener(`click`, () => {
      const product_id = element.dataset.productId
      const delivery_option_id = element.dataset.deliveryOptionId
      // console.log(delivery_option_id);
      // console.log(element.dataset.productId);

      update_delivery_option(product_id, delivery_option_id);
      render_order_summary();
      render_payment_summary();
    });
  });
}