import { Request, Response } from "express";
import analysisErrorModel, { UserContributionSelection } from "../models/analysisError";
import { CATEGORY } from "../models/report";

export const registerAnalysisError = (req: Request<unknown, unknown, {
    texts?: string[]
}>, res: Response) => {
    const { texts } = req.body
    try {
        if(!texts?.length) throw new Error("sentences not provided")
        const ids = texts.filter(Boolean).map(text => {
            const analysisError = new analysisErrorModel()
            analysisError.set('text', text)
            analysisError.set('userContribution', [false])
            analysisError.save()
            return analysisError.id
        })
        res.send({
            message: 'Successfully registered',
            result: ids
        })
    } catch(e) {
        res.send({
            status: 400,
            message: e.message
        })
    }
}

export const getContributionQuestions = async (req: Request, res: Response) => {
    // WIP
    // console.log(await analysisErrorModel.find({}, {}, {

    // }).exec())
    console.log(await analysisErrorModel.aggregate([{
        $project: {
            length: {
                $size: "$userContribution"
            },
            text: 1
        }
    }, {
        $sort: {
            length: 1
        }
    }, {
        $limit: 6
    }]).exec())
    res.send('네?')
}