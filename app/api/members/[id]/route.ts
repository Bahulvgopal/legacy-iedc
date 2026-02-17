import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Member from "@/models/Member";
import mongoose from "mongoose";
import fs from "fs/promises";
import path from "path";

type Context = {
  params: Promise<{ id: string }>;
};

/* ================= GET ================= */
export async function GET(req: Request, context: Context) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid ID" },
        { status: 400 }
      );
    }

    const member = await Member.findById(id);

    if (!member) {
      return NextResponse.json(
        { message: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json(
      { message: "Fetch failed" },
      { status: 500 }
    );
  }
}

/* ================= PUT ================= */
export async function PUT(req: Request, context: Context) {
  try {
    await connectDB();

    const { id } = await context.params; // ✅ FIX
    const body = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid ID" },
        { status: 400 }
      );
    }

    const oldMember = await Member.findById(id);

    if (!oldMember) {
      return NextResponse.json(
        { message: "Not found" },
        { status: 404 }
      );
    }

    // delete old image if changed
    if (
      oldMember.image &&
      body.image &&
      oldMember.image !== body.image
    ) {
      const oldPath = path.join(
        process.cwd(),
        "public",
        oldMember.image
      );

      await fs.unlink(oldPath).catch(() => {});
    }

    const updated = await Member.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { message: "Update failed" },
      { status: 500 }
    );
  }
}

/* ================= DELETE ================= */
export async function DELETE(req: Request, context: Context) {
  try {
    await connectDB();

    const { id } = await context.params; // ✅ FIX

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid ID" },
        { status: 400 }
      );
    }

    const member = await Member.findById(id);

    if (!member) {
      return NextResponse.json(
        { message: "Not found" },
        { status: 404 }
      );
    }

    if (member.image) {
      const filePath = path.join(
        process.cwd(),
        "public",
        member.image
      );

      await fs.unlink(filePath).catch(() => {});
    }

    await Member.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Delete failed" },
      { status: 500 }
    );
  }
}
