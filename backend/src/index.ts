import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send("Hi");
})


mongoose.connect('mongodb://localhost:27017/')
.then(()=>{
    console.log("DB Connected");
    
    app.listen(PORT,()=>{
    console.log(`Backend is running on Port ${PORT}`);
    })
}).catch((error)=>{
    console.log("Error While Connecting DB: ",error);
})
