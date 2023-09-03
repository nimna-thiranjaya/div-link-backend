import mongoose from "mongoose";
import constants from "../constant";

const AppointmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required!"],
  },

  description: {
    type: String,
    maxlength: [500, "Description cannot be more than 500 characters!"],
  },

  appointmentDate: {
    type: Date,
    required: [true, "Appointment date is required!"],
  },

  appointmentTime: {
    type: Number,
    required: [true, "Appointment time is required!"],
  },

  status: {
    type: Number,
    default: constants.WELLKNOWNSTATUS.PENDING,
  },
});

export default mongoose.model("Appointment", AppointmentSchema);
