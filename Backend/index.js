import express from 'express';
import { DELETE_SUCCESS, ERROR_MESSAGE, INSERT_SUCCESS, STUEDNT_NOT_FOUND, UPDATE_SUCCESS } from './constants.js';
import { User } from './UserModel.js';
import {StatusCodes} from 'http-status-codes';
import mongoose from 'mongoose';
import cors from 'cors';
import { Exercise } from './exerciseModel.js';

const app = express();
app.use(cors());
app.use(express.json());

const connectDb= async()=>{
    try{
     await mongoose.connect('mongodb://127.0.0.1:27017/trackerdb');
        console.log("Database connection created !");
    }
    catch (error){
        console.log(error);

    }
}


app.post("/User",async(request,response)=>{
    try{
        const reqData=request.body;
        const user= new User(reqData);
        await user.save(); 
        response.status(StatusCodes.CREATED).send({message : INSERT_SUCCESS});
    }catch(error){
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message :ERROR_MESSAGE});

    }
});

app.get("/User",async (request,response)=>{
    try{
        const users = await User.find(); 
        response.send({user:users});
    }catch(error){
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message :ERROR_MESSAGE});

    }
});

//Exercise APIs-----------------------------------------------

app.post("/Exercise",async(request,response)=>{
    try{
        const reqData=request.body;
        const exercise= new Exercise(reqData);
        await exercise.save(); 
        response.status(StatusCodes.CREATED).send({message : INSERT_SUCCESS});
    }catch(error){
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message :ERROR_MESSAGE});

    }
});


app.get("/Exercise/:username",async(request,response)=>{
    try{
       const exercise= await Exercise.findOne({username: request.params.username});
       if(exercise==null){
        response.status(StatusCodes.NOT_FOUND).send({message:STUEDNT_NOT_FOUND}); 
       }
       else{
        response.send({Exer:exercise});
       }
    }catch(error){
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message :ERROR_MESSAGE});
    }

});

app.get("/Exercise",async (request,response)=>{
    try{
        const exercise = await Exercise.find(); 
        response.send({Exer:exercise});
    }catch(error){
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message :ERROR_MESSAGE});

    }
});

app.delete("/Exercise/:username",async(request,response)=>{
    try{
        await Exercise.deleteOne({username:request.params.username});
        response.send({message:DELETE_SUCCESS});
    }catch(error){
        response.status(500).send({message :ERROR_MESSAGE});
  
    }
});

app.put("/Exercise/:username",async(request,response)=>{
    try{
    await Exercise.updateOne({username:request.params.username},request.body)
    response.send({message:UPDATE_SUCCESS});
    }catch(error){
        response.status(500).send({message :ERROR_MESSAGE});
  
    }
});

app.listen(5436,()=>{
    console.log("Server Started on 5436.");
    connectDb();
})