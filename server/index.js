import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
mongoose.set('strictQuery', false);
import dotenv from 'dotenv';
import cors from 'cors';
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoute.js'
import UploadRoute from './Routes/UploadRoute.js'
import ChatRoute from './Routes/ChatRoute.js'
import MessageRoute from './Routes/MessageRoute.js'
// const {S3Client}=require('@aws-sdk/client-s3');

// //aws 
// async function uploadt0S3(path,originalFilename,mimemtype){
//     const client=new S3Client({
//         region:"Asia Pacific (Mumbai) ap-south-1",
//         credentials:{
//             accessKey:process.env.S3_ACCESS_KEY,
//             secretAccessKey:process.env.S3_SECRET_ACCESS_KEY,
//         }
//     });
//     console.log({path,originalFilename,mimemtype});
// }


//ROutes
const app=express();
//to server images for public
app.use(express.static('public'))
app.use('/images',express.static('images'))
//MIDDLEWARE
app.use(bodyParser.json({limit:'30mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))
app.use(cors())


dotenv.config()
mongoose
.connect(process.env.MONGO_DB,
{useNewUrlParser:true,
    useUnifiedTopology: true})
.then(()=> app.listen(process.env.PORT,()=>console.log("Connected to db")))
.catch((err) => console.log(err));

//usage of routes
app.use('/auth', AuthRoute)
app.use('/user', UserRoute)
app.use('/post', PostRoute)
app.use('/upload',UploadRoute)
app.use('/chat',ChatRoute)
app.use('/Message',MessageRoute)