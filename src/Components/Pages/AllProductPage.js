import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import { addItemToCart } from '../../utils/utilsCart';
import Navbar from '../Navbar/Navbar';
import { clearPage } from '../../utils/render';
import { setUserIcon } from '../../utils/userIcon';
import { setActiveLink } from '../../utils/activeLink';
import ProductLibrary from '../../Domain/ProductLibrary';

const AllProductPage = async () => {
  clearPage();
  setActiveLink('shopPage');
  setUserIcon('extUserPage');
  Navbar();
  
  const html = `
        <div class="row px-xl-5">
          <p style="font-size:150%" class="text-center">You're viewing all of the products on our store</p>
          <div class="py-2">
              <div class="row justify-content" id="imgProduct">
  
              </div>
          </div>
      </div>
    `;
  const main = document.querySelector('main');
  main.innerHTML = html;

  ProductLibrary.prototype.showProducts(await ProductLibrary.prototype.getAll());
  const btn = document.getElementsByName('btnAddtoCart');

    for (let y = 0; y < btn.length; y += 1) {
      btn[y].addEventListener('click', async (e) => {
        e.preventDefault();
        console.log(btn[y].value);
        addItemToCart(btn[y].value, 5, 1);
        Navbar();
      });
    }
};


export default AllProductPage;
