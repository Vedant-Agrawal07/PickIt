export const delivery_options = [{
  id: `1`,
  delivery_days:7,
  price:0
},{
  id: `2`,
  delivery_days:3,
  price:499
},{
  id: `3`,
  delivery_days:1,
  price:999
}];

 export function get_delivery_Option(delivery_option_id){
  let deliveryOption;
    delivery_options.forEach((option) => {
      if (option.id === delivery_option_id) {
        deliveryOption = option;
      }
    });
    return deliveryOption || delivery_options[0];
}
//