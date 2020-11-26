import { Request, Response } from "express";
import analysisErrorModel from "../models/analysisError";
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