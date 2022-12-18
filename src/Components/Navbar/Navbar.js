// eslint-disable-next-line no-unused-vars
import { Navbar as BootstrapNavbar } from 'bootstrap';
import logoAsset from '../../assets/image0.png';
import 'animate.css';
import { getAuthenticatedUser } from '../../utils/auths';
// eslint-disable-next-line import/no-cycle
import ProductLibrary from '../../Domain/ProductLibrary';
import Navigate from '../Router/Navigate';
import { countProductCart } from '../../utils/utilsCart';
import { clearPage } from '../../utils/render';
import { clearActive, getActiveLink } from '../../utils/activeLink';
import { getUserIcon } from '../../utils/userIcon';
import CategoryLibrary from '../../Domain/CategoryLibrary';

/**
 * Render the Navbar which is styled by using Bootstrap
 * Each item in the Navbar is tightly coupled with the Router configuration :
 * - the URI associated to a page shall be given in the attribute "data-uri" of the Navbar
 * - the router will show the Page associated to this URI when the user click on a nav-link
 */

const Navbar = async () => {
  clearPage();
  const navbarWrapper = document.querySelector('#navbarWrapper');
  const user = getAuthenticatedUser();
  const active = getActiveLink();
  const userIcon = getUserIcon();

  if (user === undefined) {
    const navbar = `
    <div class="row align-items-center py-3 px-xl-5">
        <div class="col-lg-3 d-none d-lg-block">
            <a href="#" data-uri="/" class="text-decoration-none">
              <h1 class="m-0 display-5 font-weight-semi-bold text-black">Vinci Store
                  <img alt="Logo" src=${logoAsset} height=80 width=80>
              </h1>
            </a>
        </div>
        <div class="col-lg-6 col-6 text-left">
            <form action="">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search for products" id="search">
                    <div class="input-group-append">
                        <button class="input-group-text bg-transparent  loupe" id="searchbtn">
                            <i class="bi bi-search"></i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
        <nav class="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
            
            <div class="collapse navbar-collapse justify-content-around" id="navbarCollapse">
                
                <div class="navbar-nav mr-auto py-0">
                    <div class="dropdown">
                      <a class="btn btn-secondary" href="#" role="button"  data-bs-toggle="dropdown" aria-expanded="false">Categories</a>
                        <ul class="dropdown-menu" id="btnCategory">
                    

                        </ul>
                    </div>
                    <div id="homePage">

                    </div>
                    <div id="shopPage">

                    </div>
                </div>
                <div class="navbar-nav ml-auto py-0">
                    <div id="loginPage">
                        
                    </div>
                    <div id="registerPage">
                        
                    </div>
                </div>
            </div>
        </nav>
    
    `;
    navbarWrapper.innerHTML = navbar;

    if (active === 'homePage') {
      // active home
      const activeD = document.getElementById('homePage');
      activeD.innerHTML += `
          <a href="#" class="nav-item nav-link active" data-uri="/"><i class="bi bi-house-door"></i> Home</a>
        `;
    }
    if (active !== 'homePage') {
      // inactive home
      const activeD = document.getElementById('homePage');
      activeD.innerHTML += `
          <a href="#" class="nav-item nav-link" data-uri="/"><i class="bi bi-house-door"></i> Home</a>
      `;
    }
    if (active === 'loginPage') {
      // active login
      const activeD = document.getElementById('loginPage');
      activeD.innerHTML += `
          <a href="#" class="nav-item nav-link active" data-uri="/login"><i class="bi bi-box-arrow-in-right"></i> Sign-in</a>
      `;
    }
    if (active !== 'loginPage') {
      // inactive login
      const activeD = document.getElementById('loginPage');
      activeD.innerHTML += `
          <a href="#" class="nav-item nav-link" data-uri="/login"><i class="bi bi-box-arrow-in-right"></i> Sign-in</a>
      `;
    }
    if (active === 'registerPage') {
      // inactive register
      const activeD = document.getElementById('registerPage');
      activeD.innerHTML += `
          <a href="#" class="nav-item nav-link active" data-uri="/register"><i class="bi bi-person-plus"></i> Sign-up</a>
      `;
    }
    if (active !== 'registerPage') {
      // inactive register
      const activeD = document.getElementById('registerPage');
      activeD.innerHTML += `
          <a href="#" class="nav-item nav-link" data-uri="/register"><i class="bi bi-person-plus"></i> Sign-up</a>
      `;
    }
    if (active === 'shopPage') {
      // inactive shop
      const activeD = document.getElementById('shopPage');
      activeD.innerHTML += `
          <a href="#" class="nav-item nav-link active" data-uri="/allProducts"><i class="bi bi-shop"></i> Shop</a>
      `;
    }
    if (active !== 'shopPage') {
      // inactive shop
      const activeD = document.getElementById('shopPage');
      activeD.innerHTML += `
          <a href="#" class="nav-item nav-link" data-uri="/allProducts"><i class="bi bi-shop"></i> Shop</a>
      `;
    }

    const allCategories = await CategoryLibrary.prototype.getAllCategories();
    categoriesNavbar(allCategories);
    ProductLibrary.prototype.searchBar();
  } else {
    const totalProduct = countProductCart();

    const navbar = `
    <div class="row align-items-center py-3 px-xl-5">
        <div class="col-lg-3 d-none d-lg-block">
            <a href="#" data-uri="/" class="text-decoration-none">
              <h1 class="m-0 display-5 font-weight-semi-bold text-black">Vinci Store 
                <img alt="Logo" src=${logoAsset} height=80 width=80>
              </h1>
            </a>
        </div>
        <div class="col-lg-6 col-6 text-left">
            <form action="">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search for products" id="search">
                    <div class="input-group-append">
                        <button class="input-group-text bg-transparent  loupe" id="searchbtn">
                            <i class="bi bi-search"></i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <div class="col-lg-3 col-6 text-right">
            <a href="#" class="btn border loupe animate__animated animate__bounceIn" data-uri="/cart">
                <i class="bi bi-cart"></i>
                <span id="numberOfArticles">${totalProduct}</span>
            </a>
        </div>

    </div>

        <nav class="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
            
            <div class="collapse navbar-collapse justify-content-around" id="navbarCollapse">
            
                <div class="navbar-nav mr-auto py-0">
                    <div class="dropdown">
                      <a class="btn btn-secondary" href="#" role="button"  data-bs-toggle="dropdown" aria-expanded="false">Categories</a>
                      <ul class="dropdown-menu" id="btnCategory">
                      

                      </ul>
                    </div>
                    <div id="homePage">
                        
                    </div>
                    <div id="shopPage">
                        
                    </div>
                </div>
                <div class="navbar-nav ml-auto py-0">
                    <div id="statisticPage">
                        
                    </div>
                    <div id="userPage">
                        
                    </div>
                    <div id="extUserPage">

                    </div>
                    <a href="#" class="nav-item nav-link" data-uri="/logout"><i class="bi bi-box-arrow-right"></i> Logout</a>
                </div>
            </div>
        </nav>
       
  `;
    navbarWrapper.innerHTML = navbar;

    if (active === 'homePage') {
      // active home
      const activeD = document.getElementById('homePage');
      activeD.innerHTML += `
          <a href="#" class="nav-item nav-link active" data-uri="/"><i class="bi bi-house-door"></i> Home</a>
        `;
    }
    if (active !== 'homePage') {
      // inactive home
      const activeD = document.getElementById('homePage');
      activeD.innerHTML += `
          <a href="#" class="nav-item nav-link" data-uri="/"><i class="bi bi-house-door"></i> Home</a>
      `;
    }

    // icon thing
    if (userIcon === 'userPage') {
      // active user
      const activeD = document.getElementById('userPage');
      activeD.innerHTML += `
          <a id="user" class="nav-item nav-link active"><i class="bi bi-person-fill"></i></a>
      `;
    } else if (userIcon === 'extUserPage') {
      // inactive extern user
      const activeD = document.getElementById('userPage');
      activeD.innerHTML += `
          <a id="user" class="nav-item nav-link"><i class="bi bi-person"></i></a>
      `;
    }

    // adds to icon thing
    if (active === 'userPage') {
      // active user
      const activeD = document.getElementById('user');
      activeD.classList.add('active');
    }

    if (active === 'statisticPage') {
      // active insights
      const activeD = document.getElementById('statisticPage');
      activeD.innerHTML += `
          <a href="#" class="nav-item nav-link active" data-uri="/stats"><i class="bi bi-graph-up"></i> Your Insights</a>
      `;
    }
    if (active !== 'statisticPage') {
      // inactive insights
      const activeD = document.getElementById('statisticPage');
      activeD.innerHTML += `
          <a href="#" class="nav-item nav-link" data-uri="/stats"><i class="bi bi-graph-up"></i> Your Insights</a>
      `;
    }
    if (active === 'shopPage') {
      // inactive shop
      const activeD = document.getElementById('shopPage');
      activeD.innerHTML += `
          <a href="#" class="nav-item nav-link active" data-uri="/allProducts"><i class="bi bi-shop"></i> Shop</a>
      `;
    }
    if (active !== 'shopPage') {
      // inactive shop
      const activeD = document.getElementById('shopPage');
      activeD.innerHTML += `
          <a href="#" class="nav-item nav-link" data-uri="/allProducts"><i class="bi bi-shop"></i> Shop</a>
      `;
    }
    const allCategories = await CategoryLibrary.prototype.getAllCategories();
    categoriesNavbar(allCategories);
    ProductLibrary.prototype.searchBar();

    const userBtn = document.getElementById('user');
    userBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      clearActive();
      Navigate('/user?=', user.userId);
    });
  }
};

async function categoriesNavbar(allCategories) {
  const btnCategory = document.getElementById('btnCategory');
  btnCategory.addEventListener('click', async (e) => {
    e.preventDefault();
    btnCategory.innerHTML = ``;
    allCategories.forEach((element) => {
      const nameCat = element.name;
      const categoryId = element.id_category;

      btnCategory.innerHTML += `
      <li><a class="dropdown-item categoryName textProduct" id="categoryNam" href="#" name="${categoryId}">${nameCat}</a></li>
      `;

    });
    const cat = document.getElementById('categoryNam');
    cat.addEventListener('click', async (k) => {
      k.preventDefault();
      const idcat = cat.name;
      // eslint-disable-next-line prefer-template
      Navigate('/category?=', idcat);
    });
  });
}
export default Navbar;
