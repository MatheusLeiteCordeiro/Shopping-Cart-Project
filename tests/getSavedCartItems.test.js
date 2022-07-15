const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
  test('Testa se o método "localStorage.getItem" é chamado ao executara função', () => { 
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
   });

   test('Testa se o método "localStorage.getItem" é chamado com "cartItems" como parâmetro', () => { 
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
    })});
