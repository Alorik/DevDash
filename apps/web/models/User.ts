import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CodingSession =
  mongoose.models.User ?? mongoose.model("User", UserSchema);

export default CodingSession;
