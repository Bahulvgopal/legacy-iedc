import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Member from "@/models/Member";
import mongoose from "mongoose";
import fs from "fs/promises";
import path from "path";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const member = await Member.findById(id);

    if (!member) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json(
      { message: "Fetch failed" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;
    const body = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const oldMember = await Member.findById(id);

    if (!oldMember) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    // 🔥 delete old image if changed
    if (
      oldMember.imageUrl &&
      body.imageUrl &&
      oldMember.imageUrl !== body.imageUrl
    ) {
      const oldPath = path.join(
        process.cwd(),
        "public",
        oldMember.imageUrl
      );

      await fs.unlink(oldPath).catch(() => {});
    }

    const updated = await Member.findByIdAndUpdate(
      id,
      body,
      { returnDocument: "after" }
    );

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { message: "Update failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const member = await Member.findById(id);

    if (!member) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    // 🔥 delete image file
    if (member.imageUrl) {
      const filePath = path.join(
        process.cwd(),
        "public",
        member.imageUrl
      );

      await fs.unlink(filePath).catch(() => {});
    }

    await Member.findByIdAndDelete(id);

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Delete failed" },
      { status: 500 }
    );
  }
}
