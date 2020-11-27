import express, { json } from 'express';
import index from './router/api';

const app = express();
app.use(json())
app.use(cors({ origin: 'https://www.zerocho.com' }))
app.use('/api', index);
export default app;
