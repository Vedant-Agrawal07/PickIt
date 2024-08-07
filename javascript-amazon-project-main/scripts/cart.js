export let cart;


load_from_storage();

function load_from_storage() {
  cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart) {
    cart = [{
      productId: `e43638ce-6aa0-4b85-b27f-e1d07eb678c6`,
      quantity: 2,
      delivery_optionId: `1`
    },
    {
      productId: `15b6fc6f-327a-4ec4-896f-486349e85a3d`,
      quantity: 1,
      delivery_optionId: `1`
    }];
  }

};


export function add_to_cart(product_id) {
  // document.querySelectorAll(`.js_add_to_cart`).forEach((button) => {
  //   button.addEventListener(`click`, () => {
  //     // console.log(`added product`);
  //     // console.log(button.dataset); // button.dataset works as a object so in the console it shows productName having the prodiuct name so we used that
  //     // console.log(button.dataset.productName);

  //     const product_id = button.dataset.productId;
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
  // console.log(cart);
  document.querySelector(`.cart-quantity`).innerHTML = cart_quantity;
  save_to_storage();
  // });

  // console.log(cart);
  // });
};


export function remove_from_cart(productId) {
  let new_cart = [];
  cart.forEach((cart_item) => {
    if (cart_item.productId !== productId) {
      new_cart.push(cart_item);
    }
  })
  cart = new_cart
  save_to_storage();
}


export function save_to_storage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}


export function update_delivery_option(product_id, delivery_option_id) {
  let matching_item;
  cart.forEach((item) => {
    if (product_id === item.productId) {
      matching_item = item;
    }
  });

  matching_item.delivery_optionId = delivery_option_id;
  save_to_storage();

}



