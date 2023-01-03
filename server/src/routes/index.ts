import { Request, Response, Router } from 'express';

import productRoutes from './products';
import userRoutes from './users';
import orderRoutes from './orders';

const router = Router();

router.get('/health', async (req: Request, res: Response) => {
  return res.status(200).send({ message: 'ok' });
});

router.use(productRoutes);
router.use(userRoutes);
router.use(orderRoutes);

export default router;
