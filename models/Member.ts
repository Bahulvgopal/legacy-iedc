import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true }, // 🔥 must be image
    role: { type: String, required: true },
    year: { type: String, required: true },
    status: { type: String, default: "current" },
    bio: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Member ||
  mongoose.model("Member", MemberSchema);
