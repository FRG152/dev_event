"use server";

import Event from "@/models/Event";
import { connectionDB } from "../db";

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await connectionDB();
    const event = await Event.findOne({ slug });
    const similarEvents = await Event.find({
      _id: { $ne: event?._id, tags: { $in: event.tags } },
    });
    return similarEvents;
  } catch {
    return [];
  }
};
