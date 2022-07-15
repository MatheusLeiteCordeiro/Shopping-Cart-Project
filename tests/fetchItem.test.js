require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  // implemente seus testes aqui
  test('Testa se fetchItem é uma função', () => { 
    expect(typeof fetchItem).toEqual('function');
   });

  test('Testa se fetch foi chamada', async () => { 
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('Testa se utiliza endpoint ao passar argumento "MLB1615760527"', async () => { 
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });

  test('Testa se retorna estrutura de dados igual ao objeto "item", ao passar argumento "MLB1615760527"', async () => { 
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });

  test('Testa se retorna mensagem de erro "You must provide an url", ao chamar função sem argumento passado', async () => { 
    const failRequest = await fetchItem();
    expect(failRequest).toEqual(new Error('You must provide an url'))
   })
});
