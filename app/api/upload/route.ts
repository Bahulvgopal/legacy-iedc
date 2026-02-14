import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { image } = body;

    if (!image) {
      return NextResponse.json(
        { message: "No image provided" },
        { status: 400 }
      );
    }

    const uploaded = await cloudinary.uploader.upload(image, {
      folder: "legacy-iedc",
      resource_type: "image",
    });

    return NextResponse.json({
      url: uploaded.secure_url,
      public_id: uploaded.public_id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Upload failed" },
      { status: 500 }
    );
  }
}
