import mongoose,{Schema} from "mongoose";

// const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
   username: String,
  description: String,
  duration:Number,
  date:Date,
});
export const Exercise = mongoose.model('Exercise', exerciseSchema);

