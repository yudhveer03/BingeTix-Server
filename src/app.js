import express from 'express'
const app = express();
import movies from '../routes/movies.routes.js';
import cors from 'cors';
import bookingRoutes from '../routes/booking.routes.js';

app.use(cors({
    origin: ["http://localhost:5173", "https://binge-tix-client.vercel.app/"],
    credentials: true,
}));
app.use(express.json());

app.use('/api/movie', movies)
app.use('/api/booking', bookingRoutes);

export default app;

