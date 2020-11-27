import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import analysisErrorModel, { UserContributionSelection } from "../models/analysisError";

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

export const addUserContribution = async(req: Request<{
    id: string
}, unknown, {
    evaluate?: keyof typeof UserContributionSelection
}>, res: Response) => {
    try {
        const {body: {evaluate}, params: {id}} = req
        if(!isValidObjectId(id)) throw new Error(`"${id}" is not valid errorid`)
        if(!evaluate || !Object.keys(UserContributionSelection).includes(evaluate)) throw new Error(`""${evaluate}" is not valid selection`)

        const analysisError = await analysisErrorModel.findById(id)
        if(!analysisError) throw new Error(`"${id}" analysisError not found`)
        analysisError.set('userContribution', [...(analysisError?.userContribution || []), evaluate])
        analysisError.save()
        res.send({
            message: 'Successfully added',
            result: analysisError
        })
    } catch(e) {
        res.status(400).send({
            message: e.message
        })
    }
}

export const getContributionQuestions = async (req: Request, res: Response) => {
    try {
        res.send(await analysisErrorModel.aggregate([{
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
    } catch(e) {
        res.status(500).send({
            message: 'Cannot find analysisErrors'
        })
    }
}