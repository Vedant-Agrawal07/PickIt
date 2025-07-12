import { cart, add_to_cart, cart_quantity } from "./cart.js";

let user_data = JSON.parse(localStorage.getItem("user"));

if (!user_data) {
  window.location.href = "loginPage.html";
}

let search;

document.querySelector(".search-bar").addEventListener("keydown", async (e) => {
  if (e.key === `Enter`) {
    search = document.querySelector(".search-bar").value;
    if (search.trim() !== ``) {
      let searchProduct = await axios.get(
        `http://localhost:5000/api/product/find?search=${search}`
      );
      await render_products_grid(searchProduct.data);
    } else if (search.trim() === ``) {
      const response = await axios.get("http://localhost:5000/api/product");
      await render_products_grid(response.data);
    }
  }
});

document.querySelector(".search-button").addEventListener("click", async () => {
  search = document.querySelector(".search-bar").value;
  if (search.trim() !== ``) {
    let searchProduct = await axios.get(
      `http://localhost:5000/api/product/find?search=${search}`
    );
    await render_products_grid(searchProduct.data);
  } else if (search.trim() === ``) {
    const response = await axios.get("http://localhost:5000/api/product");
    await render_products_grid(response.data);
  }
});

const response = await axios.get("http://localhost:5000/api/product");
await render_products_grid(response.data);

async function render_products_grid(fetchproducts) {
  document.querySelector(".cart-quantity").innerHTML = cart_quantity;

  document.querySelector(".logout_button").addEventListener("click", () => {
    localStorage.removeItem("user");
    // localStorage.removeItem("cart");
    window.location.href = "loginPage.html";
  });

  let products = fetchproducts;

  let productsHtml = ``;

  products.forEach((product) => {
    productsHtml += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"  
              src="/javascript-pickIt-project-main/${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="/javascript-pickIt-project-main/images/ratings/rating-${
                product.rating.stars * 10
              }.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            &#8377;${product.price / 10}
          </div>

          <div class="product-quantity-container">
            <select class="js-select-${product._id}">
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

          <div style="opacity:0%;" class="added-to-cart-${product._id}">
            <img style="opacity:0%;" class="added-to-cart-img-${
              product._id
            }" src="/javascript-pickIt-project-main/images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js_add_to_cart" data-product-id="${
            product._id
          }">
            Add to Cart
          </button>
        </div>
`;
  });

  document.querySelector(`.products-grid`).innerHTML = productsHtml;
  document.querySelectorAll(`.js_add_to_cart`).forEach((button) => {
    button.addEventListener(`click`, () => {
      const product_id = button.dataset.productId;
      const element = document.querySelector(`.added-to-cart-${product_id}`);
      const img = document.querySelector(`.added-to-cart-img-${product_id}`);
      element.classList.add("added-to-cart");
      img.classList.add("added-to-cart-img");
      const animationTimeout = setTimeout(() => {
        element.classList.remove("added-to-cart");
        img.classList.remove("added-to-cart-img");
      }, 2000);
      add_to_cart(product_id);
      // console.log(cart);
    });
  });
}