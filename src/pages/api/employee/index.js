import connectDB from "@/database/conn";

export default function handler(req, res) {
  connectDB().catch((err) => console.log(err));

  res.status(201).json({ name: "Aydın Sanoz2" });
}
