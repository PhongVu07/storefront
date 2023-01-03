import { json, Request, Response, Router, urlencoded } from 'express';

import { PRODUCTS } from './../constants/products';
import { create, getAll } from '../repositories/orders';
import { s3UploadFiles } from '../middlewares/fileUpload';

const BASE_PATH = '/orders';

const orderRouter = Router();

orderRouter.get(BASE_PATH, async (req: Request, res: Response) => {
  try {
    const allOrders = await getAll();
    const massagedOrders = allOrders.map((order) => {
      const product = PRODUCTS.find(
        (product) => product.id === order.product_id
      );
      return {
        ...order,
        metadata: {
          ...product,
          ...order.metadata
        }
      };
    });
    return res.status(200).send({ data: massagedOrders });
  } catch (err) {
    return res.send(err);
  }
});

orderRouter.post(
  BASE_PATH,
  s3UploadFiles,
  urlencoded({ extended: false }),
  json(),
  async (req: Request, res: Response) => {
    try {
      const { order, files } = req.body;
      if (files.length) {
        order.metadata = {
          ...order.metadata,
          images: req.body.files
        };
      }
      await create(order);
      return res.status(200).send({ status: 'ok' });
    } catch (err) {
      return res.send(err);
    }
  }
);

export default orderRouter;
