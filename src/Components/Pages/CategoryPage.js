/* eslint-disable no-console */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import { clearPage } from '../../utils/render';
import { clearActive } from '../../utils/activeLink';
import { setUserIcon } from '../../utils/userIcon';
import Navbar from '../Navbar/Navbar';
import CategoryLibrary from '../../Domain/CategoryLibrary';
import ProductLibrary from '../../Domain/ProductLibrary';


// HTML CODE
const html = `
    <div id="titleCategory" class="d-flex justify-content-center align-items-center" style="margin-bottom:40px">
    </div>
    <div class="row justify-content" id="imgProduct">
      
    </div>
  `;

const CategoryPage = async () => {
  clearPage();
  clearActive();
  setUserIcon('extUserPage');
  Navbar();
  const main = document.querySelector('main');
  main.innerHTML = html;
  const id = window.location.search;
  const url = id.split('=');
  const results = await CategoryLibrary.prototype.listbyCategorie(url[1]);
  const category = await CategoryLibrary.prototype.getCategorie(url[1]);

  const titleCategory = document.getElementById('titleCategory');
  titleCategory.innerHTML = `
    <h2>Category: ${category.name}</h2>
  `;
  ProductLibrary.prototype.showProducts(results);
};

export default CategoryPage;

