import {
  createSchema, Type, typedModel,
} from 'ts-mongoose';

export const REQUIRED = {
    required: true
}

export enum CATEGORY {
    'dokdo'
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
        confidence: Type.number(REQUIRED),
        category: Type.string({
            enum: Object.keys(CATEGORY),
            ...REQUIRED
        })
    })
}, {
    timestamps: true,
    _id: true
})

const reportModel = typedModel('Report', reportSchema)

export default reportModel