import { getAuthenticatedUser } from "./auths";
import { loadCart } from "./utilsCart";


const createOrder = (email) => {
    const items = [];
    const orders = {
     objects : items,
     email
  }
  console.log("orders created");
  let string = "orders";
    string+=email;
    localStorage.setItem(string,JSON.stringify(orders));
};

async function addOrder(){
    console.log("Test d'ajout");
    const user = await getAuthenticatedUser();
    const orders = await loadOrders(user.email)
    const cart = await loadCart(user.email);
    await orders.objects.push(cart.objects)
    console.log("order added", cart)
    saveOrder(orders);
}

function loadOrders(email) {
    console.log("Test ordres chager");
    let string = "orders";
    string+=email
    const orders = JSON.parse(localStorage.getItem(string));
    console.log("les ordres sont chargés",orders);
    return orders;
}

function saveOrder(orders) {
  const user = getAuthenticatedUser();
  let string = "orders";
  string+=user.email;
  localStorage.setItem(string, JSON.stringify(orders));
  const ordersNew  = localStorage.getItem(string);
  console.log("Le nouvel ordre est", ordersNew);

}

function deleteOrders(){
  const user = getAuthenticatedUser();
  localStorage.removeItem(`orders${user.email}`)
}

export {loadOrders, addOrder, createOrder, deleteOrders}