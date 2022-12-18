/* eslint-disable prefer-destructuring */
import { setActiveLink } from '../../utils/activeLink';
import { getAuthenticatedUser } from '../../utils/auths';
import { clearPage } from '../../utils/render';
import { setUserIcon } from '../../utils/userIcon';
import { countProductCart, getCartTotal, loadCart, removeItemFromCart } from '../../utils/utilsCart';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';

// HTML 
const html = `
    <div class="col-md-4 order-md-2 mb-4 mx-auto" style="margin-top: 5%">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">Your cart</span>
            <span class="badge badge-secondary badge-pill">3</span>
        </h4>
        <ul class="list-group mb-3" id="listItem">
  
  </ul>
  <button type="button" class="btn btn-success btn-lg" id="checkoutButton"><i class="bi bi-cart-check"></i> Checkout</button>
</div>
`;

const MyCartPage = () => {
  // si la session contient un panier, afficher un bouton pour le supprimer (Ceci sert uniquepent de test de localStorage)
  clearPage();
  setActiveLink('userPage');

  setUserIcon('extUserPage');
  Navbar();
  const userEmail = getAuthenticatedUser().email;
  const cart = loadCart(userEmail);
  const main = document.querySelector('main');
  if (cart.objects.length === 0) {
    main.innerHTML = `<h1 class="cover-heading  " style="margin-top : 200px; text-align : center">
                        Votre panier est vide &#128524
                      </h1>`;
  } else {
    main.innerHTML = html;
    let html2 = ``;

    console.log('le panier est', cart.objects);

  
    const length = cart.objects.length;
    const id = document.getElementById('listItem');
    console.log('lenght : ', length);
    for (let i = 0; i < length; i += 1) {
      let totalPriceForThisArticle = 0;
      totalPriceForThisArticle = cart.objects[i].price * cart.objects[i].count;
      html2 += `
        <li class="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <a href="#" class="buttonToItem textProduct" class="my-0">${cart.objects[i].name}</a>
        </div>
        <span class="text-muted">${cart.objects[i].price}€</span>
        <small class="text-muted">Quantity : ${cart.objects[i].count}</small>
        <small class="text-muted">Total : ${totalPriceForThisArticle}€</small>
        <button type="button" class="deleteArticleButton btn btn-light"><i class="bi bi-cart-dash"></i> Cancel</button>
        </li>
`;
    }

    const totalPrice = getCartTotal();
    html2 += `<li class="list-group-item d-flex justify-content-between">
<span>Total Price</span>
<strong>${totalPrice} €</strong>
</li>`;

    id.innerHTML = html2;

    const btnToArticle = document.getElementsByClassName('buttonToItem');
    for (let y = 0; y < btnToArticle.length; y += 1) {
    
      btnToArticle[y].addEventListener('click', async (e) => {
        e.preventDefault();
        console.log('Je suis dans le event listener');
        
        Navigate('/product?id_product=', cart.objects[y].id);
      });
    }

    const btn = document.getElementsByClassName('deleteArticleButton');
    for (let y = 0; y < btn.length; y += 1) {
      
      btn[y].addEventListener('click', async (e) => {
        e.preventDefault();
        console.log('Je suis dans le event listener');

        
        removeItemFromCart(cart.objects[y].name);
        const nombre = document.getElementById('numberOfArticles');
        const newNombre = countProductCart();
        nombre.innerHTML = newNombre;
        MyCartPage();
      });
    }
    const btnCheckout = document.getElementById('checkoutButton');
    btnCheckout.addEventListener('click', (e) => {
      e.preventDefault();
      

      

      MyCartPage();
      Navigate('/checkout');
    });
  }
};

export default MyCartPage;
