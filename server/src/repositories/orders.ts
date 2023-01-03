import { pgQuery } from '../database';
import { Order } from '../types/orders';

export const getAll = async (): Promise<Order[]> => {
  const query = `SELECT * from orders;`;
  const result = await pgQuery(query);
  //@ts-ignore
  return result.rows;
};

export const create = async (order: any) => {
  const query = `
        INSERT INTO orders (product_id, metadata)
        VALUES ($1, $2)
    `;
  const params = [order.productId, order.metadata];

  await pgQuery(query, params);
};

export const createTable = async () => {
  const query = `
        DROP TABLE IF EXISTS products ;
        DROP TABLE IF EXISTS orders ;
        CREATE TABLE IF NOT EXISTS orders (
            id SERIAL,
            product_id int NOT NULL,
            metadata json
        );
    `;
  return pgQuery(query);
};
