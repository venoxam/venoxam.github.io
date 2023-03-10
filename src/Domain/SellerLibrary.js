/* eslint-disable class-methods-use-this */

class SellerLibrary {
  async getAllBySeller(idSeller) {
    let products;

    try {
      const options = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
      };
      // eslint-disable-next-line prefer-template
      // const reponse = await fetch(`${process.env.API_BASE_URL}/products/getAllBySeller/` + idSeller,options);
      // eslint-disable-next-line prefer-template
      const reponse = await fetch(`${process.env.API_BASE_URL}/products/getAllBySeller/` + idSeller, options);
      
      if (!reponse.ok) {
        throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
      }
      products = await reponse.json();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('error: ', err);
    }
    
    return products;
  }

  async countAllProductBySeller(id) {
    let number;

    const Data = {
      id,
    };

    try {
      const options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(Data),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // eslint-disable-next-line prefer-template
      const reponse = await fetch(
        `${process.env.API_BASE_URL}/products/countAllBySeller`,
        options,
      );
      if (!reponse.ok) {
        throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
      }
      number = await reponse.json();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('error: ', err);
    }
    

    return number;
  }


  async  getStoreById(id) {
    // Permet d'aller chercher les informations du produit
    let store;
  
    try {
      const options = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      // eslint-disable-next-line prefer-template
      // const reponse = await fetch(`${process.env.API_BASE_URL}/users/getStore/` + id, options);
      // eslint-disable-next-line prefer-template
      const reponse = await fetch(`${process.env.API_BASE_URL}/users/getStore/` + id, options);
  
      if (!reponse.ok) {
        throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
      }
      store = await reponse.json();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('error: ', err);
    }
    return store;
  } // fin function getStoreById(id)
}

export default SellerLibrary;
