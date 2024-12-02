import express from 'express'
import cors from 'cors'
import { signup, signin } from './controller/user.js'
import services from './controller/services.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

const app = express()
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signup', signup);
app.post('/signin', signin);
app.use('/service', services);


mongoose.connect("mongodb://127.0.0.1:27017/")
    .then(() => app.listen(port, () => console.log(`Server Running on Port: http://localhost:${port}`)))
    .catch((error) => console.log(`${error} did not connect`));