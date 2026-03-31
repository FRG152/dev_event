import mongoose from "mongoose";

export async function connectionDB() {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI!);
    mongoose.set("debug", true);
  } catch (error) {
    console.log("No se pudo conectar a la base de datos");
  }
}
