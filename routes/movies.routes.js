import express from 'express'
import {
    getMovieData,
    getMovieById,
    getShowsByMovieId
} from '../controllers/movies.controller.js';

const router  =  express.Router()


router.get('/',
    getMovieData
)

router.get('/:id',
    getMovieById
)

router.get('/:id/shows',
    getShowsByMovieId
)



export default router