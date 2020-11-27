import express, { json } from 'express';
import cors from 'cors'
import index from './router/api';

const app = express();
app.use(json())
app.use(cors({ origin: 'https://refairy.netlify.app' }))
app.use(cors({ origin: 'http://localhost:5500' }))
app.use('/api', index);
export default app;
