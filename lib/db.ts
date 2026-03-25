import mongoose from "mongoose";

let isConnected = false;

export async function connectionDB() {
  if (isConnected) return;

  mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI!);

  isConnected = true;
}
