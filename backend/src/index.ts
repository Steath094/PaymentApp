import express from 'express';
import { connectDb } from './db';
import { router } from './router';
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
const app = express();
app.use(express.json());
app.use(cors())
const PORT = process.env.PORT || 3000;

app.use('/api/v1',router)


connectDb()
.then(()=>{
    app.listen(PORT,()=>{
    console.log(`Backend is running on Port ${PORT}`);
    })
}).catch((err)=>{
    console.log("MONGO db connection failed !!! ", err);
})
