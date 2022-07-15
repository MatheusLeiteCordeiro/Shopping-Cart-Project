const fetchItem = async (toSearchItem) => {
  // seu código aqui
  try {
    const endPoint = 'https://api.mercadolibre.com/items/';
    const searchEndPoint = `${endPoint}${toSearchItem}`;
  
    const request = await fetch(searchEndPoint);
    const json = await request.json();
  
     return json;
    } catch (error) {
      return new Error('You must provide an url');
    }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
