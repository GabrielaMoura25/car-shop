import { Router } from 'express';
import CarController from '../Controllers/Car.controller';

const router = Router();

router.delete('/:id', (req, res, next) => new CarController(req, res, next).deleteById());
router.put('/:id', (req, res, next) => new CarController(req, res, next).updateById());
router.get('/:id', (req, res, next) => new CarController(req, res, next).findById());
router.get('/', (req, res, next) => new CarController(req, res, next).findAll());
router.post('/', (req, res, next) => new CarController(req, res, next).create());

export default router;