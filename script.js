// const { fetchProducts } = require("./helpers/fetchProducts");
// const { fetchItem } = require("./helpers/fetchItem");
// const saveCartItems = require("./helpers/saveCartItems");

const cartItems = document.querySelector('.cart__items');
const searchProduct = document.querySelector('#searchBar'); 
const sectionItems = document.querySelector('.items');

const createProductImageElement = (imageSource, title) => {
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

// const calculateTotalPrice = () => {
//   const totalPrice = document.querySelector('.total-price');
//   const items = document.querySelectorAll('.cart__items');

//   valorInicialPrice = 0;

//   items.forEach(async (element) => {
//     const cartItemData = await fetchItem(element.firstChild.firstChild.innerText);
//     const { price } = cartItemData;
//     const valorTotalPrice = valorInicialPrice + price;

//     totalPrice.innerHTML = valorTotalPrice;
//     // for (let i=0; i<element.childElementCount; i++) {

//     // }
//     // console.log(element.childElementCount);
//   });
// };

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
  // showLoading(sectionItems);

  if (sectionItems.childElementCount > 0) {
    sectionItems.innerHTML = '';
  }

  const apiReturn = await fetchProducts(searchProduct.value);
  const arrayResults = apiReturn.results;

  mapFetchItems(arrayResults);

  // deleteLoading();
};

const search = () => {
  const searchbutton = document.querySelector('#search-button'); 

  searchbutton.addEventListener('click', () => {
    searchCreateProductListing();
    searchProduct.value = '';
  });
};

// const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  // coloque seu código aqui
    event.target.remove();
    saveCartItems(cartItems.innerHTML);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  // const textP = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;

  // li.appendChild(createCustomElement('span', 'cartItemSpan', sku));
  // li.appendChild(createCustomElement('p', 'pItemCart', textP));
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.className = 'cart__item';
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const createCartItemStylizedElement = ({ title, price, thumbnail }) => {
  const li = document.createElement('li');

  li.className = 'li-stylized';

  li.appendChild(createProductImageElement(thumbnail, title));
  li.appendChild(createCustomElement('p', 'p-name-item-cart', title));
  li.appendChild(createCustomElement('p', 'p-price-item-cart', `R$${price}`));

  li.addEventListener('click', cartItemClickListener);
  return li;
};

const addItemToCart = async (itemId) => {
  const apiReturn = await fetchItem(itemId);
  const objectItemCart = {
    // sku: apiReturn.id,
    title: apiReturn.title,
    price: apiReturn.price,
    thumbnail: apiReturn.thumbnail,
  };

  // const cartItem = createCartItemElement(objectItemCart);
  const cartItem = createCartItemStylizedElement(objectItemCart);

  cartItems.appendChild(cartItem);

  saveCartItems(cartItems.innerHTML);
};

const reloadCart = () => {
    cartItems.innerHTML = getSavedCartItems();

    const item = document.querySelectorAll('.cart__item');

    item.forEach((element) => {
      element.addEventListener('click', cartItemClickListener);
      // calculateTotalPrice();
    });
};

const setItemsToCart = () => {
  reloadCart();

  const buttons = document.querySelectorAll('.item__add');

  buttons.forEach((element) => {
  element.addEventListener('click', (event) => {
    addItemToCart((event.target.parentNode.firstChild.innerText));
    // calculateTotalPrice();
  });
});
};

const emptyCart = () => {
  const emptyCartButton = document.querySelector('.empty-cart');

  emptyCartButton.addEventListener('click', () => {
    cartItems.innerHTML = '';
    saveCartItems(cartItems.innerHTML);
    // calculateTotalPrice();
  });
};

window.onload = async () => { 
    await createProductListing();
    search();
    setItemsToCart();
    emptyCart();
};
