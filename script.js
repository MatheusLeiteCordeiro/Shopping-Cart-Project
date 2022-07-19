// const { fetchProducts } = require("./helpers/fetchProducts");
// const { fetchItem } = require("./helpers/fetchItem");
// const saveCartItems = require("./helpers/saveCartItems");

const cartItems = document.querySelector('.cart__items');

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

const createProductListing = async () => {
    const section = document.querySelector('.items');
    const apiReturn = await fetchProducts('computador');
    const arrayResults = apiReturn.results;

    arrayResults.map(({ id: sku, title: name, thumbnail: image }) => {
        const item = createProductItemElement({ sku, name, image });

        return section.appendChild(item);
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

  const button = document.querySelectorAll('.item__add');

  button.forEach((element) => {
  element.addEventListener('click', (event) => {
    addItemToCart((event.target.parentNode.firstChild.innerText));
  });
});
};

window.onload = async () => { 
    await createProductListing();
    setItemsToCart();
};
