import { Request, Response } from 'express'
import { Error } from 'mongoose'
import fetch from 'node-fetch'
import reportModel, { CATEGORY } from '../models/report'
import getEnv from '../utils/getEnv'

const MODEL_URI = getEnv('MODEL_API')

const analyzePage = async (req: Request<unknown, unknown, {
    uri?: string;
    sentences?: string[];
    title: string;
}>, res: Response) => {
    try {
        const { uri, sentences, title } = req.body
        if(!uri) throw new Error('Page uri not provided')
        if(!sentences) throw new Error('sentences not provided')
        if(!title) throw new Error('title not provided')
        const fetched: {id: string} = await (await fetch(MODEL_URI + '/check', {
            method: 'POST',
            body: JSON.stringify({
                "sentences": sentences.filter(Boolean)
            })
        })).json()
        const report = new reportModel({
            modelReqId: fetched.id,
            uri,
            title,
            isDone: false
        })
        const savedReport = await report.save()

        const history = (await reportModel.find({
            uri
        })).map(e => ({
            amount: e.analysisResult?.length,
            date: report.updatedAt
        }))

        res.send({
            ...savedReport.toObject(),
            history
        })
    } catch(e) {
        const [status, message, errorType] = ({
            [Error.ValidationError.name]: [500, 'Internal server error', 'ERROR_DB_VALIDATE'],
            "Invalid URL": [400, 'Invalid URL', 'ERROR_INVALID_URL'],
        })[e.name || e?.result?.error] || [400, e.message, e.name]
        console.log(e.name, e.message)

        res.status(+status).send({
            status,
            message,
            errorType
        })
    }
}

export const getProgress = async (req: Request<{
    id: string
}>, res: Response) => {
    try {
        const report = await reportModel.findById(req.params.id)
        if(!report) throw new Error(`Cannot find report ${req.params.id}`)
        const objectedReport = report.toObject()
        if(report.isDone) {
            return res.send({
                sentences: objectedReport.analysisResult,
                progress: undefined,
                isDone: true
            })
        }
        
        const fetched: {
            sentences: {
                origin: string;
                corrected: string;
                category: CATEGORY
            }[];
            progress: number;
            isDone: boolean;
        } = await (await fetch(MODEL_URI + '/check/progress?id=' + report.modelReqId)).json()

        report.set('analysisResult', fetched.sentences)
        report.set('isDone', fetched.isDone)
        report.save()
        res.send(fetched)
    } catch(e) {
        res.status(400).send({
            message: e.message
        })
    }
}

export default analyzePage