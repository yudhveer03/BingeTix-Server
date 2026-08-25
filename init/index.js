const mongoose = require('mongoose')
const initData = require('../init/data.js')
const movie = require('../model/movies.js');
const show = require('../model/show.js')
const initShow = require('./ShowData.js')

const Mongo_url = 'mongodb://127.0.0.1:27017/BingeTix'

main()
    .then(() => {
        console.log("Connection Successfull");
    })
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect(Mongo_url);
    await initDB();

}


const initDB = async () => {

    await movie.deleteMany({});
    await movie.insertMany(initData.data);
    await show.deleteMany({})
    await show.insertMany(initShow.ShowsDB)

    console.log("Initialized Successfully")
}

