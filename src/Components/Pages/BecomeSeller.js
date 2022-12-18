import { clearPage } from '../../utils/render';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuthenticatedUser } from '../../utils/auths';
import Navigate from '../Router/Navigate';
import { clearActive, setActiveLink } from '../../utils/activeLink';
import { setUserIcon } from '../../utils/userIcon';
import Navbar from '../Navbar/Navbar';
import UserLibrary from '../../Domain/UserLibrary';

const html = `
<form style="margin-top:30px">
            <h2>Store</h2>
            <div class="mb-3 mt-3">
                <label for="name">Name your store!</label>
                <input type="text" class="form-control" id="storename" placeholder="Enter the name of your store..."
                    name="storename">
            </div>
            <div>
                <h4>Adress</h4>
                <div class="mb-3 mt-3">
                    <label for="name">Country</label>
                    <input type="text" class="form-control" id="country" placeholder="Enter the country you live in..."
                        name="country">
                </div>

                <div class="mb-3 mt-3">
                    <label for="email">City</label>
                    <input type="email" class="form-control" id="city" placeholder="Enter the city you live in..."
                        name="city">
                </div>

                <div class="mb-3 mt-3">
                    <label for="email">Zip Code</label>
                    <input type="email" class="form-control" id="zipcode"
                        placeholder="Enter your postal code (Zip Code)..." name="zipcode">
                </div>

                <div class="mb-3 mt-3">
                    <label for="email">Street</label>
                    <input type="email" class="form-control" id="street" placeholder="Enter the street you live on..."
                        name="street">
                </div>

                <div class="mb-3 mt-3">
                    <label for="email">Building code</label>
                    <input type="email" class="form-control" id="buildingcode"
                        placeholder="Enter your building's numeric code..." name="buildingcode">
                </div>
            </div>
            <button type="submit" class="btn btn-primary" id="sell">Start selling!</button>
    </form>
`;

const BecomeSeller = () => {
  clearPage();
  setActiveLink('userPage');

  setUserIcon('extUserPage');
  Navbar();
  // verifie si l'user s'est login pour acceder à cette page
  const user = getAuthenticatedUser();
  if (user === undefined) {
    console.log('3');
    clearActive();
    Navigate('/login');
  } else {
    console.log('4');
    clearPage();
    const main = document.querySelector('main');
    main.innerHTML = html;
    console.log('5');
    
    UserLibrary.prototype.becomeSeller(user);
  }
};

export default BecomeSeller;
