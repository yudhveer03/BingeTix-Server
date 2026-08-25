import express from "express"
import movieModel from "../model/movies.js"
import showModel from "../model/show.js"
import axios from "axios";

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

export const getUpcomingReleases = async (req, res) => {
    try {
        const TMDB_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`;

        const response = await axios.get(TMDB_URL);

        res.status(200).json(response.data.results);
    } catch (err) {
        console.error("TMDB API Proxy Error:", err.message);
        return res.status(500).json({
            message: "Failed to fetch upcoming movies from TMDB"
        });
    }
}