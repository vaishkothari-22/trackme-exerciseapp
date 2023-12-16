
import axios from 'axios';
import { BASE_URL } from './constants';

// export async function fetchUsers(){
//     try{
//         const response = await axios.get(`${BASE_URL}/User`);
//         return response.data;
//     }catch(error){
//         console.log(error);
//     }
// }
export async function saveUser(userData){
    try{
        const response = await axios.post(`${BASE_URL}/User`,userData);
        return response.data;
    }catch(error){
        console.log(error);
    } 
}
//Exercise Logs-----------------------------------------------------------------------------
export async function deleteLog(username){
    try{
        const response=await axios.delete(`${BASE_URL}/Exercise/${username}`);
        return response.data;
    }catch(error){
        console.log(error);
    }
}

export async function fetchExerciseLog(){
    try{
        const response = await axios.get(`${BASE_URL}/Exercise`);
        return response.data;
    }catch(error){
        console.log(error);
    }
}
export async function saveExerciseLog(exerciseData){
    try{
        const response = await axios.post(`${BASE_URL}/Exercise`,exerciseData);
        return response.data;
    }catch(error){
        console.log(error);
    } 
}
 

export async function fetchExerciseLogByUserName(username){
    try{
        const response=await axios.get(`${BASE_URL}/Exercise/${username}`);
        return response.data;
    }catch(error){
        console.log(error);
    }
}


export async function updateExerciseLog(updatedData,username){
    try{
        const response=await axios.put(`${BASE_URL}/Exercise/${username}`,updatedData);
        console.log(response.data)
        return response.data;
    }catch(error){
        console.log(error);
    }
}

