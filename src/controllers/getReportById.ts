import {Request, Response} from 'express'
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
        res.status(400).send({
            status: 400,
            message: e.message
        })
    }
}

export default getReportById