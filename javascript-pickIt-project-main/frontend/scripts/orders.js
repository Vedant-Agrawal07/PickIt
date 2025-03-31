export let orders ;

let user = JSON.parse(localStorage.getItem("user"));

export let order_placed;

export async function add_order(
  cartData,
  total,
  deliveryDateArray,
  order_placed_date
) {
  cartData = JSON.stringify(cartData);
  deliveryDateArray = JSON.stringify(deliveryDateArray);

  let config = {
    headers: {
      authorization: `Bearer ${user.token}`,
    },
  };

  let response = await axios.post(
    "http://localhost:5000/api/order/add",
    {
      cart: cartData,
      totalCost: total,
      deliveryDateArray: deliveryDateArray,
      orderDate: order_placed_date,
    },
    config
  );

  order_placed = order_placed_date;
}

export async function fetch_orders() {
  let config = {
    headers: {
      authorization: `Bearer ${user.token}`,
    },
  };

  let response = await axios.get("http://localhost:5000/api/order", config);
  let newOrders = response.data;
  orders = newOrders;
  // savetostorage(orders);
}
