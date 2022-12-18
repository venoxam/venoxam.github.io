import { clearPage } from "../../utils/render";


const html = `

<h1>General conditions of use of Vinci Store</h1>
<br/>
<h4>Article 1: Purpose </h4>
<br/>
<p>The purpose of these general terms of use is to provide a legal framework for the use of the Vinci Store 
website and its services</p> 

<p>This contract is concluded between : </p>
<p>The operator of the website, hereinafter referred to as "the publisher</p>

<p> Any natural or legal person wishing to access our site and its services, hereinafter referred to as "the user".</p>

<p>The general conditions of use must be accepted by every User, and access to the site implies acceptance of these conditions</p>
<br/>
<h4>Article 2: Legal notice </h4>
<br/>
<p>For legal entities : </p>

<p>The Vinci Store website is published by the company Vinci Store, SAS with a capital of 100,000 euros, whose registered office is located at Pl. de l'Alma 3, 1200 Woluwe-Saint-Lambert</p>

<p> The company is represented by Maureen Renaux, Victor Morabito, Maxence Van Bockstaele, Pepijn Smeding, Mykhailo Kretsu</p>

<p> For natural persons : </p>

<p> The Vinci Store website is edited by Maureen Renaux, Victor Morabito, Maxence Van Bockstaele, Pepijn Smeding, Mykhailo Kretsu</p>



`


const CGU = () => {
  clearPage();
    const main = document.querySelector('main');
    main.innerHTML = html;
  };
  export default CGU;