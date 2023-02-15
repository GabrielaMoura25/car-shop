import express from 'express';
import carRoutes from './Routes/Car.routes';
import motorcycleRoutes from './Routes/Motorcycle.routes';

const app = express();

app.use(express.json());
app.use('/cars', carRoutes);
app.use('/motorcycles', motorcycleRoutes);

export default app;
