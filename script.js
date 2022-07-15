// const { fetchProducts } = require("./helpers/fetchProducts");
// const { fetchItem } = require("./helpers/fetchItem");

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

    arrayResults.map((objeto) => {
        const sku = objeto.id;
        const name = objeto.title;
        const image = objeto.thumbnail;

        const item = createProductItemElement({ sku, name, image });

        return section.appendChild(item);
    });
};

// const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

// const cartItemClickListener = (event) => {
//   // coloque seu código aqui
// };

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  // li.addEventListener('click', cartItemClickListener);
  return li;
};

const addItemToCart = async () => {
  const apiReturn = await fetchItem('MLB1615760527');

  const sku = apiReturn.id;
  const name = apiReturn.title;
  const salePrice = apiReturn.price;

  const item = createCartItemElement({ sku, name, salePrice });
  const cartItems = document.querySelector('.cart__items');

  cartItems.appendChild(item);

  console.log(sku, name, salePrice);
};

window.onload = () => { 
    createProductListing();
    addItemToCart();
 };
