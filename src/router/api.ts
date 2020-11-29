import { Router } from 'express';
import { addUserContribution, getContributionQuestions, registerAnalysisError } from '../controllers/analysisError';
import analyzePage, { getProgress } from '../controllers/analyze';
import getReportById, { getRecentReports } from '../controllers/report';
const index = Router();

index.get('/report/recents', getRecentReports)
index.get('/report/:id', getReportById)

index.post('/analysis_error', registerAnalysisError)
index.post('/analysis_error/:id', addUserContribution)
index.get('/analysis_error', getContributionQuestions)

index.post('/analyze', analyzePage)
index.get('/analyze/:id', getProgress)

export default index;