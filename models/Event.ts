import mongoose, { Document, Schema, Model } from "mongoose";

export interface IEvent extends Document {
  slug: string;
  image: string;
  title: string;
  location: string;
  date: Date;
  capacity: number;
  status: "draft" | "published" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, "El titulo es requerido"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "El slug es requerido"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "La localizacion es requerida"],
    },
    image: {
      type: String,
      required: [true, "La imagen es requerida"],
    },
    capacity: {
      type: Number,
      min: [1, "La capacidad minima es 1"],
      default: 1,
    },
    status: {
      type: String,
      enum: ["draft", "published", "cancelled"],
      default: "draft",
    },
    date: {
      type: Date,
      required: [true, "La fecha es requerida"],
    },
  },
  {
    timestamps: true,
  },
);

const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

export default Event;
