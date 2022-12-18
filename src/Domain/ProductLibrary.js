/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-cycle
import SearchResultsPage from '../Components/Pages/SearchResultsPage';
import Navigate from '../Components/Router/Navigate';
import { clearActive } from '../utils/activeLink';
import { getAuthenticatedUser, isAuthenticated } from '../utils/auths';
import { addItemToCart, countProductCart } from '../utils/utilsCart';
import { renderPopUp } from '../utils/utilsForm';
import { importAll } from '../utils/utilsImages';
import { setSearch } from '../utils/utilsSearch';

class ProductLibrary {
  // Méthode pour afficher tous les produits de la base de donnée
  async getAll() {
    let product;
    try {
      const options = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const reponse = await fetch(`${process.env.API_BASE_URL}/products/getAll`, options);

      if (!reponse.ok) {
        throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
      }

      product = await reponse.json();
    } catch (err) {
      console.error('error: ', err);
    }
    return product;
  }

  // Fonction pour afficher les 5 derniers produits de la db
  async selectLastProduct() {
    let product;
    try {
      const options = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const reponse = await fetch(`${process.env.API_BASE_URL}/products/selectLastProduct`, options);

      if (!reponse.ok) {
        throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
      }

      product = await reponse.json();
    } catch (err) {
      console.error('error: ', err);
    }
    return product;
  }

  async newProduct() {
    this.getCategories();
    const btn = document.getElementById('addProduct');
    const user = getAuthenticatedUser();

    // Adding the product after pressing the submit button
    btn.addEventListener('click', async (e) => {
      e.preventDefault();

      // Recovery of all data with id
      const productname = document.getElementById('productName').value;
      const description = document.getElementById('description').value;
      const price = document.getElementById('price').value;
      const color = document.getElementById('color').value;

      const idUser = user.userId;

      const selectElement = document.getElementById('categories');
      const idCategory = selectElement.value;

      ;
      console.log(
        'les donnees .value',
        productname.value,
        description.value,
        price.value,
        color.value,
        idUser.value,
        idCategory.value,
      );

      if (
        productname === undefined ||
        description === undefined ||
        price === undefined ||
        color === undefined ||
        idCategory === undefined
      ) {
        console.error('Veuillez compléter tous les champs');
      }

      // Création d'un nouvel objet json
      const NewProduct = {
        productname,
        description,
        price,
        color,
        idUser,
        idCategory,
      };

      try {
        const options = {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          body: JSON.stringify(NewProduct),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const reponse = await fetch(`${process.env.API_BASE_URL}/products/add`, options);

        if (!reponse.ok) {
          throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
        }
        const idProduct = await reponse.json();

        Navigate('/product?id_product=', idProduct);
        /* const user = await reponse.json(); */
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('error: ', err);
      }
    });
  }

  async getCategories() {
    let category;
    try {
      const options = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // category = await fetch('${process.env.API_BASE_URL}/categories/getAllCategories', options);
      category = await fetch(`${process.env.API_BASE_URL}/categories/getAllCategories`, options);

      if (!category.ok) {
        throw new Error(`fetch error : ${category.status}${category.statusText}`);
      }

      category = await category.json();
    } catch (err) {
      console.error('error: ', err);
    }

    const categoryHtml = document.getElementById('categories');
    
    category.forEach((categorie) => {
      const categoryName = categorie.name;
      const categoryId = categorie.id_category;

      categoryHtml.innerHTML += `
         <option value="${categoryId}">${categoryName}</option>
        `;
    });
  }

  async searchBar() {
    const btnSearch = document.getElementById('searchbtn');
    btnSearch.addEventListener('click', async (e) => {
      e.preventDefault();
      // Récupération de toute les données avec les id
      const data = document.getElementById('search').value;

      if (data === undefined) {
        console.error('Search vide, ignorer l action');
      } else {
        try {
          const options = {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.

            headers: {
              'Content-Type': 'application/json',
            },
          };
          );
          // eslint-disable-next-line prefer-template
          const results = await fetch(`${process.env.API_BASE_URL}/products/search/` + data, options);
          const products = await results.json();
          

          setSearch(products);

          if (!results.ok) {
            throw new Error(`fetch error : ${results.status}${results.statusText}`);
          }
          clearActive();
          SearchResultsPage();
          /* const user = await reponse.json(); */
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('error: ', err);
        }
      }
    });
  }

  // Affiche les 5 derniers produits de la base de donnée

  async showProducts(product) {
    const cardProduct = document.getElementById('imgProduct');
    let items = ``;
    let i = 0;
    const user = await isAuthenticated();
    if (!user) {
      while (i < product.length) {
        const imageProduit = importAll(
          require.context('../assets/product', true, /\.png$/),
        );
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
    } else {
      while (i < product.length) {
        const imageProduit = importAll(
          require.context('../assets/product', true, /\.png$/),
        );
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

  async  getAllStoreProducts(id) {
    // Permet d'aller chercher les informations du produit
    let products;
  
    try {
      const options = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      /// const reponse = await fetch(`${process.env.API_BASE_URL}/products/getAllBySeller/` + id, options);
      // eslint-disable-next-line prefer-template
      const reponse = await fetch(`${process.env.API_BASE_URL}/products/getAllBySeller/` + id, options);
  
      if (!reponse.ok) {
        throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
      }
      products = await reponse.json();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('error: ', err);
    }
    return products;
  } // fin function getAllStoreProducts(id)
  

  async getProductById(id) {
    // Permet d'aller chercher les informations du produit
    let product;
  
    try {
      const options = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
      };
      
      // const reponse = await fetch(`${process.env.API_BASE_URL}/products/getIdProduct/` + id, options);
  
      // eslint-disable-next-line prefer-template
      const reponse = await fetch(`${process.env.API_BASE_URL}/products/getIdProduct/` + id, options);
  
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
  
  async postReview(data) {
    let idReview;
    try {
      const options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      // const reponse = await fetch(`${process.env.API_BASE_URL}/products/addReview`, options);
      const reponse = await fetch(`${process.env.API_BASE_URL}/products/addReview`, options);
  
      if (!reponse.ok) {
        throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
      }
      idReview = await reponse.json();
      
      /*  
  
  const path =`'../../assets/product/image${idProduct}.img'`;
  
  fs.appendFile(path,image); 
  */
      /* const user = await reponse.json(); */
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('error: ', err);
    }
    return idReview;
  } // fin function postReview
  
  async getReviews(data) {
    let result;
    try {
      const options = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      // const reponse = await fetch(`${process.env.API_BASE_URL}/products/getReviews/` + data, options);
  
      // eslint-disable-next-line prefer-template
      const reponse = await fetch(`${process.env.API_BASE_URL}/products/getReviews/` + data, options);
  
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

}
export default ProductLibrary;
