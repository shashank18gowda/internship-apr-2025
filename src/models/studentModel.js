import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rollno: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  //   image: {
  //     type: String,
  //     required: true,
  //   },
  isactive: {
    type: Number,
    default: 1,
  },
});

export default mongoose.model("students", studentSchema);
