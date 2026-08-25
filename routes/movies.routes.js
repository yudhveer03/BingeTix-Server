import express from 'express';
import {
    getMovieData,
    getMovieById,
    getShowsByMovieId,
    getUpcomingReleases // Import the new function
} from '../controllers/movies.controller.js';

const router = express.Router();

router.get('/', getMovieData);


router.get('/upcoming', getUpcomingReleases);

router.get('/:id', getMovieById);
router.get('/:id/shows', getShowsByMovieId);

export default router;