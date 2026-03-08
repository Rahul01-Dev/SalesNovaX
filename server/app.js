import express, { urlencoded } from 'express';
import cors from 'cors';


const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}))
app.use(urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))

//Routes Import 

import authRoutes from './routes/authRoutes.js'
import loggerRoutes from './routes/loggerRoutes.js'
import notificationRoutes from './routes/notificationRoutes.js'


//routes Declare

app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/logs',loggerRoutes);
app.use('/api/v1/notifications',notificationRoutes);


export { app }
