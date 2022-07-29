// const { fetchProducts } = require("./helpers/fetchProducts");
// const { fetchItem } = require("./helpers/fetchItem");
// const saveCartItems = require("./helpers/saveCartItems");

const cartItems = document.querySelector('.cart__items');
const searchProduct = document.querySelector('#searchBar'); 
const sectionItems = document.querySelector('.items');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image, price }) => {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('p', 'item__price', `R$ ${price}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const showLoading = (section) => {
  const loadingTextElement = document.createElement('p');
  
  loadingTextElement.classList.add('loading');
  loadingTextElement.innerText = 'carregando...';
  
  section.appendChild(loadingTextElement);
};

const deleteLoading = () => {
  const loadingTextElement = document.querySelector('.loading');
  
  loadingTextElement.remove();
};

const mapFetchItems = (arrayResults) => {
  arrayResults.map(({ id: sku, title: name, thumbnail: image, price }) => {
    const item = createProductItemElement({ sku, name, image, price });

    return sectionItems.appendChild(item);
  });
};

const createProductListing = async () => {
  showLoading(sectionItems);
  
    const apiReturn = await fetchProducts('computador');
    const arrayResults = apiReturn.results;

    mapFetchItems(arrayResults);

    deleteLoading();
  };
  
  const searchCreateProductListing = async () => {    
    if (sectionItems.childElementCount > 0) {
      sectionItems.innerHTML = '';
    }
    
  const apiReturn = await fetchProducts(searchProduct.value);
  const arrayResults = apiReturn.results;
  
  mapFetchItems(arrayResults);
  setItemsToCart();
};

const search = () => {
  const searchbutton = document.querySelector('#search-button'); 
  
  searchbutton.addEventListener('click', () => {
    searchCreateProductListing();
    searchProduct.value = '';
  });
};

// const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

// const calculatesPrices = () => {
//   const totalPrice = document.querySelector('.total-price');
//   const cartItem = document.querySelectorAll('.cart__item');
//   const arrayPrices = [];

//   cartItem.forEach((item) => {
//     const array = item.textContent.split('$');
//     arrayPrices.push(parseFloat(array[1]));
//   });

//   const somaPrices = arrayPrices.reduce((acc, curr) => acc + curr, 0);
//   totalPrice.innerHTML = `R$ ${somaPrices}`;
// };

const calculatesStylizedPrices = () => {
  const totalPrice = document.querySelector('.total-price');
  const cartItem = document.querySelectorAll('.li-stylized');
  const arrayPrices = [];

  cartItem.forEach((item) => {
    const array = item.textContent.split('$');
    arrayPrices.push(parseFloat(array[1]));
  });
  const somaPrices = arrayPrices.reduce((acc, curr) => acc + curr, 0);
  totalPrice.innerHTML = `R$ ${somaPrices.toFixed(2)}`;
};

const cartItemClickListener = (event) => {
  // coloque seu código aqui
  // event.target.remove();
  event.target.parentNode.remove();
  saveCartItems(cartItems.innerHTML);
  calculatesStylizedPrices();
};

// const createCartItemElement = ({ sku, name, salePrice }) => {
//   const li = document.createElement('li');
//   const textP = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;

//   li.innerText = textP;
//   li.className = 'cart__item';
//   li.addEventListener('click', cartItemClickListener);
//   return li;
// };

const createCartItemStylizedElement = ({ title, price, thumbnail }) => {
  const li = document.createElement('li');
  const removebutton = document.createElement('img');

  removebutton.src = './remove.png';
  removebutton.className = 'remove-button';
  li.className = 'li-stylized';

  li.appendChild(createProductImageElement(thumbnail));
  li.appendChild(createCustomElement('p', 'p-name-item-cart', title));
  li.appendChild(createCustomElement('p', 'p-price-item-cart', `R$${price}`));
  li.appendChild(removebutton);

  removebutton.addEventListener('click', cartItemClickListener);
  return li;
};

const addItemToCart = async (itemId) => {
  const apiReturn = await fetchItem(itemId);

  // const objectItemCart = { sku: apiReturn.id, name: apiReturn.title, salePrice: apiReturn.price,
  // };
  const stylizedObjectItemCart = {
    title: apiReturn.title,
    price: apiReturn.price,
    thumbnail: apiReturn.thumbnail,
  };

  // const cartItem = createCartItemElement(objectItemCart);
  const cartItem = createCartItemStylizedElement(stylizedObjectItemCart);
  cartItems.appendChild(cartItem);
  saveCartItems(cartItems.innerHTML);
  // calculatesPrices();
  calculatesStylizedPrices();
};

const reloadCart = () => {
    cartItems.innerHTML = getSavedCartItems();

    // const item = document.querySelectorAll('.cart__item');
    const item = document.querySelectorAll('.remove-button');

    item.forEach((element) => {
      element.addEventListener('click', cartItemClickListener);
    });  
};

const setItemsToCart = () => {
  reloadCart();
  // calculatesPrices();
  calculatesStylizedPrices();

  const buttons = document.querySelectorAll('.item__add');

  buttons.forEach((element) => {
  element.addEventListener('click', (event) => {
    addItemToCart((event.target.parentNode.firstChild.innerText));
  });
});
};

const emptyCart = () => {
  const emptyCartButton = document.querySelector('.empty-cart');

  emptyCartButton.addEventListener('click', () => {
    cartItems.innerHTML = '';
    saveCartItems(cartItems.innerHTML);
    // calculatesPrices();
    calculatesStylizedPrices();
  });
};

window.onload = async () => { 
    await createProductListing();
    setItemsToCart();
    search();
    emptyCart();
};
