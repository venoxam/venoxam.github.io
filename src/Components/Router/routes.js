import HomePage from '../Pages/HomePage';
import RegisterPage from '../Pages/RegisterPage';
import LoginPage from '../Pages/LoginPage';
import Product from '../Pages/Product';
import StatisticPage from '../Pages/StatisticPage';
import NewProductPage from '../Pages/NewProductPage';
import MyCartPage from '../Pages/MyCartPage';
import UserPage from '../Pages/UserPage';
import BecomeSeller from '../Pages/BecomeSeller';
import CheckoutPage from '../Pages/CheckoutPage';
import StorePage from '../Pages/StorePage';
import PaypalPage from '../Pages/Paypal';
import SettingsUser from '../Pages/SettingsUser';
import SearchResultsPage from '../Pages/SearchResultsPage';
import AllProductPage from '../Pages/AllProductPage';
import CategoryPage from '../Pages/CategoryPage';
import SellerPage from '../Pages/SellerPage';

const routes = {
  '/': HomePage,
  '/register': RegisterPage,
  '/login': LoginPage,
  '/product': Product,
  '/stats': StatisticPage,
  '/add': NewProductPage,
  '/logout': '/logout',
  '/cart': MyCartPage,
  '/addProduct': NewProductPage,
  '/user': UserPage,
  '/becomeSeller': BecomeSeller,
  '/checkout': CheckoutPage,
  '/store': StorePage,
  '/paypal': PaypalPage,
  '/settings': SettingsUser,
  '/search':SearchResultsPage,
  '/allProducts': AllProductPage,
  '/category': CategoryPage,
  '/seller': SellerPage,
};

console.log('routes',routes);

export default routes;
