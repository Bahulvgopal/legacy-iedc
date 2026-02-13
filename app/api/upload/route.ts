import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file = data.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    // 🔥 unique filename
    const ext = file.name.split(".").pop();
    const uniqueName =
      crypto.randomUUID() + "." + ext;

    const filePath = path.join(uploadDir, uniqueName);

    await fs.writeFile(filePath, buffer);

    return NextResponse.json({
      message: "Upload successful",
      filePath: `/uploads/${uniqueName}`,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Upload failed" },
      { status: 500 }
    );
  }
}
