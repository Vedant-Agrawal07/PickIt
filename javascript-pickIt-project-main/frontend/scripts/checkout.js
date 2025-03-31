import { render_payment_summary } from "./payment_summary.js";
import { render_order_summary } from "./order_summary.js";

let user_data = JSON.parse(localStorage.getItem("user"));
if (user_data) {
  await loadPage();
} else {
  window.location.href = "testinggg.html";
}

async function loadPage() {
  await render_payment_summary();
  await render_order_summary();
}
