import { Request, Response } from 'express'
import { Error } from 'mongoose'
import reportModel from '../models/report'

const getReportById = async (req: Request<{
    id: string
}>, res: Response) => {
    const {id} = req.params
    try {
        const report = await reportModel.findById(id);
        if(!report) throw new Error(`Cannot find report "${id}"`)

        const history = (await reportModel.find({
            uri: report.uri
        })).map(e => ({
            amount: e.analysisResult?.length,
            date: report.updatedAt
        }))

        res.send({
            ...(report.toObject()),
            history
        })
    } catch(e) {
        console.log(e.name)
        res.status(400).send({
            status: 400,
            message: e.message,
            errorType: 'ERROR_REP_NOTFOUND'
        })
    }
}

export const getRecentReports = async (req: Request<unknown, unknown, unknown, {
    limit?: number
}>, res: Response) => {
    const recentReports = await reportModel.aggregate([{
        $project: {
            errorAmount: {
                $size: "$analysisResult"
            },
            title: 1,
            uri: 1,
            createdAt: 1,
        }
    }, {
        $sort: {
            createdAt: -1
        }
    }, {
        $limit: +(req.query.limit || 4)
    }]).exec()
    res.send(recentReports)
}

export default getReportById