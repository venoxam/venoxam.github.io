import { clearPage } from '../../utils/render';
import 'bootstrap/dist/css/bootstrap.min.css';
import logoAsset from '../../assets/image0.png';
import UserLibrary from '../../Domain/UserLibrary';
import { setActiveLink } from '../../utils/activeLink';
import Navbar from '../Navbar/Navbar';


// Register form 
const formRegister = `
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-xl-10">
                    <div class="card rounded-3 text-black">
                        <div class="row g-0">
                            <div class="col-lg-6">
                                <div class="card-body p-md-5 mx-md-4">

                                    <div class="text-center">
                                        <img src="${logoAsset}" style="width: 185px;" alt="logo">
                                        
                                    </div>

                                    <form>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="name">Last name</label>
                                            <input type="text" id="nom" class="form-control"
                                                placeholder="Enter your last name..." name="lastname"/>
                                        </div>

                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="name">First name</label>
                                            <input type="text" id="prenom" class="form-control"
                                                placeholder="Enter your first name..." name="firstname"/>
                                        </div>

                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="email">Email</label>
                                            <input type="email" id="email" class="form-control"
                                              placeholder="Enter your e-mail..." name="email"/>
                                        </div>

                                        <div class="form-outline mb-4">
                                            <label for="sex">Sex</label>
                                            </br>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" id="homme" value="option1">
                                                <label class="form-check-label" for="inlineCheckbox1">M</label>
                                            </div>

                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" id="femme" value="option2">
                                                <label class="form-check-label" for="inlineCheckbox2">F</label>
                                            </div>

                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" id="autre" value="option3">
                                                <label class="form-check-label" for="inlineCheckbox3">Don't specify</label>
                                            </div>
                                        </div>

                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form2Example22">Password</label>
                                            <input type="password" id="mdp" class="form-control"
                                                placeholder="Enter your password here..." name="password" />
                                        </div>

                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form2Example22">Confirm Password</label>
                                            <input type="password" id="mdp2" class="form-control"
                                                placeholder="Repeat your password here..." name="password" />
                                        </div>

                                        <div class="text-center pt-1 mb-5 pb-1">
                                            <button class="btn btn-white btn-block fa-lg gradient-custom-2 mb-3"
                                            id="register" type="button" style="color : white">Register</button>
                                        </div>

                                        <div class="d-flex align-items-center justify-content-center pb-4">
                                            <p class="mb-0 me-2">You have an account?</p>
                                            <button type="button" class="btn btn-outline-primary" id="login">Login</button>
                                        </div>
                                    </form>

                                </div>
                            </div>
                            <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
                                <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                                    <h4 class="mb-4">Vinci Store</h4>
                                    <p class="small mb-0">Buy, sell or trade the clothes, shoes and accessories you no
                                        longer wear!
                                        You don't wear it anymore? Sell it!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>           

  `;

const RegisterPage = () => {
  
  clearPage();
  setActiveLink('registerPage');
  Navbar();
  const main = document.querySelector('main');
  main.innerHTML = formRegister;
  // Function register
  UserLibrary.prototype.register();

};

export default RegisterPage;
