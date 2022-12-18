/* eslint-disable no-console */
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductLibrary from '../../Domain/ProductLibrary';
import SellerLibrary from '../../Domain/SellerLibrary';
import { setActiveLink } from '../../utils/activeLink';
import { clearPage } from '../../utils/render';
import { setUserIcon } from '../../utils/userIcon';
import Navbar from '../Navbar/Navbar';

const StorePage = async () => {
  clearPage();
  setActiveLink('userPage');

  setUserIcon('extUserPage');
  Navbar();
  const main = document.querySelector('main');

  // permet d'aller chercher un paramètre dans l'url
  const id = window.location.search;
  const url = id.split('=');
  const store = await SellerLibrary.prototype.getStoreById(url[1]);
  if (store === null) {
    const error = `<h1>404 Store Not Found</h1>`;
    main.innerHTML += `${error}`;
  } else {
    const idStore = store[0].id_user;
    const storeName = store[0].store_name;
    const firstName = store[0].first_name;
    const lastName = store[0].last_name;
    const { email } = store[0];
    const profile = `
        <div class="row">
            <div class="col" id="firstCol">
                <div class="placementImage ">
                    <div class="imageStore d-flex justify-content-center align-items-center">
                      no profile picture
                    </div>
                    
                </div>
            </div>

            <div id="firstDiv" class ="col order-md-2 mb-4">
                <div class="mx-auto">
                    <h2 class="display-6"><i class="bi bi-shop"></i> ${storeName}</h2>
                    <p style="font-size:150%">by ${firstName} ${lastName}</p>
                    <p><i class="bi bi-envelope-fill"></i> ${email}</p>
                </div>
            </div>
        </div>
        <hr/>
        <p style="font-size:150%">Products catalog: </p>
        <div class="allStoreProducts" id="imgProduct">
        
        </div>
    `;
    main.innerHTML = profile;
    const products =await  ProductLibrary.prototype.getAllStoreProducts(idStore);
    const resultStatus = document.getElementById('products');
    if (products.length === 0) {
      resultStatus.innerHTML += `<p>This store doesn't have any products to sell yet</p>`;
    } else {
      ProductLibrary.prototype.showProducts(products);
    } // fin else
  } // fin else
}; // fin page


export default StorePage;
