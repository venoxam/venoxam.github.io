import { setActiveLink } from '../../utils/activeLink';
import { clearPage } from '../../utils/render';
import 'bootstrap/dist/css/bootstrap.min.css';
import logoAsset from '../../assets/image0.png';
import UserLibrary from '../../Domain/UserLibrary';
import Navbar from '../Navbar/Navbar';


const formLogin = `
  
        <div id="snackbar">The email or the password is incorrect !</div>
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
                                            <label class="form-label" for="form2Example11">Email</label>
                                            <input type="email" id="email" class="form-control"
                                                placeholder="Email address" />
                                        </div>

                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form2Example22">Password</label>
                                            <input type="password" id="pwd" class="form-control"
                                                placeholder="Password" />
                                        </div>

                                        <div class="text-center pt-1 mb-5 pb-1">
                                            <button class="btn btn-white btn-block fa-lg gradient-custom-2 mb-3"
                                                id="login" type="button" style="color : white">Login</button>
                                        </div>

                                        <div class="d-flex align-items-center justify-content-center pb-4">
                                            <p class="mb-0 me-2">Don't have an account?</p>
                                            <button type="button" class="btn btn-outline-primary" id="register">Create New</button>
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

const LoginPage = () => {
  clearPage();
  setActiveLink('loginPage');
  Navbar();
  const main = document.querySelector('main');
  main.innerHTML = formLogin;
  UserLibrary.prototype.login();
};
export default LoginPage;
