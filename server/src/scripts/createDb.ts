import { createTable as createOrderTable } from '../repositories/orders';
import { pool } from '../database';

const createSchemas = async () => {
  try {
    await createOrderTable();
  } catch (err) {
    console.error('Error creating schema', err);
  } finally {
    pool.end();
  }
};

createSchemas();
