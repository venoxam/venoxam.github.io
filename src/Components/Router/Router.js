import { clearAuthenticatedUser } from '../../utils/auths';
import { usePathPrefix } from '../../utils/path-prefix';
import Navbar from '../Navbar/Navbar';
import Navigate from './Navigate';
import routes from './routes';

const Router = () => {
  onFrontendLoad();
  onNavBarClick();
  onHistoryChange();
  onFooterClick()
};

function onNavBarClick() {
  const navbarWrapper = document.querySelector('#navbarWrapper');

  navbarWrapper.addEventListener('click', (e) => {
    e.preventDefault();
    const navBarItemClicked = e.target;
    let uri = navBarItemClicked?.dataset?.uri;
    if (!uri) {
      const parent = navBarItemClicked.parentElement;
      uri = parent?.dataset?.uri;
    }
    const componentToRender = routes[uri];
    if (!componentToRender) {
      throw Error(`The ${uri} ressource does not exist.`);
    }
    

    if (componentToRender === '/logout') {
      logout();
    }else{
      componentToRender();
      window.history.pushState({}, '', usePathPrefix(uri));
    }
  });
}


function onFooterClick() {
  const navbarWrapper = document.querySelector('#footerWrapper');

  navbarWrapper.addEventListener('click', (e) => {
    e.preventDefault();
    const navBarItemClicked = e.target;
    let uri = navBarItemClicked?.dataset?.uri;
    if (!uri) {
      const parent = navBarItemClicked.parentElement;
      uri = parent?.dataset?.uri;
    }
    const componentToRender = routes[uri];
    if (!componentToRender) {
      throw Error(`The ${uri} ressource does not exist.`);
    }
    

    if (componentToRender === '/logout') {
      logout();
    }else{
      componentToRender();
      window.history.pushState({}, '', usePathPrefix(uri));
    }
  });
}

function onHistoryChange() {
  window.addEventListener('popstate', () => {
    const uri = window.location.pathname;
    const componentToRender = routes[uri];
    componentToRender();
  });
}

function onFrontendLoad() {
  window.addEventListener('load', () => {
    const uri = window.location.pathname;
    const componentToRender = routes[uri];
    if (!componentToRender) throw Error(`The ${uri} ressource does not exist.`);

    componentToRender();
  });
}

function logout() {
  clearAuthenticatedUser();
  Navbar();
  Navigate('/login');
}

export default Router;
