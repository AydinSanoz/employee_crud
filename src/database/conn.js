import mongoose from "mongoose";

export default async function connectDB() {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(({ connection }) => {
      if (connection.readyState == 1) {
        console.log("database is connected");
      }
    })
    .catch((err) => console.log("error", err));
}
