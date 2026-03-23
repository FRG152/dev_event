import mongoose, { Schema, Document, Model, model } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  location: string;
  capacity: number;
  status: "draft" | "published" | "cancelled";
  createAt: Date;
  updateAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, "El titulo es requerido"],
      trim: true,
      maxLength: [100, "Maximo 100 caracteres"],
    },
    description: {
      type: String,
      required: [true, "La descripcion es requerida"],
    },
    date: {
      type: Date,
      required: [true, "La fecha es requerida"],
    },
    location: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      min: [1, "La capacidad minima es 1"],
      default: 100, // Valor por defecto si no se agrega un valor
    },
    status: {
      type: String,
      enum: ["draft", "published", "cancelled"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  },
);

const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

export default Event;
