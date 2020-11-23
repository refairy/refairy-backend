import { Router } from 'express';
import analyzePage from '../controllers/analyze';
import getReportById from '../controllers/report';
const index = Router();
index.get('/report/:id', getReportById)
index.post('/analyze', analyzePage)
export default index;