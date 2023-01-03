import { Product } from '../types/products';
import { PRODUCTS } from '../constants/products';

export const getAll = (): Product[] => {
  return PRODUCTS;
};

export const get = (productSlug: string): Product | undefined => {
  return PRODUCTS.find((product) => product.slug === productSlug);
};

// export const createTable = async () => {
//   const query = `
//         DROP TABLE IF EXISTS products ;
//         CREATE TABLE IF NOT EXISTS products (
//             id SERIAL,
//             name TEXT NOT NULL,
//             slug TEXT NOT NULL UNIQUE,
//             images json,
//             colors TEXT NULL,
//             description TEXT NULL,
//             price FLOAT NULL
//         );
//     `;
//   return pgQuery(query);
// };
