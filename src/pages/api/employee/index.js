import connectDB from "@/database/conn";
import {
  deleteEmployees,
  getEmployees,
  postEmployee,
} from "@/database/controller";

export default function handler(req, res) {
  connectDB().catch((err) => console.log(err));
  const { method } = req;

  switch (method) {
    case "GET":
      getEmployees(req, res);
      break;
    case "POST":
      postEmployee(req, res);
      break;
    case "DELETE":
      deleteEmployees(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`method: ${method} is not allowed`);
      break;
  }
}
