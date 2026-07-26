import mongoose from 'mongoose'
const Schema = mongoose.Schema

const showSchema = new Schema({

    movieid:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Movie",
    },
    date: {
        type:String,
    },
    time: {
        type:String,
    },
    theatre: {
        type:String,
    },
    price: {
        type:Number
    },
    bookedSeats: {
        type: [String],
        default:[]
    }

})

export default  mongoose.model("Show_Details",showSchema)
