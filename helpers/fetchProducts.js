const fetchProducts = async (toSearchItem) => {
  // seu código aqui
  try {
  const endPoint = 'https://api.mercadolibre.com/sites/MLB/search?q=';
  const searchEndPoint = `${endPoint}${toSearchItem}`;

  const request = await fetch(searchEndPoint);
  const json = await request.json();
  
    if (toSearchItem === undefined) {
      return new Error('You must provide an url');
    }

   return json;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
