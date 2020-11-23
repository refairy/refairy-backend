import { Request, Response } from 'express'
import { Error } from 'mongoose'
import fetch from 'node-fetch'
import reportModel from '../models/report'
import getEnv from '../utils/getEnv'

const MODEL_URI = getEnv('MODEL_API')

const analyzePage = async (req: Request<{
    uri: string
}>, res: Response) => {
    try {
        const { uri } = req.params
        const fetched = await (await fetch(MODEL_URI + '/check', {
            method: 'POST',
            body: JSON.stringify({
                "sentence": "네?"
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })).json()
        const newReport = new reportModel()
        console.log(fetched)
        newReport.uri = uri
        newReport.set('analysisResult', fetched)
        console.log(newReport.toObject())
        console.log(await newReport.save())
        res.send({
            result: fetched
        })
    } catch(e) {

        const [status, message, errorType] = ({
            [Error.ValidationError.name]: [500, 'Internal server error', 'ERROR_DB_VALIDATE']
        })[e.name] || [400, e.message, e.name]
        
        res.status(+status).send({
            status,
            message,
            errorType
        })
    }
}

export default analyzePage