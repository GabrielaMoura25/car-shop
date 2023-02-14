import { Router } from 'express';
import CarController from '../Controllers/Car.controller';

const router = Router();

router.post('/', (req, res, next) => {
  const carController = new CarController(req, res, next);

  return carController.create();
});

export default router;