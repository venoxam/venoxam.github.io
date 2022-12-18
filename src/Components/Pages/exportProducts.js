import { clearActive } from '../../utils/activeLink';
import { isAuthenticated } from '../../utils/auths';
import { addItemToCart, countProductCart } from '../../utils/utilsCart';
import { renderPopUp } from '../../utils/utilsForm';
import Navigate from '../Router/Navigate';

// Affiche les 5 derniers produits de la base de donnée

async function showProducts(product) {
  const cardProduct = document.getElementById('imgProduct');
  let items = ``;
  let i = 0;
  const user = await isAuthenticated();
  if (!user) {
    while (i < product.length) {
      const imageProduit = importAll(require.context('../../assets/product', true, /\.png$/));
      const productId = product[i].id_product;
      const productName = product[i].name;
      const productPrice = product[i].price;
      const { category } = product[i];
      const categoryId = product[i].id_category;
      const storeId = product[i].id_user;
      const storeName = product[i].store_name;

      items += `
        <div class="col-md-8 col-lg-6 col-xl-4">
          <div class="card" style="border-radius: 15px;">
              <div class="bg-image hover-overlay ripple ripple-surface ripple-surface-light" data-mdb-ripple-color="light">
                  <img src="${imageProduit[i]}" style="border-top-left-radius: 15px; border-top-right-radius: 15px;" class="img-fluid" alt="Laptop" />
                  <a href="#!">
                      <div class="mask"></div>
                  </a>
              </div>
    
              <div class="card-body pb-0">
                  <div class="d-flex justify-content-between">
                      <div>
                          <h5><a href="#!" class="aProductName text-decoration-none textProduct" name="${productId}">${productName}</a></h5>
                          <p class="small text-muted"><i class="bi bi-shop"> </i><a href="#!" class="text-dark storeID textProduct text-decoration-none" name="${storeId}">${storeName}</a></p>
                      </div>
                      <div id="categoria">
                          <p class="small text-muted"><a href="#!" class="text-dark categoryName textProduct text-decoration-none" name="${categoryId}">${category}</a> <i class="bi bi-tag-fill"></i></p>
                      </div>
                  </div>
              </div>
              <hr class="my-0" />
              <div class="card-body pb-0">
                    <div class="d-flex justify-content-between">
                        <p class="text-dark">${productPrice}€</p>
                    </div>
                </div>
          </div>
      </div>
      `;
      i += 1;
    }
    cardProduct.innerHTML = items;
  }else {
    while (i < product.length) {
      const imageProduit = importAll(require.context('../../assets/product', true, /\.png$/));
      const productId = product[i].id_product;
      const productName = product[i].name;
      const productPrice = product[i].price;
      const { category } = product[i];
      const categoryId = product[i].id_category;
      const storeId = product[i].id_user;
      const storeName = product[i].store_name;

      items += `
    <div class="col-md-8 col-lg-6 col-xl-4">
      <div class="card" style="border-radius: 15px;">
          <div class="bg-image hover-overlay ripple ripple-surface ripple-surface-light" data-mdb-ripple-color="light">
              <img src="${imageProduit[i]}" style="border-top-left-radius: 15px; border-top-right-radius: 15px;" class="img-fluid" alt="Laptop" />
              <a href="#!">
                  <div class="mask"></div>
              </a>
          </div>

          <div class="card-body pb-0">
              <div class="d-flex justify-content-between">
                  <div>
                      <h5><a href="#!" class="aProductName textProduct" name="${productId}">${productName}</a></h5>
                      <p class="small text-muted"><i class="bi bi-shop"> </i><a href="#!" class="text-dark storeID textProduct" name="${storeId}">${storeName}</a></p>
                  </div>
                  <div id="categoria">
                      <p class="small text-muted"><a href="#!" class="text-dark categoryName textProduct" name="${categoryId}">${category}</a> <i class="bi bi-tag-fill"></i></p>
                  </div>
              </div>
          </div>
          <hr class="my-0" />
          <div class="card-body pb-0">
                <div class="d-flex justify-content-between">
                    <p class="text-dark">${productPrice}€</p>
                </div>
            </div>
            <div id="onlyIfLogged">
                <hr class="my-0" />
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center pb-2 mb-1">
                        <div>Add to cart</div>
                        <button type="button" name="btnAddtoCart" value="${productId}" class="btn btn-success rounded-pill"> <i class="bi bi-cart-plus"></i> </button>
                        <div id="snackbar">Product added to your cart!</div>
                    </div>
                </div>
            </div>
      </div>
  </div>
  `;
      i += 1;
    }
    cardProduct.innerHTML = items;
  }

  // permet le render vers la page du product cliqué
  const a = document.getElementsByClassName('aProductName');
  const lengthProducts = a.length;
  for (let j = 0; j < lengthProducts; j += 1) {
    a[j].addEventListener('click', async (e) => {
      e.preventDefault();
      const id = a[j].name;
      // eslint-disable-next-line prefer-template
      clearActive();
      Navigate('/product?=', id);
    });
  } // fin for

  // permet le render vers la page du store cliqué
  const shop = document.getElementsByClassName('storeID');
  const lengthShop = shop.length;
  for (let j = 0; j < lengthShop; j += 1) {
    shop[j].addEventListener('click', async (e) => {
      e.preventDefault();
      const id = shop[j].name;
      console.log('ID STORENAME', id);
      // eslint-disable-next-line prefer-template
      clearActive();
      Navigate('/store?=', id);
    });
  } // fin for

  // permet le render vers la page de la categorie cliqué
  const cat = document.getElementsByClassName('categoryName');
  const lengthCategories = cat.length;
  for (let j = 0; j < lengthCategories; j += 1) {
    cat[j].addEventListener('click', async (e) => {
      e.preventDefault();
      const idcat = cat[j].name;
      console.log('ID CAT', idcat);
      // eslint-disable-next-line prefer-template
      clearActive();
      Navigate('/category?=', idcat);
    });
  } // fin for

  if (!(user === undefined)) {
    // ajout produit aux cart
    const btn = document.getElementsByName('btnAddtoCart');
    for (let y = 0; y < btn.length; y += 1) {
      btn[y].addEventListener('click', async (e) => {
        e.preventDefault();
        renderPopUp();
        addItemToCart(product[y].id_product, product[y].name, product[y].price, 1);
        const nombre = document.getElementById('numberOfArticles');
        const newNombre = countProductCart();
        nombre.innerHTML = newNombre;
      }); // fin listener
    } // fin for
  } // fin if
}

function importAll(r) {
  return r.keys().map(r);
}

export { showProducts, importAll };
