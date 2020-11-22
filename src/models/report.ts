import { ObjectId } from 'mongodb';
import {
  createSchema, ExtractDoc, Type, typedModel,
} from 'ts-mongoose';

const reportSchema = createSchema({
    uri: Type.string({
        required: true,
        trim: true
    }),
    analysisResult: Type.array({
        required: true
    }).of({
        
    })
}, {
    timestamps: true,
    _id: true
})

const reportModel = typedModel('Report', reportSchema, undefined, undefined, {
    findById(_id: ObjectId) {
        return this.findOne({
            _id
        })
    }
})

export default reportModel