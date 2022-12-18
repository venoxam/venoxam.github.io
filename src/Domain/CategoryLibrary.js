/* eslint-disable class-methods-use-this */
class CategoryLibrary {
  async listbyCategorie(id) {
    let categorie;

    try {
      const options = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // const reponse = await fetch(`${process.env.API_BASE_URL}/api/products/listByCategory/` + id, options);

      // eslint-disable-next-line prefer-template
      const reponse = await fetch(`/api/products/listByCategory/` + id, options);

      if (!reponse.ok) {
        throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
      }
      categorie = await reponse.json();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('error: ', err);
    }
    return categorie;
  }

  async getCategorie(id) {
    let categorie;

    try {
      const options = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // const reponse = await fetch(`${process.env.API_BASE_URL}/api/products/getCategory/` + id, options);

      // eslint-disable-next-line prefer-template
      const reponse = await fetch(`/api/categories/getCategory/` + id, options);

      if (!reponse.ok) {
        throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
      }
      categorie = await reponse.json();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('error: ', err);
    }
    return categorie;
  }

  async getAllCategories() {
    let categories;
    try {
      const options = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const reponse = await fetch('/api/categories/getAllCategories', options);

      if (!reponse.ok) {
        throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
      }

      categories = await reponse.json();
    } catch (err) {
      console.error('error: ', err);
    }
    return categories;
  }
}

export default CategoryLibrary;
