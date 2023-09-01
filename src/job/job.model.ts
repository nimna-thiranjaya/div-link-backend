import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Job title is required!"],
  },

  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },

  avgAnnualSalary: {
    type: Number,
    required: [true, "Job average annual salary is required!"],
  },

  description: {
    type: String,
    required: [true, "Job description is required!"],
  },

  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
  },
});

export default mongoose.model("Job", JobSchema);
