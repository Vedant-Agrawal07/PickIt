export let cart =  JSON.parse(localStorage.getItem('cart'));


if(!cart){
    cart = [{
      productId:`e43638ce-6aa0-4b85-b27f-e1d07eb678c6`,
      quantity:2 ,
      delivery_optionId:`1`
    },
    {
      productId:`15b6fc6f-327a-4ec4-896f-486349e85a3d`,
      quantity:1,
      delivery_optionId:`1`
    }];
}

export function remove_from_cart(productId){
    let new_cart = [];
    cart.forEach((cart_item)=>{
        if(cart_item.productId !== productId){
            new_cart.push(cart_item);
        }
      })
      cart = new_cart
      save_to_storage();
}


export function save_to_storage(){
  localStorage.setItem('cart' , JSON.stringify(cart));
}


export function update_delivery_option(product_id , delivery_option_id){
  let matching_item;
  cart.forEach((item) => {
    if (product_id === item.productId) {
      matching_item = item;
    }
  });

    matching_item.delivery_optionId= delivery_option_id;
    save_to_storage();

}
