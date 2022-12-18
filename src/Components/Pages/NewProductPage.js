import { clearPage } from '../../utils/render';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigate from '../Router/Navigate';
import { getAuthenticatedUser } from '../../utils/auths';
import { setUserIcon } from '../../utils/userIcon';
import Navbar from '../Navbar/Navbar';
import { setActiveLink } from '../../utils/activeLink';
import ProductLibrary from '../../Domain/ProductLibrary';


const NewProductPage = () => {
  clearPage();
  setActiveLink('userPage');

  setUserIcon('extUserPage');
  Navbar();
  // verifie si l'user s'est login pour acceder à cette page
  const user = getAuthenticatedUser();
  if (user === undefined) {
    Navigate('/login');
  } else {
    clearPage();

    // formulaire NewProduct
    const formNewProduct = `
      <div class="">
          <h2>Add a product</h2>
      </div>
      <form>

              <div class="mb-3 mt-3">
                  <label for="name">Product Name :</label>
                  <input type="text" class="form-control" id="productName" placeholder="Enter the product name"
                      name="productName">
              </div>

              <div class="mb-3 mt-3">
                  <label for="description">Product Description :</label>
                  <textarea class="form-control" id="description" placeholder="Enter the product description" name="description" rows="5"></textarea>
              </div>

              <div class="mb-3 mt-3">
                  <label for="email">Price :</label>
                  <input type="text" class="form-control" id="price" placeholder="Enter the price" name="price">
              </div>

              <div class="mb-3 mt-3">
                  <label for="email">Category :</label>
                  <select id="categories" class="form-select" aria-label="Default select example">
                    <option selected disabled>Choose</option>

                  </select>
              </div>

              <div class="mb-3 mt-3">
                  <label for="color">Color :</label>
                  <input type="color" class="form-control" id="color" placeholder="Enter the color of the product"
                      name="color">
              </div>

              <button type="submit" class="btn btn-success rounded-pill position-relative" id="addProduct"><i class="bi bi-plus-lg"></i> Add</button>
              <div id="snackbar">Product added!</div>
      
      </form>
    `;
    const main = document.querySelector('main');
    main.innerHTML = formNewProduct;
    ProductLibrary.prototype.newProduct();

  }
};

export default NewProductPage;
