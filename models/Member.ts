import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },

    role: { type: String, required: true },

    year: { type: String, required: true },

    status: {
      type: String,
      enum: ["current", "ex"],
      default: "current",
    },

    priority: {
      type: Number,
      default: 0, // for drag ordering
    },

    isMentor: {
      type: Boolean,
      default: false,
    },

    bio: { type: String },

    linkedin: { type: String },
    github: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Member ||
  mongoose.model("Member", MemberSchema);
