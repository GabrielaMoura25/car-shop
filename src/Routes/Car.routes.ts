import { Router } from 'express';
import CarController from '../Controllers/Car.controller';

const router = Router();

router.put('/:id', (req, res, next) => {
  const carController = new CarController(req, res, next);

  return carController.updateById();
});
router.get('/:id', (req, res, next) => {
  const carController = new CarController(req, res, next);

  return carController.findById();
});
router.get('/', (req, res, next) => {
  const carController = new CarController(req, res, next);

  return carController.findAll();
});
router.post('/', (req, res, next) => {
  const carController = new CarController(req, res, next);

  return carController.create();
});

export default router;