import mongoose , {Schema} from "mongoose";

// const Schema = mongoose.Schema;

const userSchema = new Schema({
username: String,
email :String,
password: String
    
});

export const User = mongoose.model('User', userSchema);



