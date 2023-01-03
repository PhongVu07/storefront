import { Request, Response, Router } from 'express';
import { get, getAll } from '../repositories/products';

const BASE_PATH = '/products';

const productRouter = Router();

productRouter.get(BASE_PATH, async (req: Request, res: Response) => {
  try {
    const allProducts = getAll();
    return res.status(200).send({ data: allProducts });
  } catch (err) {
    return res.send(err);
  }
});

productRouter.get(
  `${BASE_PATH}/:productSlug`,
  async (req: Request, res: Response) => {
    try {
      const { productSlug } = req.params;
      const product = get(productSlug);
      return res.status(200).send({ data: product });
    } catch (err) {
      return res.send(err);
    }
  }
);

export default productRouter;
