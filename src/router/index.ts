import { Router } from 'express';
import getReportById from '../controllers/getReportById';
const index = Router();
index.get('/report/:id', getReportById)
export default index;