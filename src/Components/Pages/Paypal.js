import { loadScript } from "@paypal/paypal-js";
import { setActiveLink } from "../../utils/activeLink";
import { getAuthenticatedUser } from "../../utils/auths";
import { clearPage } from "../../utils/render";
import { setUserIcon } from "../../utils/userIcon";
import { countProductCart, getCartTotal, shoppingCart } from "../../utils/utilsCart";
import { addOrder } from "../../utils/utilsOrders";
import Navbar from "../Navbar/Navbar";
import Navigate from "../Router/Navigate";

const html = `
<div style="text-align: center; margin-top : 100px">
  <strong> Amount to Pay : 
    <div id="priceToPay">
    
    </div> 
  </strong>

</div>
<div id="smart-button-container">
    <div style="text-align: center; margin-top: 5%;" id="paypal-button-container">

    </div>
</div>
   `

const PaypalPage = () =>{
    clearPage();
    setActiveLink('userPage');

    setUserIcon('extUserPage');
    Navbar();
    const main = document.querySelector('main');
    main.innerHTML = html;

    const idToPay = document.getElementById('priceToPay');
    const script = document.createElement('script');

    // paypal button script
    script.src = 'https://www.paypal.com/sdk/js?client-id=sd&currency=EUR&buyer-country=DE&commit=false';

    // append to main because innerHTML does not read scripts
    main.appendChild(script);

    // Display price on top of button
    let total = getCartTotal();
    total += ' $';
    idToPay.innerHTML = total;

    // paypal api script for the button
    loadScript({
      'client-id':
        'AWEnDzMJ1xdqqno_kFxSrbvBXeUu1AQXkmiggw9jw5sGSlSCpQrk-hkEN0_sBsSUprAyLZY18UaV1BEU',
    })
      .then((paypal) => {
        function initPayPalButton() {
          paypal
            .Buttons({
              style: {
                shape: 'pill',
                color: 'white',
                layout: 'horizontal',
                label: 'paypal',
              },

              createOrder(data, actions) {
                return actions.order.create({
                  purchase_units: [{ amount: { currency_code: 'USD', value: getCartTotal() } }],
                });
              },

               onApprove(data, actions) {
                return actions.order.capture().then((orderData) => {
                  // Full available details
                  console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

                  // Show a success message within this page, e.g.
                  const element = document.getElementById('paypal-button-container');
                  element.innerHTML = '';
                  element.innerHTML = '<h3>Thank you for your payment! You will be redirected</h3>';
                  endTransaction();
                  // Or go to another URL:  actions.redirect('thank_you.html'); 
                  async function endTransaction(){
                    const user = getAuthenticatedUser();
                    await addOrder();
                    await shoppingCart(user.email);
                    const nombre = document.getElementById('numberOfArticles');
                    const newNombre = countProductCart();
                    nombre.innerHTML = newNombre;
                    setTimeout(() => {
                      Navigate("/")
                    }, 3400)
                }});
              },

    onError(err) {
      console.log(err);
    }
  }).render('#paypal-button-container');
}
// initiate paypal button
initPayPalButton();})

  .catch((err) => {
      console.error("failed to load the PayPal JS SDK script", err);
  });
  
}




export default PaypalPage;
