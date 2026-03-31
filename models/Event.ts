import mongoose, { Document, Schema, Model } from "mongoose";

export interface IEvent extends Document {
  title: string;
  slug: string;
  image: string;
  location: string;
  date: Date;
  tags: string[];
  overview: string;
  capacity: number;
  status: "draft" | "published" | "cancelled";
  agenda: { time: string; title: string }[];
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    tags: {
      type: [],
      required: [true, "Tags is required"],
    },
    overview: {
      type: String,
      required: [true, "Overview is required"],
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
    agenda: {
      type: [],
      required: [true, "Agenda is required"],
    },
  },
  {
    timestamps: true,
  },
);

const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

export default Event;
