import { ObjectId } from 'mongodb';
import {
  createSchema, ExtractDoc, Type, typedModel,
} from 'ts-mongoose';

const REQUIRED = {
    required: true
}

const reportSchema = createSchema({
    uri: Type.string({
        trim: true,
        ...REQUIRED
    }),
    analysisResult: Type.array(REQUIRED).of({
        origin: Type.string(REQUIRED),
        is_wrong: Type.boolean(REQUIRED),
        corrected: Type.string(REQUIRED),
        confidence: Type.number(REQUIRED),
        catetory: Type.string({
            enum: ['dokdo'],
            ...REQUIRED
        })
    })
}, {
    timestamps: true,
    _id: true
})

const reportModel = typedModel('Report', reportSchema)

export default reportModel