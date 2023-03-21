export async function getEmployees() {
  const response = await fetch("http://localhost:3000/api/employee");
  const json = response.json();
  return json;
}

export async function getEmployee(id) {
  const response = await fetch(`http://localhost:3000/api/employee/${id}`);
  const json = response.json();
  return json;
}

export async function postEmployee(formData) {
  const Options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };
  const response = await fetch("http://localhost:3000/api/employee", Options);
  const json = response.json();
  return json;
}

export async function updateEmployee(formData, id) {
  const Options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };
  const response = await fetch(
    `http://localhost:3000/api/employee/${id}`,
    Options
  );
  const json = response.json();
  return json;
}

export async function deleteEmployee(id) {
  const Options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(
    `http://localhost:3000/api/employee/${id}`,
    Options
  );
  const json = response.json();
  return json;
}

export async function deleteEmployees() {
  const Options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch("http://localhost:3000/api/employee");
  const json = response.json();
  return json;
}
