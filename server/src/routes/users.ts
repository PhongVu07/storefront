import { Request, Response, Router } from 'express';
import { getAll } from '../repositories/users';

const userRouter = Router();

const BASE_PATH = '/users';

userRouter.get(BASE_PATH, async (req: Request, res: Response) => {
  try {
    const allUsers = getAll();
    return res.status(200).send({ data: allUsers });
  } catch (err) {
    return res.send(err);
  }
});

export default userRouter;
