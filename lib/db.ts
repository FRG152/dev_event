import mongoose from "mongoose";

declare global {
  var mongoose: any;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: true, promise: null };
}

export async function connectionDB() {
  // Si hay una conexion activa, la reutilizaremos (no abrimos una nueva)
  if (cached) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(process.env.MONGODB_URI!, opts);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
