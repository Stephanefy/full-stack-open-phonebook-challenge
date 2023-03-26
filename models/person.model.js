import mongoose from "mongoose";



const personSchema = new mongoose.Schema({
    name: String,
    number: String
}, {
    collection: 'persons'
})

personSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
    }
})

export const Person = mongoose.model('Person', personSchema)



