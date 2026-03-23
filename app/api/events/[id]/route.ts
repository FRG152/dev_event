import { connectionDB } from "@/lib/db";
import Event from "@/models/Event";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await connectionDB();

    const event = await Event.findById(params.id).lean();

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
  { params }: { params: { id: string } },
) {
  try {
    await connectionDB();

    const body = await req.json();

    const event = await Event.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
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
    return NextResponse.json({ success: false, error: "" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await connectionDB();

    const event = await Event.findByIdAndDelete(params.id);

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
