import express, { json } from 'express';
import index from './router/api';

const app = express();
app.use(json())
app.use('/api', index);
export default app;
