import mongoose, { mongo } from 'mongoose';

if(process.argv.length < 3) {
    console.log('Enter the password to connect')
    process.exit(1)
}

const password = process.argv[2];
const name = process.argv[3]
const number = process.argv[4]


// const url = `mongodb+srv://stephane:${password}@cluster0.vwgj2.mongodb.net/phoneBook?retryWrites=true&w=majority`


// mongoose.set('strictQuery',false)
// mongoose.connect(url)
// .then(() => console.log('connection to mongo succeeded'))
// .catch((e) => mongoose.connection.close())

// mongoose.connection.on('error', err => {
//     console.err(err)
//     mongoose.connection.close()
// })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
}, {
    collection: 'persons'
})

personSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = re._id.toString();
        delete ret._id;
        delete ret.__v;
    }
})

export const Person = mongoose.model('Person', personSchema)

const newPerson = new Person({
    "name": name, 
    "number": number
})

try {
    newPerson.save().then((result) => {
        console.log(`added ${result.name} number ${result.number} to phoneBook`)
    })
    .then(() => {
        Person.find({})
        .then((result) => { 
            console.log(result)
            mongoose.connection.close()
        })
    })
    .catch((err) => { throw new Error(err) }) 

} catch(err) {
    console.err(err)
    mongoose.connection.close()
}