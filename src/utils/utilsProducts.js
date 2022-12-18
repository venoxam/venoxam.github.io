let currentHtml;

const getProducts = () => currentHtml;

const setProducts = (html) => {
  currentHtml = html;
};

const isProducts = () => currentHtml !== undefined;

const clearProducts = () => {
  currentHtml = undefined;
};

export { getProducts, setProducts, isProducts, clearProducts };