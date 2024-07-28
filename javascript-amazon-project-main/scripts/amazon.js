import {cart , save_to_storage} from './cart.js';
import { products } from '../data/products.js';


// export const products = [{
//   image: `images/products/athletic-cotton-socks-6-pairs.jpg`,
//   name: `Black and Gray Athletic Cotton Socks - 6 Pairs`,
//   id: `112a`,
//   rating: {
//     stars: `images/ratings/rating-45.png`,
//     count: 87,
//   },
//   price_cents: 1090
// },
// {
//   image: `images/products/intermediate-composite-basketball.jpg`,
//   name: `Intermediate Size Basketball`,
//   id: `112b`,
//   rating: {
//     stars: `images/ratings/rating-40.png`,
//     count: 127,
//   },
//   price_cents: 2095
// },
// {
//   image: `images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg`,
//   name: `Adults Plain Cotton T-Shirt - 2 Pack`,
//   id: `112c`,
//   rating: {
//     stars: `images/ratings/rating-45.png`,
//     count: 56,
//   },
//   price_cents: 799
// },
// {
//   image: `images/products/black-2-slot-toaster.jpg`,
//   name: `2 Slot Toaster - Black`,
//   id: `112d`,
//   rating: {
//     stars: `images/ratings/rating-50.png`,
//     count: 2197,
//   },
//   price_cents: 1899
// }];

let productsHtml = ``;

products.forEach((product) => {
  productsHtml += `
 <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${product.priceCents/ 100}
          </div>

          <div class="product-quantity-container">
            <select class="js-select-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js_add_to_cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
`;
});
// console.log(productsHtml);
document.querySelector(`.products-grid`).innerHTML = productsHtml;



document.querySelectorAll(`.js_add_to_cart`).forEach((button) => {
  button.addEventListener(`click`, () => {
    // console.log(`added product`);
    // console.log(button.dataset); // button.dataset works as a object so in the console it shows productName having the prodiuct name so we used that
    // console.log(button.dataset.productName);

    const product_id = button.dataset.productId;
    let matching_item;
    const options = document.querySelector(`.js-select-${product_id}`).value;
    const item_quantity = Number(options);
    // console.log(item_quantity);
    cart.forEach((item) => {
      if (product_id === item.productId) {
        matching_item = item;
      }
    });
    if (matching_item) {
      matching_item.quantity += item_quantity;
    }
    else {
      cart.push({
        productId: product_id,
        quantity: item_quantity,
        delivery_optionId: `1`
      });
    }
    let cart_quantity = 0;
    cart.forEach((item) => {
      cart_quantity += item.quantity
    });
    console.log(cart_quantity);
    console.log(cart);
    document.querySelector(`.cart-quantity`).innerHTML = cart_quantity;
    save_to_storage();
  });
  
  // console.log(cart);
})
console.log(cart)