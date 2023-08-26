import mongoose from "mongoose";
import constants from "../constant";

const HelperSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },

    description: {
      type: String,
    },

    categoryType: {
      type: String,
      required: [true, "Category type is required"],
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

export default mongoose.model("Helper", HelperSchema);
