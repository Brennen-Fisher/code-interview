import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  reviews: {
    type: [String],
    required: false,
  },
  comments: {
    type: [String],
    required: false,
  },
},{
  timestamps:true
});

export default mongoose.model("User", userSchema)