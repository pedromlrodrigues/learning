///////////////////////////////////////////////////////////////////////////////////////////////
// Import specific functions or variables from module
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';

console.log('Importing Module');
// console.log(shippingCost); // only available inside of its module (need exports to be accessible)
// addToCart('Eggs', 10);
// console.log(price, tq);

///////////////////////////////////////////////////////////////////////////////////////////////
// Import whole module
// import * as ShoppingCart from './shoppingCart.js';

// ShoppingCart.addToCart('Broccoli', 32);
// console.log(ShoppingCart.totalPrice, ShoppingCart.tq);

///////////////////////////////////////////////////////////////////////////////////////////////
// Import default exports (name of the exported default is defined in the import statement)
// Named exports should not be mixed with default exports
import add from './shoppingCart.js';
import { cart } from './shoppingCart.js';

add('beef', 7);
add('rice', 2);
add('pasta', 12);

console.log(cart);
