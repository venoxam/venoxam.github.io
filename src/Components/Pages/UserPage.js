import { clearPage } from '../../utils/render';
import 'bootstrap';
import Navigate from '../Router/Navigate';
import { getAuthenticatedUser } from '../../utils/auths';
import 'animate.css';
import { clearActive, setActiveLink } from '../../utils/activeLink';
import { setUserIcon } from '../../utils/userIcon';
import Navbar from '../Navbar/Navbar';
import SellerPage from './SellerPage';

/* let unUSEDhtml =`<div class="col-md-8 col-lg-6 col-xl-4">
<div class="card" style="border-radius: 15px;">
    <div class="bg-image hover-overlay ripple ripple-surface ripple-surface-light" data-mdb-ripple-color="light">
        <a href="#!">
            <div class="mask"></div>
        </a>
    </div>

    <div class="card-body pb-0">
        <div class="d-flex justify-content-between">
            <div>
                <p><a href="#!" class="text-dark aProductName" name="${id}">${nameProduct}</a></p>
                <p class="small text-muted">by ${storeName}</p>
            </div>
            <div>
                <p class="small text-muted"><a href="#" class="text-dark">${category}</a></p>
            </div>
        </div>
    </div>
    <hr class="my-0" />
    <div class="card-body pb-0">
        <div class="d-flex justify-content-between">
            <p class="text-dark">${priceProduct}€</p>
        </div>
    </div>
    <hr class="my-0" />
    <div class="card-body">
        <div class="d-flex justify-content-between align-items-center pb-2 mb-1">
            <a href="#!" class="text-dark fw-bold">Cancel</a>
            <button type="button" name="btnAddtoCart" value="${id}" class="btn btn-primary">Add to cart</button>
        </div>
    </div>
</div>
</div>`; */

const UserPage = async () => {
  clearPage();
  setActiveLink('userPage');
  setUserIcon('userPage');
  Navbar();
  const user = await getAuthenticatedUser();
  console.log(user,'dans la user page')
  const seller = await isSeller(user.userId);
  if (user === null) {
    clearActive();
    Navigate('/login');
  } else {// elements commun aux 2 pages seller et user
    // eslint-disable-next-line
    const main = document.querySelector('main');
    // eslint-disable-next-line no-unused-vars
    main.innerHTML += `
      <div class="d-flex justify-content-between">
        <div class="d-flex justify-content-start col">
          <div>
            <h1 class="display-6" id="nomUser">
              <i class="bi bi-person-fill"></i> 
            </h1>
          </div>
        </div>
        <div id="boutons" class="d-flex flex-row-reverse col-4 p-3 justify-content-evenly">
            <button type="button" id="btnUpdate" class="btn btn-outline-secondary rounded-pill position-relative"><i class="bi bi-gear-fill"></i> Edit your profile</button>
        </div>
        
      </div>
        <div id="sellerThings">
        
        </div>
      </div>

    `;
    const id = document.getElementById('nomUser');
    id.innerHTML += `${user.firstName} ${user.lastName}`;
    // verifie si l'user s'est login pour acceder à cette page
    if (seller !== null) {
      SellerPage(user);
    } else {
      const boutons = document.getElementById('boutons');
      boutons.innerHTML += `
        <button type="button" id="btnSeller"class="btn btn-success rounded-pill position-relative"><i class="bi bi-shop"></i> Start selling!</button>
      `;
      const btn = document.getElementById('btnSeller');
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        clearActive();
        Navigate('/becomeSeller');
      });

      
    } // fin else

    const btn = document.getElementById('btnUpdate');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      clearActive();
      Navigate('/settings');
    });
  }
};

async function isSeller(id) {
  let result;
  console.log('saluuuut', id);
  try {
    const options = {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // eslint-disable-next-line prefer-template
    // const reponse = await fetch(`${process.env.API_BASE_URL}/api/users/getIdStore/` + id, options);
    // eslint-disable-next-line prefer-template
    const reponse = await fetch(`/api/users/getIdStore/` + id, options);

    if (!reponse.ok) {
      throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
    }
    result = await reponse.json();
    console.log('RESSULT', result);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('error: ', err);
  }
  return result;
}

export default UserPage;
