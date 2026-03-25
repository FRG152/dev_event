import Event from "@/models/Event";
import { connectionDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function GET(req: NextRequest) {
  try {
    await connectionDB(); // Siempre conectar antes de cualquier query

    // .lean() retorna Objetos JS planos (mas rapido, menos memoria)
    const events = await Event.find({}).lean();

    return NextResponse.json({ success: true, data: events });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener eventos",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectionDB();

    const body = await req.formData();

    let event;

    try {
      event = Object.fromEntries(body);
    } catch (error) {
      return NextResponse.json({ message: "JSON invalido" }, { status: 500 });
    }

    const file = body.get("image") as File;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "dev-event" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    console.log("uploadResult:", uploadResult);

    event.image = uploadResult;

    const createEvent = await Event.create(event);

    return NextResponse.json(
      { success: true, data: createEvent },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al crear evento" },
      { status: 500 },
    );
  }
}
