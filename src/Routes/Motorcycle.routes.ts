import { Router } from 'express';
import MotorcycleController from '../Controllers/Motorcycle.controller';

const router = Router();

router.get('/:id', (req, res, next) => new MotorcycleController(req, res, next).findById());
router.get('/', (req, res, next) => new MotorcycleController(req, res, next).findAll());
router.post('/', (req, res, next) => new MotorcycleController(req, res, next).create());

export default router;