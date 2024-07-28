import { cart } from './cart.js';
import { get_product } from '../data/products.js';
import { get_delivery_Option } from './delivery_options.js';
export function render_payment_summary() {
  let product_price_cents = 0;
  let delivery_product = 0;
  cart.forEach((cart_item) => {
    const product = get_product(cart_item.productId);
    product_price_cents += (product.priceCents * cart_item.quantity) / 100;
    const delivery_option = get_delivery_Option(cart_item.delivery_optionId);
    delivery_product += (delivery_option.price_cents) / 100;


  })
  // console.log(product_price_cents);
  // console.log(delivery_product);
  const total_before_tax_cents = product_price_cents + delivery_product;
  const tax_cents = total_before_tax_cents * 0.1;
  const total_cents = total_before_tax_cents + tax_cents;

  const payment_summaryHTML =
      ` <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (3):</div>
          <div class="payment-summary-money">$${product_price_cents.toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${delivery_product.toFixed(2)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${total_before_tax_cents.toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${tax_cents.toFixed(2)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${total_cents.toFixed(2)}</div>
        </div>

        <button class="place-order-button button-primary">
          Place your order
        </button>
      `;

      document.querySelector(`.js_payment_summary`).innerHTML = payment_summaryHTML;

}