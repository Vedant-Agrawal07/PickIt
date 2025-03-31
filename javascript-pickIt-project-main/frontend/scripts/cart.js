export let cart;
let user = JSON.parse(localStorage.getItem("user"));

await load_from_storage();

export async function load_from_storage() {
  await fetchCart();

  if (!cart || typeof cart !== "object") {
    cart = { products: [] };
  }

  if (!Array.isArray(cart.products)) {
    cart.products = [];
  }
}

async function fetchCart() {
  let config = {
    headers: {
      authorization: `Bearer ${user.token}`,
    },
  };

  try {
    let response = await axios.get("http://localhost:5000/api/cart", config);

    let new_cart = response.data;

    cart = new_cart;
  } catch (error) {
    console.error(
      "❌ Error fetching cart:",
      error.response?.data || error.message
    );

    // If the error is 400, assume the cart does not exist and reset it
    if (error.response?.status === 400) {
      cart = { products: [] };
    }
  }

  // save_to_storage(new_cart);
}

export async function add_to_cart(product_id) {
  let config = {
    headers: {
      authorization: `Bearer ${user.token}`,
    },
  };

  // let matching_item;
  const options = document.querySelector(`.js-select-${product_id}`)
    ? document.querySelector(`.js-select-${product_id}`).value
    : false;

  const item_quantity = options ? Number(options) : 1;

  let response = await axios.post(
    "http://localhost:5000/api/cart/add",
    {
      productId: product_id,
      quantity: item_quantity,
    },
    config
  );

  cart = response.data;

  let cart_quantity = 0;
  cart.products.forEach((item) => {
    cart_quantity += item.quantity;
  });

  document.querySelector(`.cart-quantity`).innerHTML = cart_quantity;
  // save_to_storage(cart);
}

// export function save_to_storage(cart) {
//   localStorage.setItem("cart", JSON.stringify(cart));
// }

export async function remove_from_cart(productId) {
  let config = {
    headers: {
      authorization: `Bearer ${user.token}`,
    },
  };

  let response = await axios.post(
    "http://localhost:5000/api/cart/remove",
    {
      productId: productId,
    },
    config
  );

  let newCart = response.data;
  cart = newCart;

  // save_to_storage(newCart);
}

export async function update_delivery_option(product_id, delivery_option_id) {
  let config = {
    headers: {
      authorization: `Bearer ${user.token}`,
    },
  };

  let response = await axios.put(
    "http://localhost:5000/api/cart/updateOption",
    {
      productId: product_id,
      optionId: delivery_option_id,
    },
    config
  );

  let newCart = response.data;
  cart = newCart;

  // save_to_storage(newCart);
}

export async function updateCartProduct(productId, quantity) {
  let config = {
    headers: {
      authorization: `Bearer ${user.token}`,
    },
  };

  let response = await axios.put(
    "http://localhost:5000/api/cart/update",
    {
      productId: productId,
      quantity: quantity,
    },
    config
  );

  let new_cart = response.data;
  cart = new_cart;
  // save_to_storage(new_cart);
}
