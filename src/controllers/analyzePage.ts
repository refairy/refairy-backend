import { Request, Response } from 'express'
import fetch from 'node-fetch'
import reportModel from '../models/report'
import getEnv from '../utils/getEnv'

const MODEL_URI = getEnv('MODEL_API')

const analyzePage = async (req: Request<{
    uri: string
}>, res: Response) => {
    try {
        const {uri} = req.params
        const fetched = await (await fetch(MODEL_URI, {
            method: 'POST',
            body: JSON.stringify({
                uri
            })
        })).json()
        const newReport = new reportModel()
        newReport.uri = uri
        newReport.analysisResult = fetched
        res.send({
            result: fetched
        })
    } catch(e) {
        res.status(400).send({
            status: 400,
            message: e.message
        })
    }
}

export default analyzePage