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
      // const reponse = await fetch(`${process.env.API_BASE_URL}/api/products/getAllBySeller/` + idSeller,options);
      // eslint-disable-next-line prefer-template
      const reponse = await fetch(`/api/products/getAllBySeller/` + idSeller, options);
      console.log(reponse, 'reponse du fetch')
      if (!reponse.ok) {
        throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
      }
      products = await reponse.json();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('error: ', err);
    }
    console.log(products,'dans les fetch product')
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
        `${process.env.API_BASE_URL}/api/products/countAllBySeller`,
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
    console.log('number: ', number);

    return number;
  }
}

export default SellerLibrary;
