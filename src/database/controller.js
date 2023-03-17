import { employeeModel } from "@/models/employeeModel";

export async function getEmployees(req, res) {
  await employeeModel
    .find()
    .then((employees) =>
      employees.length
        ? res.status(200).json(employees)
        : res.status(201).json({ employees: "No employees" })
    )
    .catch((err) => res.status(401).json({ error: err.message }));
}

export async function getEmployee(req, res) {
  const { id } = req.query;
  if (id) {
    await employeeModel
      .findById(id)
      .then((employee) =>
        employee
          ? res.status(201).json(employee)
          : res.status(404).json({ employee: "employee can not selected" })
      )
      .catch((err) => res.status(404).json({ error: err.message }));
  }
  res.status(404).json({ error: "employee can not provided" });
}

export async function postEmployee(req, res) {
  const formData = req.body;
  const employee = new employeeModel(formData);

  await employee
    .save()
    .then((employee) => res.status(200).json(employee))
    .catch((err) => res.status(401).json({ error: err.message }));
}

export async function updateEmployee(req, res) {
  const { id } = req.query;
  const formData = req.body;
  if (id && formData) {
    await employeeModel
      .findByIdAndUpdate(id, formData)
      .then((employee) => res.status(200).json({ updated: employee }))
      .catch((err) => res.status(401).json({ error: err.message }));
  }
  res.status(401).json({ error: "employee can not provided" });
}

export async function deleteEmployee(req, res) {
  const { id } = req.query;
  if (id) {
    await employeeModel
      .findByIdAndDelete(id)
      .then((employee) => res.status(200).json({ deletedData: employee }))
      .catch((err) => res.status(404).json({ errror: err.message }));
  }
  res.status(401).json({ errror: "Employee can not provided" });
}

export async function deleteEmployees(req, res) {
  employeeModel
    .deleteMany()
    .then((employees) => {
      employees;
      res.status(200).json({ employees: employees });
    })
    .catch((err) => res.status(404).json({ error: err.message }));
}
