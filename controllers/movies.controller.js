import express from "express"
import movieModel from "../model/movies.js"
import showModel from "../model/show.js"


export const getMovieData = async (req, res) => {
    try {
        let movies = await movieModel.find()
        res.json(movies)
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getMovieById = async (req, res) => {
    try {
        let { id } = req.params;
        const movie = await movieModel.findById(id);
        res.status(200).json(movie)
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getShowsByMovieId = async (req, res) => {
    try {
        const { id } = req.params
        const show = await showModel.find({
            movieid: id
        })

        res.status(200).json({
            show,
            message: "Show Are Available"
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}