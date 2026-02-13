import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 });
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const event = await Event.create({
      ...body,
      eventDate: new Date(body.eventDate),
      registrationDeadline: new Date(body.registrationDeadline),
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create event" },
      { status: 500 }
    );
  }
}
