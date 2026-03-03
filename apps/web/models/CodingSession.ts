import mongoose from "mongoose";

const CodingSessionSchema = new mongoose.Schema({
  startTime: Number,
  endTime: Number,
  project: String,
  duration: Number,
  language: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.models.CodingSession ||  mongoose.model("CodingSession", CodingSessionSchema);