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

    const file = body.get("image") as File;

    try {
      event = Object.fromEntries(body);
    } catch (error) {
      return NextResponse.json({ message: "JSON invalido" }, { status: 500 });
    }

    if (typeof file === "string") {
      const uploadResult = await cloudinary.uploader.upload(file, {
        folder: "dev-event",
      });

      event.image = uploadResult.secure_url;
    }

    event.agenda = JSON.parse(body.get("agenda"));
    event.tags = JSON.parse(body.get("tags"));

    const createEvent = await Event.create(event);

    return NextResponse.json(
      { success: true, data: createEvent },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Error al crear evento" },
      { status: 500 },
    );
  }
}
