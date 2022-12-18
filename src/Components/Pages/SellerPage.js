import 'bootstrap/dist/css/bootstrap.min.css';
import Navigate from '../Router/Navigate';
import { clearActive } from '../../utils/activeLink';
import SellerLibrary from '../../Domain/SellerLibrary';
import ProductLibrary from '../../Domain/ProductLibrary';

// Calling the page to render
async function SellerPage(user) {
  if (user === undefined) {
    clearActive();
    Navigate('/login');
  }else {
    const sellerHtml = document.getElementById('sellerThings');
    sellerHtml.innerHTML +=`
      <div class="d-flex justify-content-start">
          <h3>Products you're selling: </h3>
        </div>

        <div class="py-5">
          <div class="row d-flex justify-content" id="imgProduct">

          </div>
      </div>
    `;

    const boutons = document.getElementById('boutons');
    boutons.innerHTML +=`
      <button type="button" id="btnAdd" class="btn btn-success rounded-pill position-relative"><i class="bi bi-plus-lg"></i> Add product</button>
    `;

    const btnAdd = document.getElementById('btnAdd');
    btnAdd.addEventListener('click', async (e) => {
      e.preventDefault();
      clearActive();
      Navigate('/addProduct');
    });
    const btnUpdate = document.getElementById('btnUpdate');
    btnUpdate.addEventListener('click', (e) => {
      e.preventDefault();
      clearActive();
      Navigate('/update');
    });

    const products = await SellerLibrary.prototype.getAllBySeller(user.userId);
    console.log(products, 'ici prodcts')
    ProductLibrary.prototype.showProducts(products);
  } 

}; 




export default SellerPage;
