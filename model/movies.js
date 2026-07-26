import mongoose  from "mongoose"
const Schema =   mongoose.Schema                                                                                                                                                                                                                    ;

const movieSchema = new Schema({
    image: {
        type: String,
        default: "https://via.placeholder.com/300x450"
    },
    title: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
    },
    genre: {
        type: String,
    },
    time: {
        type : String,
    },
    description: {
        type: String,
    },
    language: {
      type:String,  
    },
    releaseDate: {
        type: Date,
    },
    director: {
        type:String
    },
    cast: {
        type: [String]
    },
    trailer: {
        type: String
    },
    certificate: {
        type: String
    },
    format: {
        type: [String]
    },
    whyWatch: [
        {
            title: String,
            description:String,
        }
    ]
})


export default  mongoose.model("Movie", movieSchema)