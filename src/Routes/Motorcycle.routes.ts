import { Router } from 'express';
import MotorcycleController from '../Controllers/Motorcycle.controller';

const router = Router();

router.post('/', (req, res, next) => new MotorcycleController(req, res, next).create());

export default router;