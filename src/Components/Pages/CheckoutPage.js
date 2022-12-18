/* eslint-disable prefer-destructuring */
import { clearActive, setActiveLink } from '../../utils/activeLink';
import { getAuthenticatedUser } from '../../utils/auths';
import { clearPage } from '../../utils/render';
import { setUserIcon } from '../../utils/userIcon';
import { getCartTotal, loadCart } from '../../utils/utilsCart';
import Navbar from '../Navbar/Navbar';
import { renderPopUp } from '../../utils/utilsForm';
import Navigate from '../Router/Navigate';
import PaypalPage from './Paypal';

const CheckoutPage = () => {
  clearPage();
  setActiveLink('userPage');

  setUserIcon('extUserPage');
  Navbar();
  // verifie si l'user s'est login pour acceder à cette page
  const user = getAuthenticatedUser();
  // eslint-disable-next-line prefer-destructuring
  const firstName = user.firstName;
  // eslint-disable-next-line prefer-destructuring
  const lastName = user.lastName;
  // eslint-disable-next-line prefer-destructuring
  const email = user.email;

  const html = `
        <div class="row">
            <div class="col-md-8 order-md-1">
                <h4 class="mb-3" style="margin-top : 30px">Nearly there...</h4>
                <form class="needs-validation" novalidate="" id="form">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="firstName">First name</label>
                            <input type="text" class="form-control test" placeholder="Enter your first name" value="${firstName}" name="test"
                                required="required">
                            <div class="invalid-feedback">
                                Valid first name is required.
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="lastName">Last name</label>
                            <input type="text" class="form-control test" placeholder="Enter your last name" value="${lastName}" name="test"
                                required="required">
                            <div class="invalid-feedback">
                                Valid last name is required.
                            </div>
                        </div>
                    </div>


                    <div class="mb-3">
                        <label for="email">Email</label>
                        <input type="email" class="form-control test" placeholder="you@example.com" value="${email}"
                            name="test" required="required">
                        <div class="invalid-feedback">
                            Please enter a valid email address for shipping updates.
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="address">Address</label>
                        <input type="text" class="form-control test" placeholder="Adress" name="test"
                            required="required">
                        <div class="invalid-feedback">
                            Please enter your shipping address.
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-5 mb-3">
                            <label for="country">Country</label>
                            <select class="custom-select d-block w-100 test" id="country" value="" name="test"
                                required="required">
                                <option value="">Choose...</option>
                                <option>Belgium</option>
                                <option>France</option>
                                <option>Ukraine</option>
                                <option>Poland</option>
                            </select>
                            <div class="invalid-feedback">
                                Please select a valid country.
                            </div>
                        </div>
                        <div class="col-md-3 mb-3">
                            <label for="zip">Code Postal</label>
                            <input type="text" class="form-control test" placeholder="" name="test" required="">
                            <div class="invalid-feedback">
                                Zip code required.
                            </div>
                        </div>
                    </div>

                    <h4 class="mb-3">Payment</h4>

                    <button class="btn btn-primary btn-lg btn-dark" type="submit" id="paypalID"
                        style="margin-bottom : 120px">Pay with Paypal</button>
                </form>

            </div>
          <div id="firstDiv" class="col-md-4 order-md-2 mb-4"></div>
       </div>
       <div id="snackbar"> All fields are required ! </div>
    `;

  if (user === undefined) {
    clearActive();
    Navigate('/login');
  } else {
    clearPage();
    const userEmail = getAuthenticatedUser().email;
    const cart = loadCart(userEmail);
    const total = getCartTotal();
    console.log('Le total est ', total);

    let html2 = `
      
      <div col-md-8 order-md-2 mb-4" style="margin-left : 50px; margin-top : 30px">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="mb-3">Your cart</span>
          <span class="badge badge-secondary badge-pill">3</span>
        </h4>
      <ul class="list-group mb-3" id="listItem">
      
      `;
    console.log('le panier est', cart.objects);

    // eslint-disable-next-line prefer-destructuring
    const length = cart.objects.length;

    for (let i = 0; i < length; i += 1) {
      let totalPriceForThisArticle = 0;
      totalPriceForThisArticle = cart.objects[i].price * cart.objects[i].count;
      html2 += `
      <li class="list-group-item d-flex justify-content-between lh-condensed">
      <div>
        <h6 class="my-0">${cart.objects[i].name}</h6>
      </div>
        <span class="text-muted">${cart.objects[i].price}</span>
        <small class="text-muted">Nombre : ${cart.objects[i].count}</small>
        <small class="text-muted">Total price : ${totalPriceForThisArticle}</small>
      </li>
    `;
    }

    const totalPrice = getCartTotal();
    html2 += `
      <li class="list-group-item d-flex justify-content-between">
        <span>Total Price</span>
        <strong>${totalPrice} €</strong>
      </li>
    </ul>`;

    const main = document.querySelector('main');
    main.innerHTML = html;

    const id = document.getElementById('firstDiv');
    id.innerHTML = html2;

    const paypalBtn = document.getElementById('form');
    paypalBtn.addEventListener('submit', (e) => {
      e.preventDefault();
      const list = document.getElementsByClassName('test');
      let bool = false;
      for (let i = 0; i < list.length; i += 1) {
        if (list[i].value === '') {
          bool = true;
          console.log('Je suis passé', i);
          break;
        }
      }
      if (bool === false) {
        console.log('paypal listener');
        PaypalPage();
      } else {
        renderPopUp();
      }
    });
  }


};

export default CheckoutPage;
