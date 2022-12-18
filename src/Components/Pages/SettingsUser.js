import UserLibrary from '../../Domain/UserLibrary';
import { setActiveLink } from '../../utils/activeLink';
import { getAuthenticatedUser } from '../../utils/auths';
import { clearPage } from '../../utils/render';
import { setUserIcon } from '../../utils/userIcon';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';

const UpdateUser = () => {
  clearPage();
  setActiveLink('userPage');
  setUserIcon('extUserPage');
  Navbar();
  const user = getAuthenticatedUser();
  if (user === undefined) {
    Navigate('/login');
  } else {
    const html = `
        <form>   
              <div class="row d-flex align-items-end">
                  <p style="font-size:200%">Account informations</p>
                  <div class="col-3 mt-3">
                      <label for="last_name">Lastname: </label>
                      <input type="text" class="form-control" id="last_name" placeholder="Enter your lastname" name="last_name">
                      
                  </div>
                  <div class="col">
                    <button type="submit" class="btn btn-success" id="lastnameBtn" >Save</button>
                  </div>
              </div>
              <div class="row d-flex align-items-end">
                  <div class="col-3 mt-3">
                      <label for="first_name">Firstname: </label>
                      <input type="text" class="form-control" id="first_name" placeholder="Enter your firstname" name="first_name" >
                      
                  </div>
                  <div class="col">
                    <button type="submit" class="btn btn-success" id="firstnameBtn" >Save</button>
                  </div>
              </div>
              <div class="row d-flex align-items-end">
                  <div class="col-3 mt-3">
                      <label for="email">E-mail: </label>
                      <input type="email" class="form-control" id="email" placeholder="Enter your email" name="email">
                      
                  </div>
                  <div class="col">
                    <button type="submit" class="btn btn-success" id="emailBtn" >Save</button>
                  </div>
              </div>
                  <p style="font-size:200%; margin-top:50px">Change password</p>
                  <div class="col-4 mb-3 mt-3">
                      <label for="password">Password</label>
                      <input type="password" class="form-control" id="password" placeholder="Enter new password" name="password">
                  </div>

                  <div class="col-4 mb-3 mt-3">
                      <label for="confpassword">Confirm password</label>
                      <input type="password" class="form-control" id="confpassword" placeholder="Repeat your password" name="confpassword">
                  </div>
                  <button type="submit" class="btn btn-success" id="passwordBtn" >Save</button>
              
              </div>
              
              <div id="message">
              </div>
        </form>
    `;
    const main = document.querySelector('main');
    main.innerHTML = html;

    UserLibrary.prototype.changeFirstName(user);
    UserLibrary.prototype.changeLastName(user);
    UserLibrary.prototype.changeEmail(user);
    UserLibrary.prototype.changePassword(user);
  }
}

export default UpdateUser;
