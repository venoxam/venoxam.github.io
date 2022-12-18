import { clearPage } from '../../utils/render';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addItemToCart } from '../../utils/utilsCart';
import Navigate from '../Router/Navigate';
import { getAuthenticatedUser } from '../../utils/auths';
import { clearActive, setActiveLink } from '../../utils/activeLink';
import { setUserIcon } from '../../utils/userIcon';
import Navbar from '../Navbar/Navbar';
import relativeTime from '../../utils/utilsDate';
import ProductLibrary from '../../Domain/ProductLibrary';
import { renderPopUp } from '../../utils/utilsForm';

// Cette page permet l'affichage des données d'un seul produit en cliquant sur un bouton de la homepage

const ProductPage = async () => {
  clearPage();
  setActiveLink('userPage');

  setUserIcon('extUserPage');
  Navbar();
  const main = document.querySelector('main');
  const user = await getAuthenticatedUser();
  // permet d'aller chercher un paramètre dans l'url
  const id = window.location.search;
  const url = id.split('=');
  const product = await ProductLibrary.prototype.getProductById(url[1]);
  const productId = product.id_product;
  const storeName = product.store_name;
  const productName = product.name;
  const productPrice = product.price;
  const productDescription = product.description;
  const storeId = product.id_user;
  const { category } = product;
  const categoryId = product.id_category;

  // html de la page
  const html = `
  <section class="section" id="product">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                <div class="left-images">
                
                </div>
            </div>
            <div class="col-lg-4">
                <div class="right-content">
                  <h3><a href="#" class="text-dark aProductName  textProduct" name="${productId}">${productName}</a></h3>
                    <span class="price"><p class="text-dark">${productPrice}€</p></span>
                    <div id="categoria">
                          <p class="small text-muted"><i class="bi bi-tag-fill"></i> <a href="#!" class="text-dark categoryName textProduct" name="${categoryId}">${category}</a> </p>
                    </div>
                    <p class="small text-muted"><i class="bi bi-shop"> </i> <a href="#!" class="text-dark storeID  textProduct" name="${storeId}">${storeName}</a></p>
                    <div class="quote">
                        <i class="fa fa-quote-left"></i><p>${productDescription}</p>
                    </div>
                    
                </div>
                <div class="card-body pb-0">
                  <div class="d-flex justify-content-between">
                      <div id="cartFeature">
                        
                      </div>
                  </div>
              </div>
            </div>
            </div>
        </div>
    </section>
    <hr class="my-0" />
      <div id="loginStatus">
          
          </div>
          <div id="Reviews">
            
          </div>
          

          `;

  main.innerHTML = html;

  const cat = document.getElementsByClassName('categoryName');
  const lengthCategories = cat.length;
  for (let j = 0; j < lengthCategories; j += 1) {
    cat[j].addEventListener('click', async (e) => {
      e.preventDefault();
      const idcat = cat[j].name;
      // eslint-disable-next-line prefer-template
      clearActive();
      Navigate('/category?=', idcat);
    });
  } // fin for

  // permet le render vers la page du store cliqué
  const shop = document.getElementsByClassName('storeID');
  const lengthShop = shop.length;
  for (let j = 0; j < lengthShop; j += 1) {
    shop[j].addEventListener('click', async (e) => {
      e.preventDefault();
      const idstore = shop[j].name;
      // eslint-disable-next-line prefer-template
      clearActive();
      Navigate('/store?=', idstore);
    });
  } // fin for

  const loginStatus = document.getElementById('loginStatus');

  if (user === undefined) {
    loginStatus.innerHTML += `<p style="font-size:150%;padding:10px" class="text-center">You must be logged in to review this product</p>`;
  } else {
    /* reviewlist.forEach((lareview) => {
      const userReview = lareview.id_user;
      const messageReview = lareview.message;
      reviewshtml.innerHTML += `${userReview} ${messageReview}`;
    }); */
    // Permet d'ajouter le produit dans le panier
    const cartDiv = document.getElementById('cartFeature');
    cartDiv.innerHTML = `
      <button type="button" id="btnAddtoCart" value="${productId}" class="btn btn-success rounded-pill"> <i class="bi bi-cart-plus"></i> </button>
    `;
    const btn = document.getElementById('btnAddtoCart');

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      addItemToCart(productId, product.name, product.price, 1);
    });

    loginStatus.innerHTML += `
    <hr class="my-0" />
    <div class="container-fluid">
      <form action="">
          <label style="font-size:150%;padding:10px" for="description">Give an honest review</label>
          <div id="errorMessage">

          </div>
          <div class="input-group">
              <textarea type="text" class="form-control" placeholder="Enter your review here..." id="reviewMessage" rows="3"></textarea>
              
          </div>
          <div style="padding:10px">
                  <button class="input-group-text btn btn-dark text-white w-100" id="reviewBtn"><i class="bi bi-arrow-return-left"></i>
                  </button>
            </div>
      </form>
    </div>
    `;
    const reviewBtn = document.getElementById('reviewBtn');
    // Ajout d'une review au produit
    reviewBtn.addEventListener('click', (e) => {
      e.preventDefault();

      // Récupération de toute les données avec les id

      const reviewMessage = document.getElementById('reviewMessage').value;
      const errorMessage = document.getElementById('errorMessage');
      if (reviewMessage.length < 1) {
        errorMessage.innerHTML = `<div id="snackbar">You can not send an empty review!</div>`;
        renderPopUp();
      } else if (reviewMessage.length > 500) {
        errorMessage.innerHTML = `<div id="snackbar">Your review is too long, limit is 500 characters!</div>`;
        renderPopUp();
      } else {
        // Création d'un nouvel objet json
        const NewReview = {
          idUser: user.userId,
          message: reviewMessage,
          idProduct: product.id_product,
        };

        ProductLibrary.prototype.postReview(NewReview);
        ProductPage();
      }
    }); // fin eventListener
  } // fin else

  // montre tt les reviews d'un produit
  const reviewshtml = document.getElementById('Reviews');
  const reviewlist = await ProductLibrary.prototype.getReviews(productId);
  console.log(reviewlist, 'le review list');
  if (reviewlist.length === 0) {
    reviewshtml.innerHTML += `<p style="font-size:150%;padding:10px" class="text-center">No reviews on this product yet</p>`;
  } else {
    reviewlist.forEach(async (lareview) => {
      const userFirstNameReview = lareview.first_name;
      const userLastNameReview = lareview.last_name;
      const messageReview = lareview.message;
      const dateReview = relativeTime(lareview.date);
      reviewshtml.innerHTML += `
        <div class="d-flex justify-content-center" style="margin-top:20px">
        <div class="Review">
            <div class="d-flex justify-content-between">
              <p><strong>${userFirstNameReview} ${userLastNameReview}</strong> reviewed this product</p>
              <p>${dateReview}</p>
            </div >
            <div class="reviewText">
                <p>${messageReview}</p>
                
            </div>
        </div>
        </div>
      `;
    });
  } // fin else
}; // fin page


export default ProductPage;
