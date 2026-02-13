import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const location = formData.get("location") as string;
    const eventDate = formData.get("eventDate") as string;
    const registrationDeadline = formData.get("registrationDeadline") as string;
    const imageFile = formData.get("image") as File;

    if (
      !title ||
      !description ||
      !location ||
      !eventDate ||
      !registrationDeadline ||
      !imageFile
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // convert image to base64
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${imageFile.type};base64,${buffer.toString("base64")}`;

    const event = await Event.create({
      title,
      description,
      location,
      eventDate,
      registrationDeadline,
      image: base64Image,
    });

    return NextResponse.json(event, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Event creation failed" },
      { status: 500 }
    );
  }
}
