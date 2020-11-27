import { Request, Response } from 'express'
import { Error } from 'mongoose'
import reportModel from '../models/report'

const getReportById = async (req: Request<{
    id: string
}>, res: Response) => {
    const {id} = req.params
    try {
        const report = await reportModel.findById(id)
        if(!report) throw new Error(`Cannot find report "${id}"`)
        res.send(report)
    } catch(e) {
        console.log(e.name)
        res.status(400).send({
            status: 400,
            message: e.message,
            errorType: 'ERROR_REP_NOTFOUND'
        })
    }
}

export const getRecentReports = async (req: Request, res: Response) => {
    const recentReports = (await reportModel.find({}, {
        analysisResult: false
    }, {
        sort: {
            createdAt: 'desc'
        },
        limit: 8
    }).exec())
    res.send(recentReports)
}

export default getReportById