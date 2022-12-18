import Navigate from "../Components/Router/Navigate";
import { getAuthenticatedUser } from "./auths";

const shoppingCart = (email) => {
    const items = [];
    const cart = {
     objects : items,
     email
  }
  console.log("Cart created");
  createCart(cart,email);
};

function createCart(cart,email){
    let string = "shoppingCart";
    string+=email;
    localStorage.setItem(string,JSON.stringify(cart));
}

function saveCart(cart) {
    const user = getAuthenticatedUser();
    let string = "shoppingCart";
    string+=user.email;
    localStorage.setItem(string, JSON.stringify(cart));
  }

function loadCart(emailUser) {
    console.log("Lemial du user load cart est ", emailUser);
    let string = "shoppingCart";
    string+=emailUser
  const cart = JSON.parse(localStorage.getItem(string));
  console.log( "test",cart);
  if(cart.email === emailUser){
  return cart;
}
return  console.error("le user n'a pas de cart")
}

function deleteCart() {
  const user = getAuthenticatedUser();
  localStorage.removeItem(`shoppingCart${user.email}`);
}


function addItemToCart(id, name, price, count) {
    const user = getAuthenticatedUser();
    if(user!==undefined){
        console.log("email",user.email);
     const cart = loadCart(user.email);
     console.log("tentative d'ajout dans le cart", cart);
    // eslint-disable-next-line no-restricted-syntax
        for (const item in cart.objects) {
            if (cart.objects[item].name === name) {
            cart.objects[item].count += count;
            saveCart(cart);
        return;
      }
    }
    const itemToadd = new Item(id, name, price, count);
    cart.objects.push(itemToadd);
    console.log(cart);
    saveCart(cart);
    // eslint-disable-next-line no-console
    console.log(cart);
    // eslint-disable-next-line no-console
    console.log("Ajout avec panier existant");
    }else{
        Navigate("login");
    }
  };

  function removeItemFromCart(name){
    console.log("l'objet a supprimer est : ", name);
    const user = getAuthenticatedUser();
    const cart = loadCart(user.email);
    console.log("cart avant remove ", cart)
    // eslint-disable-next-line no-restricted-syntax
    for(const item in cart.objects) {
      if(cart.objects[item].name === name) {
        cart.objects[item].count -= 1;
        if(cart.objects[item].count === 0) {
          cart.objects.splice(item,1);
        }
        console.log("Normaly Items has been removed");
        console.log(cart);
        break;
      }
  }
  saveCart(cart);
}

function getCartTotal(){
  const user = getAuthenticatedUser();
    const cart = loadCart(user.email);
    let sum =0;
    const {length} = cart.objects;
  for(let i=0; i<length; i+=1){
    sum += cart.objects[i].price * cart.objects[i].count; 
    console.log(sum);
}
return sum;
}

function countProductCart(){
  const user = getAuthenticatedUser();
  const cart = loadCart(user.email);
  const {length} = cart.objects;
  let count = 0;
  for (let i = 0; i < length; i += 1) {
    // eslint-disable-next-line prefer-destructuring
     count += cart.objects[i].count;
  }
  console.log("Le nomre de produits navbar " , count)
  return count;

}





function Item(id, name, price, count) {
  this.id =id;
  this.name = name;
  this.price = price;
  this.count = count;
}


export { shoppingCart, loadCart, deleteCart,saveCart ,addItemToCart,removeItemFromCart,getCartTotal,countProductCart, Item };
