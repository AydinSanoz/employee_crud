import connectDB from "@/database/conn";
import {
  updateEmployee,
  getEmployee,
  deleteEmployee,
} from "@/database/controller";

export default function handler(req, res) {
  connectDB().catch((err) => console.log(err));
  const { method } = req;

  switch (method) {
    case "GET":
      getEmployee(req, res);
      break;
    case "PUT":
      updateEmployee(req, res);
      break;
    case "DELETE":
      deleteEmployee(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`method : ${method} is not allowed`);
      break;
  }
}
