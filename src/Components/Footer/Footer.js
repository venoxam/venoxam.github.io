import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () =>{
    const footerWrapper = document.querySelector('#footerWrapper');

    const footer = `
        <!-- Footer -->
            <footer class="page-footer font-small bg-dark text-white pt-4">
            <!-- Footer Links -->
                <div class="container-fluid text-center text-md-left">
                <!-- Grid row -->
                    <div class="row">
                        <!-- Grid column -->
                        <div class="col-md-6 mt-md-0 mt-3">
                            <!-- Content -->
                            <h5 class="text-uppercase">Vinci Store</h5>
                            <p>Buy, sell or trade the clothes, shoes and accessories you no
                            longer wear!</p>
                            <p>You don't wear it anymore? Sell it!</p>
                        </div>
                         <!-- Grid column -->
                        <hr class="clearfix w-100 d-md-none pb-3">
                        <!-- Grid column -->
                        <div class="col-md-3 mb-md-0 mb-3">
                            <!-- Links -->
                            <h5 class="text-uppercase">Links</h5>

                                <ul class="list-unstyled">
                                    <li>
                                        <a href="#" class="nav-item nav-link lienFooter" data-uri="/"><i class="bi bi-house-door"></i> Home</a>
                                    </li>
                                    <li>
                                        <a href="#" class="nav-item nav-link lienFooter" data-uri="/login"><i class="bi bi-box-arrow-in-right"></i> Sign-in</a>
                                    </li>
                                    <li>
                                        <a href="#" class="nav-item nav-link lienFooter" data-uri="/register"><i class="bi bi-person-plus"></i> Sign-up</a>
                                    </li>
                                    <li>
                                        <a href="#" class="nav-item nav-link lienFooter" data-uri="/allProducts"><i class="bi bi-shop"></i> Shop</a>
                                    </li>
                                </ul>
                        </div>
                        <div class="col-md-3 mb-md-0 mb-3">
                            <h5 class="text-uppercase">General conditions of use</h5>
                                <ul class="list-unstyled">
                                    <li>
                                        <a href="#" class="nav-item nav-link lienFooter" data-uri="/cgu">CGU</a>
                                    </li>
                                </ul>
                        </div>
                        <!-- Grid column -->
                    </div>
                    <!-- Grid row -->
                </div>
                <!-- Footer Links -->

                <!-- Copyright -->
                <div class="footer-copyright text-center py-3">©2022 Copyright:
                    <a href="/" class="lienFooter"> VinciStore.com</a>
                </div>
                <!-- Copyright -->

        </footer>
        <!-- Footer -->
    `
    footerWrapper.innerHTML = footer;

}

export default Footer;