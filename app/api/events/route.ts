import { connectionDB } from "@/lib/db";
import Event from "@/models/Event";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectionDB(); // Siempre conectar antes de cualquier query

    const events = await Event.find({}).sort({ date: -1 }).lean();

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

    const body = await req.json();

    const event = await Event.create(body);

    return NextResponse.json({ success: true, data: event }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al crear evento" },
      { status: 500 },
    );
  }
}
