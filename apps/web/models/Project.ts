import mongoose from "mongoose";
const ProjectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    userId: String,
  },
  {
    timestamps: true,
  },
);

const Project =
  mongoose.models.Project ?? mongoose.model("Project", ProjectSchema);

export default Project;
