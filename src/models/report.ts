import {
  createSchema, Type, typedModel,
} from 'ts-mongoose';

export const REQUIRED = {
    required: true
}

export enum CATEGORY {
    "dokdo", "east_sea", "holiday", "old_history", "japanese_colonial_period"
}

const reportSchema = createSchema({
    uri: Type.string({
        trim: true,
        ...REQUIRED
    }),
    title: Type.string({
        trim: true,
        ...REQUIRED
    }),
    analysisResult: Type.array(REQUIRED).of({
        origin: Type.string(REQUIRED),
        corrected: Type.string(REQUIRED),
        category: Type.string({
            enum: Object.keys(CATEGORY),
            ...REQUIRED
        })
    }),
    isDone: Type.boolean(REQUIRED),
    modelReqId: Type.string()
}, {
    timestamps: true,
    _id: true
})

const reportModel = typedModel('Report', reportSchema)

export default reportModel