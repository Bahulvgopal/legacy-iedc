import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import Registration from "@/models/Registration";
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

    const event = await Event.findById(id);

    if (!event) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json(event);
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

    const oldEvent = await Event.findById(id);

    if (!oldEvent) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    // 🔥 delete old image if changed
    if (
      oldEvent.imageUrl &&
      body.imageUrl &&
      oldEvent.imageUrl !== body.imageUrl
    ) {
      const oldPath = path.join(
        process.cwd(),
        "public",
        oldEvent.imageUrl
      );

      await fs.unlink(oldPath).catch(() => {});
    }

    const updated = await Event.findByIdAndUpdate(
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

    const event = await Event.findById(id);

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    const eventId = new mongoose.Types.ObjectId(id);

    // 🔥 force delete registrations
    await Registration.deleteMany({ eventId });

    // 🔥 delete event image
    if (event.imageUrl) {
      const filePath = path.join(
        process.cwd(),
        "public",
        event.imageUrl
      );

      await fs.unlink(filePath).catch(() => {});
    }

    await Event.findByIdAndDelete(eventId);

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Delete failed" },
      { status: 500 }
    );
  }
}
