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

export const getRecentReport = async (req: Request<{
    id: string
}>, res: Response) => {
    // Mongoose에서  최근 추가된 10개의 문서를 받아오는 코드..?
}

export default getReportById