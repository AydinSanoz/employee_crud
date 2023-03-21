import Table from "react-bootstrap/Table";
import { BiEnvelopeOpen, BiEraser, BiEdit } from "react-icons/bi";
import styles from "@/styles/EmployeeTable.module.css";
import Spinner from "react-bootstrap/Spinner";

import { deleteEmployee } from "@/lib/helper";

const TR = ({ onEdit, onDelete, employee }) => (
  <tr key={employee._id}>
    <td>{employee._id}</td>
    <td>#</td>
    <td>{employee.firstName}</td>
    <td>{employee.lastName} </td>
    <td>{employee.email} </td>
    <td>{employee.phone} </td>
    <td>{employee.description} </td>
    <td className={styles.biIcon}>
      <BiEdit onClick={() => onEdit(employee._id)} />
      <BiEraser
        onClick={() => {
          onDelete(employee._id);
        }}
      />
      <BiEnvelopeOpen />
    </td>
  </tr>
);

export default function EmployeeTable({ onUpdate, employees }) {
  const handleDelete = (id) => {
    deleteEmployee(id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>No</th>
          <th>Avatar</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone number</th>
          <th>Department</th>
          <th>Operations</th>
        </tr>
      </thead>

      {!employees ? (
        <Spinner className={styles.spinner} />
      ) : (
        <tbody>
          {employees?.map((employee, id) => {
            return (
              <TR
                key={employee._id}
                onEdit={onUpdate}
                onDelete={handleDelete}
                employee={employee}
              />
            );
          })}
        </tbody>
      )}
    </Table>
  );
}
