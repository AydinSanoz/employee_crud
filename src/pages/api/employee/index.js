import connectDB from "@/database/conn";

export default function handler(req, res) {
  connectDB().catch((err) => console.log(err));

  const { method } = req;

  switch (method) {
    case "GET":
      res.status(201).json({ method: "GET method" });
      break;
    case "POST":
      res.status(201).json({ method: "POST method" });
      break;
    case "PUT":
      res.status(201).json({ method: "PUT method" });
      break;
    case "DELETE":
      res.status(201).json({ method: "DELETE method" });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`method: ${method} is not allowed`);
      break;
  }
}
