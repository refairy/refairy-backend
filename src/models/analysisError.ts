import { createSchema, Type, typedModel } from "ts-mongoose";
import { CATEGORY, REQUIRED } from "./report";

export enum UserContributionSelection {
    "WRONG",
    "RIGHT",
    "NOT_ASSOCIATED"
}

const analysisErrorSchema = createSchema({
    text: Type.string(REQUIRED),
    userContribution: Type.array(REQUIRED).of(Type.string({
        enum: Object.keys(UserContributionSelection)
    })),
}, {
    timestamps: true,
    _id: true
})

const analysisErrorModel = typedModel('AnalysisError', analysisErrorSchema)
export default analysisErrorModel