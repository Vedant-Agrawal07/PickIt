import { cart_quantity } from "./cart.js";
import { fetch_orders, orders } from "./orders.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

await render_tracking();

async function render_tracking() {
  document.querySelector(".cart-quantity").innerHTML = cart_quantity;
  await fetch_orders();
  document.querySelector(".logout_button").addEventListener("click", () => {
    localStorage.removeItem("user");
    // localStorage.removeItem("cart");
    window.location.href = "loginPage.html";
  });
  let track_order = ``;
  let globalIndex = 0;
  orders.forEach((element) => {
    track_order += `<div class="order-tracking">
        `;

    let Products = element.products;
    Products.forEach((product, index) => {
      track_order += `
          <div class="delivery-date">Arriving on ${product.deliveryDate}</div>
          <div class="product-info">
            ${product.productId.name}
          </div>

          <div class="product-info">Quantity: ${product.quantity}</div>

          <img
            class="product-image"
            src="/javascript-pickIt-project-main/${product.productId.image}"
          />

          <div class="progress-labels-container">
            <div class="progress-label preparing-${globalIndex}" data-current-status = "${globalIndex}">Preparing</div>
            <div class="progress-label shipped-${globalIndex}" data-current-status = "${globalIndex}">Shipped</div>
            <div class="progress-label delivered-${globalIndex}" data-current-status = "${globalIndex}">Delivered</div>
          </div>

          <div class="progress-bar-container">
            <div class="progress-bar progress-bar-${globalIndex} " data-progress-bar = "${globalIndex}"></div>
          </div>
        
        <br />
        <br />
        <br />`;
      globalIndex++;
    });
    track_order += `</div>`;
  });
  document.querySelector(".track_orders_container").innerHTML = track_order;

  globalIndex = 0;
  orders.forEach((element) => {
    let Products = element.products;
    Products.forEach((product, index) => {
      // console.log(":" + globalIndex);
      let today = dayjs().startOf("day");

      let formattedDate = dayjs(product.deliveryDate, "dddd, MMMM D").year(
        dayjs().year()
      );
      let diff = formattedDate.diff(today, "days");
      // console.log(diff);

      if (diff == 7 || diff == 6) {
        document.querySelector(` .progress-bar-${globalIndex}`).style.width =
          "10%";
        document
          .querySelector(`.preparing-${globalIndex}`)
          .classList.add("current-status");
        document
          .querySelector(`.shipped-${globalIndex}`)
          .classList.remove("current-status");
        document
          .querySelector(`.delivered-${globalIndex}`)
          .classList.remove("current-status");
      } else if (diff == 5 || diff == 4) {
        document.querySelector(`.progress-bar-${globalIndex}`).style.width =
          "30%";
        document
          .querySelector(`.preparing-${globalIndex}`)
          .classList.add("current-status");
        document
          .querySelector(`.shipped-${globalIndex}`)
          .classList.remove("current-status");
        document
          .querySelector(`.delivered-${globalIndex}`)
          .classList.remove("current-status");
      } else if (diff == 3) {
        document.querySelector(`.progress-bar-${globalIndex}`).style.width =
          "50%";
        document
          .querySelector(`.preparing-${globalIndex}`)
          .classList.remove("current-status");
        document
          .querySelector(`.shipped-${globalIndex}`)
          .classList.add("current-status");
        document
          .querySelector(`.delivered-${globalIndex}`)
          .classList.remove("current-status");
      } else if (diff == 2) {
        document.querySelector(`.progress-bar-${globalIndex}`).style.width =
          "80%";
        document
          .querySelector(`.preparing-${globalIndex}`)
          .classList.remove("current-status");
        document
          .querySelector(`.shipped-${globalIndex}`)
          .classList.add("current-status");
        document
          .querySelector(`.delivered-${globalIndex}`)
          .classList.remove("current-status");
      } else if (diff == 1) {
        document.querySelector(`.progress-bar-${globalIndex}`).style.width =
          "90%";
        document
          .querySelector(`.preparing-${globalIndex}`)
          .classList.remove("current-status");
        document
          .querySelector(`.shipped-${globalIndex}`)
          .classList.add("current-status");
        document
          .querySelector(`.delivered-${globalIndex}`)
          .classList.remove("current-status");
      } else if (diff == 0 || diff < 0) {
        document.querySelector(`.progress-bar-${globalIndex}`).style.width =
          "100%";
        document
          .querySelector(`.preparing-${globalIndex}`)
          .classList.remove("current-status");
        document
          .querySelector(`.shipped-${globalIndex}`)
          .classList.remove("current-status");
        document
          .querySelector(`.delivered-${globalIndex}`)
          .classList.add("current-status");
      }
      globalIndex++;
    });
  });
}
