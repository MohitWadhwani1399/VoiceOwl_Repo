import mongoose from "mongoose";

export async function connectMongoDB(): Promise<void> {
  const mongodb_uri = process.env.MONGODB_URI;

  if (!mongodb_uri) {
    throw new Error("MONGODB_URI is not defined");
  }

  mongoose.set("strictQuery", true);
  // strictQuery is set to true to avoid searching fields which are not in schema.

  await mongoose.connect(mongodb_uri, {
    maxPoolSize: 50,
    serverSelectionTimeoutMS: 5000,
  });

  console.log("MongoDB connected");
}

export async function disconnectMongo() {
  await mongoose.disconnect();
  console.log("MongoDB disconnected");
}
