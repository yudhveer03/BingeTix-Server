import dotenv from 'dotenv';
dotenv.config()
import express from 'express'
import mongoose from 'mongoose'
import path from 'path';
import { Router } from 'express';
import app from './src/app.js'


const Mongo_url = `${process.env.MONGO_URL}`



main()
    .then(() => {
        console.log("Mongo DB Connected Successfully");
    })
    .catch((err) => console.log(err), { message: "Connction to MONGO DB Failed" });

async function main() {
    await mongoose.connect(Mongo_url);
}





app.listen(8000, () => {
    console.log(`Server Started On ${process.env.PORT}`);

})