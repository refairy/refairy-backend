import { Router } from 'express';
import analyzePage from '../controllers/analyzePage';
import getReportById from '../controllers/getReportById';
const index = Router();
index.get('/report/:id', getReportById)
index.post('/analyze/:uri', analyzePage)
export default index;