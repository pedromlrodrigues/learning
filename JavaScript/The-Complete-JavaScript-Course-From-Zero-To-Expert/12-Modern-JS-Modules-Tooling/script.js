// ///////////////////////////////////////////////////////////////////////////////////////////////
// // Import specific functions or variables from module
// // import { addToCart, totalPrice as price, tq } from './shoppingCart.js';

// console.log('Importing Module');
// // console.log(shippingCost); // only available inside of its module (need exports to be accessible)
// // addToCart('Eggs', 10);
// // console.log(price, tq);

// ///////////////////////////////////////////////////////////////////////////////////////////////
// // Import whole module
// // import * as ShoppingCart from './shoppingCart.js';

// // ShoppingCart.addToCart('Broccoli', 32);
// // console.log(ShoppingCart.totalPrice, ShoppingCart.tq);

// ///////////////////////////////////////////////////////////////////////////////////////////////
// // Import default exports (name of the exported default is defined in the import statement)
// // Named exports should not be mixed with default exports
import add from './shoppingCart.js';
import { cart } from './shoppingCart.js';

add('beef', 7);
add('rice', 2);
add('pasta', 12);

// console.log(cart);

// ///////////////////////////////////////////////////////////////////////////////////////////////
// // Top-Level await (ES2022)
// // console.log('Start fetching');
// // const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// // const data = await res.json();
// // console.log(data);
// // console.log('Something');

// const getLastPost = async function () {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await res.json();
//   console.log(data);

//   //   return {
//   //     title: data.at(data.length - 1).title,
//   //     text: data.at(data.length - 1).body,
//   //   };

//   // data.length - 1 == -1 in this case
//   return {
//     title: data.at(-1).title,
//     text: data.at(-1).body,
//   };
// };

// const lastPost = await getLastPost();
// console.log(lastPost);

// ///////////////////////////////////////////////////////////////////////////////////////////////
// // The Module Pattern (Old way of encapsulation)
// const ShoppingCart2 = (function () {
//   const cart = [];
//   const shippingCost = 115;
//   const totalPrice = 251;
//   const totalQuantity = 312;

//   const addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity} ${product} added to cart`);
//   };

//   const orderStock = function (product, quantity) {
//     console.log(`${quantity} ${product} ordered from supplier`);
//   };

//   return {
//     addToCart,
//     cart,
//     totalPrice,
//     totalQuantity,
//   };
// })();

// ShoppingCart2.addToCart('Vanillas', 3);
// ShoppingCart2.addToCart('Pancakes', 10);
// console.log(ShoppingCart2);
// console.log(ShoppingCart2.shippingCost); // undefined
// console.log(ShoppingCart2.orderStock); // undefined

// ///////////////////////////////////////////////////////////////////////////////////////////////
// Only available in NodeJS (CommonJS Module => requires module bundler in order to use)
// // Export
// export.addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity} ${product} added to cart`);
//   };

// // Import
// const {addToCart} = require('./shoppingCart.js');

// ///////////////////////////////////////////////////////////////////////////////////////////////
// // Introduction to NPM
import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
// import cloneDeep from 'lodash-es';

const state = {
  cart: [
    {
      product: 'bread',
      quantity: 5,
    },
    { product: 'eggs', quantity: 8 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state); // maintains reference to original object
const stateDeepClone = cloneDeep(state); // creates a totally new object without reference to the original
state.user.loggedIn = false;
console.log(stateClone);
console.log(stateDeepClone);

// Bundling is an optimization technique that reduces the number of server requests needed by "merging" every JavaScript file into a big one.
// It also reduces file sizes by compacting the code (remove enters and white spaces).

// Specific for parcel (updates the page without refreshing after detecting changes )
// if (module.hot) {
//   module.hot.accept();
// }
