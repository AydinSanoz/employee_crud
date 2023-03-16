import connectDB from "@/database/conn";
import { employeeModel } from "@/models/employeeModel";

export default function handler(req, res) {
  connectDB().catch((err) => console.log(err));

  const { method } = req;

  switch (method) {
    case "GET":
      employeeModel
        .find()
        .then((respond) =>
          respond.length
            ? res.status(201).json(respond)
            : res.status(201).json({ data: "There is no data" })
        )
        .catch((err) => res.status(401).json({ err: err }));
      break;
    case "POST":
      const formData = req.body;
      const employee = new employeeModel(formData);
      employee
        .save()
        .then((respond) => res.status(201).json(respond))
        .catch((err) =>
          res.status(401).json(`Employe is not recorded: ${err.message}`)
        );
      res.status(201).json({ formdata: formData });
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
