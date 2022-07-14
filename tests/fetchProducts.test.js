require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  test('Testa se fetchProducts é uma função', () => { 
    expect(typeof fetchProducts).toEqual('function');
   });

   test('Testa se fetch foi chamada', async () => { 
      fetchProducts('computador');
      expect(fetch).toHaveBeenCalledTimes(1);
    })

   test('Testa se utiliza endpoint ao passar argumento "comptador"', async () => { 
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
    });

   test('Testa se retorna estrutura de dados igual ao objeto "computadorSearch", ao passar argumento "computador"', async () => { 
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  });

  test('Testa se retorna mensagem de erro "You must provide an url", ao chamar função sem argumento passado', async () => { 
    const failRequest = await fetchProducts();
    expect(failRequest).toEqual(new Error('You must provide an url'))
   })
});
