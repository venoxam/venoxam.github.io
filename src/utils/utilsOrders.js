import { getAuthenticatedUser } from "./auths";
import { loadCart } from "./utilsCart";


const createOrder = (email) => {
    const items = [];
    const orders = {
     objects : items,
     email
  }
  
  let string = "orders";
    string+=email;
    localStorage.setItem(string,JSON.stringify(orders));
};

async function addOrder(){
    
    const user = await getAuthenticatedUser();
    const orders = await loadOrders(user.email)
    const cart = await loadCart(user.email);
    await orders.objects.push(cart.objects)
    
    saveOrder(orders);
}

function loadOrders(email) {
    
    let string = "orders";
    string+=email
    const orders = JSON.parse(localStorage.getItem(string));
    
    return orders;
}

function saveOrder(orders) {
  const user = getAuthenticatedUser();
  let string = "orders";
  string+=user.email;
  localStorage.setItem(string, JSON.stringify(orders));
  // eslint-disable-next-line
  const ordersNew  = localStorage.getItem(string);
}

function deleteOrders(){
  const user = getAuthenticatedUser();
  localStorage.removeItem(`orders${user.email}`)
}

export {loadOrders, addOrder, createOrder, deleteOrders}
