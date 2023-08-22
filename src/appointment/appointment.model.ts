import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  image: {
    type: String,
  },
});

export default mongoose.model("Appointment", AppointmentSchema);
