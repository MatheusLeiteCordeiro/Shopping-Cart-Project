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

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__title', name));
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
  arrayResults.map(({ id: sku, title: name, thumbnail: image }) => {
    const item = createProductItemElement({ sku, name, image });

    return sectionItems.appendChild(item);
  });
};

const createProductListing = async () => {
    showLoading(sectionItems);

    const apiReturn = await fetchProducts('sadasd');
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
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const addItemToCart = async (itemId) => {
  const apiReturn = await fetchItem(itemId);
  const objectItemCart = {
    sku: apiReturn.id,
    name: apiReturn.title,
    salePrice: apiReturn.price,
  };

  const cartItem = createCartItemElement(objectItemCart);

  cartItems.appendChild(cartItem);

  saveCartItems(cartItems.innerHTML);
};

const reloadCart = () => {
    cartItems.innerHTML = getSavedCartItems();

    const item = document.querySelectorAll('.cart__item');
    item.forEach((element) => {
      element.addEventListener('click', cartItemClickListener);
    });
};

const setItemsToCart = () => {
  reloadCart();

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
  });
};

window.onload = async () => { 
    await createProductListing();
    search();
    setItemsToCart();
    emptyCart();
};
