import { connectDB } from "@/lib/mongodb";
import Member from "@/models/Member";
import ExMembersClient from "./ExMembersClient";
export const dynamic = "force-dynamic";

export default async function ExMembersPage() {
  await connectDB();
  
  const members = await Member.find({ status: "ex" }).sort({
    year: -1,
    priority: 1,
  });

  // Convert to plain objects
  const plainMembers = members.map((member) => ({
    _id: member._id.toString(),
    name: member.name,
    image: member.image,
    role: member.role,
    year: member.year,
  }));

  return <ExMembersClient members={plainMembers} />;
}