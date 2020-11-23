import { Request, Response } from 'express'
import { Error } from 'mongoose'
import fetch from 'node-fetch'
import og from 'open-graph-scraper'

import reportModel from '../models/report'
import getEnv from '../utils/getEnv'

const MODEL_URI = getEnv('MODEL_API')

const analyzePage = async (req: Request<unknown, unknown, {
    uri?: string;
    sentences?: string[]
}>, res: Response) => {
    try {
        const { uri, sentences } = req.body
        if(!uri) throw new Error('Page uri not provided')
        if(!sentences) throw new Error('sentences not provided')
        const fetched = await (await fetch(MODEL_URI + '/check', {
            method: 'POST',
            body: JSON.stringify({
                "sentences": sentences.filter(Boolean)
            })
        })).json()

        const newReport = new reportModel()

        const { ogTitle } = (await og({
            url: uri
        })).result as {
            ogTitle: string
        }

        newReport.set('uri', uri)
        newReport.set('title', ogTitle)
        newReport.set('analysisResult', fetched)
        
        console.log(await newReport.save())
        res.send({
            uri,
            result: fetched
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

export default analyzePage