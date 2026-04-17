import mongoose from "mongoose";
const EntrySchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },

    text: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Entry =
  mongoose.models.Entry ?? mongoose.model("Entry", EntrySchema);

export default Entry;

