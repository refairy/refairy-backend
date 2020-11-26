import { Router } from 'express';
import { registerAnalysisError } from '../controllers/analysisError';
import analyzePage from '../controllers/analyze';
import getReportById, { getRecentReports } from '../controllers/report';
const index = Router();
index.get('/report/recents', getRecentReports)
index.get('/report/:id', getReportById)
index.post('/analysis_error/', registerAnalysisError)
index.post('/analyze', analyzePage)
export default index;