import express from 'express';
import index from './router';

const app = express();
app.use('/', index);
export default app;
