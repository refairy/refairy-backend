import { createSchema, Type, typedModel } from "ts-mongoose";
import { CATEGORY, REQUIRED } from "./report";

export enum UserContributionSelection {
    true,
    false,
    "NOT_ASSOCIATED"
}

const analysisErrorSchema = createSchema({
    text: Type.string(REQUIRED),
    userContribution: Type.array(REQUIRED).of(Type.boolean()),
}, {
    timestamps: true,
    _id: true
})

const analysisErrorModel = typedModel('AnalysisError', analysisErrorSchema)
export default analysisErrorModel