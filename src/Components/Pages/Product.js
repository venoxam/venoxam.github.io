import { clearPage } from '../../utils/render';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addItemToCart } from '../../utils/utilsCart';
import Navigate from '../Router/Navigate';
import { getAuthenticatedUser } from '../../utils/auths';
import { clearActive, setActiveLink } from '../../utils/activeLink';
import { setUserIcon } from '../../utils/userIcon';
import Navbar from '../Navbar/Navbar';

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
  const product = await getProductById(url[1]);
  const productId = product.id_product;
  
  const storeName = product.store_name
  const productName = product.name;
  const productPrice = product.price;
  const productDescription = product.description;
  const storeId = product.id_user;
  const { category } = product;
  const categoryId = product.id_category;
  

  // html de la page
  const html = `
  <div class="row" style="margin-top:30px">
            <div class="col-md-2 order-md-1">
              <div class="bg-image hover-overlay ripple ripple-surface ripple-surface-light"
                  data-mdb-ripple-color="light">
                  <img src="INSERER imageUrl ici apres" style="border-top-left-radius: 15px; border-top-right-radius: 15px;"
                      class="img-fluid" alt="Laptop" />
                  <a href="#!">
                      <div class="mask"></div>
                  </a>
              </div>
              </div>
              </div>
              <div class="row" style="margin-top:30px">
            <div class="col-md-2 order-md-2">
              <div class="card-body pb-0">
                  <div class="d-flex justify-content-between">
                      <div>
                          <p><a href="#!" class="text-dark aProductName" name="${productId}">${productName}</a></p>
                          <p class="small text-muted"><a href="#!" class="text-dark storeID" name="${storeId}">by ${storeName}</a></p>
                      </div>
                      <div id="categoria">
                          <p class="small text-muted"><a href="#!" class="text-dark categoryName" name="${categoryId}">${category}</a></p>
                      </div>
                  </div>
              </div>
              <hr class="my-0" />
              <div class="card-body pb-0">
                  <div class="d-flex justify-content-between">
                      <p class="text-dark">${productPrice}€</p>
                  </div>
              </div>
              <div class="card-body pb-0">
                  <div class="d-flex justify-content-between">
                      <p class="text-dark">${productDescription}</p>
                      <div id="cartFeature">
                        
                      </div>
                  </div>
              </div>
              
              </div>
              </div>
          

  <section class="section" id="product">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                <div class="left-images">
                    
                </div>
            </div>
            <div class="col-lg-4">
                <div class="right-content">
                  <h3><a href="#" class="text-dark aProductName" name="${productId}">${productName}</a></h3>
                    <span class="price"><p class="text-dark">${productPrice}€</p></span>
                    <div id="categoria">
                          <p class="small text-muted"><a href="#!" class="text-dark categoryName" name="${categoryId}">${category}</a></p>
                    </div>
                    <p class="small text-muted"><a href="#!" class="text-dark storeID" name="${storeId}">Store Name : ${storeName}</a></p>
                    <div class="quote">
                        <i class="fa fa-quote-left"></i><p>${productDescription}</p>
                    </div>
                    <div class="total">
                    <h4>ADD TO CART</h4>
                    <button type="button" name="btnAddtoCart" value="${productId}" class="btn btn-dark"><i class="bi bi-cart-plus"></i></button>
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

  const loginStatus = document.getElementById('loginStatus');

  if (user === undefined) {
    loginStatus.innerHTML += `<p>You must be logged in to review this product</p>`;
  } else {
    /* reviewlist.forEach((lareview) => {
      const userReview = lareview.id_user;
      const messageReview = lareview.message;
      reviewshtml.innerHTML += `${userReview} ${messageReview}`;
    }); */
    // Permet d'ajouter le produit dans le panier
    const cartDiv = document.getElementById('cartFeature');
    cartDiv.innerHTML = `
      <button type="button" id="btnAddtoCart" value="${productId}" class="btn btn-dark"><i class="bi bi-cart-plus"></i></button>
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
          <label for="description">Give an honest review</label>
          <div id="errorMessage">

          </div>
          <div class="input-group">
              <textarea type="text" class="form-control" placeholder="Enter your review here..." id="reviewMessage" rows="3"></textarea>
              <div class="input-group-append">
                  <button class="input-group-text btn btn-dark text-white" id="reviewBtn"><i class="bi bi-arrow-return-left"></i>
                  </button>
              </div>
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
        errorMessage.innerHTML += `<p class="alert"><i class="bi bi-exclamation-circle-fill"></i> You can not post and empty review!</p>`;
      }

      // Création d'un nouvel objet json
      const NewReview = {
        idUser: user.userId,
        message: reviewMessage,
        idProduct: product.id_product,
      };

      postReview(NewReview);
      ProductPage();
    }); // fin eventListener
  } // fin else

  // montre tt les reviews d'un produit
  const reviewshtml = document.getElementById('Reviews');
  const reviewlist = await getReviews(productId);
  console.log(reviewlist, 'le review list');
  if (reviewlist.length === 0) {
    reviewshtml.innerHTML += `<p>No reviews on this product yet</p>`;
  } else {
    reviewlist.forEach(async (lareview) => {
      const userFirstNameReview = lareview.first_name;
      const userLastNameReview = lareview.last_name;
      const messageReview = lareview.message;
      const dateReview = lareview.date;
      reviewshtml.innerHTML += `
        
        <div>
          <p>${userFirstNameReview} ${userLastNameReview}</p>
          <p>${messageReview}</p>
          <p>${dateReview}</p>
        </div>
      `;
    });
  } // fin else
}; // fin page

async function getProductById(id) {
  // Permet d'aller chercher les informations du produit
  let product;

  try {
    const options = {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log('TEST ', id);
    // const reponse = await fetch(`${process.env.API_BASE_URL}/api/products/getIdProduct/` + id, options);

    // eslint-disable-next-line prefer-template
    const reponse = await fetch(`/api/products/getIdProduct/` + id, options);

    product = await reponse.json();
    if (!reponse.ok) {
      throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('error: ', err.message);
  }
  return product;
}

async function postReview(data) {
  let idReview;
  try {
    const options = {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // const reponse = await fetch(`${process.env.API_BASE_URL}/api/products/addReview`, options);
    const reponse = await fetch(`/api/products/addReview`, options);

    if (!reponse.ok) {
      throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
    }
    idReview = await reponse.json();
    console.log(idReview);
    /*  
console.log("id ::::::", idProduct);
const path =`'../../assets/product/image${idProduct}.img'`;
console.log("le path pour nouveau file::",path);
fs.appendFile(path,image); 
*/
    /* const user = await reponse.json(); */
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('error: ', err);
  }
  return idReview;
} // fin function postReview

async function getReviews(data) {
  let result;
  try {
    const options = {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // const reponse = await fetch(`${process.env.API_BASE_URL}/api/products/getReviews/` + data, options);
    
    // eslint-disable-next-line prefer-template
    const reponse = await fetch(`/api/products/getReviews/` + data, options);

    if (!reponse.ok) {
      throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
    }
    result = await reponse.json();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('error: ', err);
  }
  return result;
} // fin function getReviews

export default ProductPage;
