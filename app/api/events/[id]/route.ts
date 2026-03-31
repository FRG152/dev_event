import cloudinary from "@/lib/cloudinary";
import { connectionDB } from "@/lib/db";
import Event from "@/models/Event";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectionDB();

    const { id } = await params;

    const event = await Event.findById(id).lean();

    if (!event) {
      return NextResponse.json({
        success: false,
        error: "Evento no encontrado",
      });
    }

    return NextResponse.json({ success: true, data: event });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener el evento",
      },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectionDB();

    const { id } = await params;
    const body = await req.formData();

    const file = body.get("image") as File;

    let event;

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

    await Event.findByIdAndUpdate(id, event, {
      returnDocument: "after",
    });

    if (!event) {
      return NextResponse.json(
        {
          success: false,
          error: "Evento no encontrado",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: Event });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectionDB();

    const { id } = await params;

    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return NextResponse.json(
        {
          success: false,
          error: "Evento no encontrado",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, error: "Evento eliminado correctamente" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al eliminar evento" },
      { status: 500 },
    );
  }
}
