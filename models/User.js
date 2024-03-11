import mongoose from "mongoose";

const userShema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  addresse: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    min: 6,
    max: 30,
  },
  image: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model("Users", userShema);
