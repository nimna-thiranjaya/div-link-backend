import mongoose from "mongoose";
import constants from "../../constant";

const ConverSationSchema = new mongoose.Schema(
  {
    memberOne: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "MemberOne is required"],
    },

    memberTwo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "MemberTwo is required"],
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Company is required"],
    },
    status: {
      type: Number,
      default: constants.WELLKNOWNSTATUS.ACTIVE,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Conversation", ConverSationSchema);
