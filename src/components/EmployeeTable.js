import Table from "react-bootstrap/Table";
import { BiEnvelopeOpen, BiEraser, BiEdit } from "react-icons/bi";

const TR = ({ id, onEdit, employee }) => (
  <tr key={id}>
    <td>1</td>
    <td>#</td>
    <td>{employee.firstName}</td>
    <td>{employee.lastName} </td>
    <td>{employee.email} </td>
    <td>{employee.phone} </td>
    <td>{employee.description} </td>
    <td>
      <BiEdit onClick={onEdit} />
      <BiEraser />
      <BiEnvelopeOpen />
    </td>
  </tr>
);

function EmployeeTable({ onEdit, employees }) {
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
      <tbody>
        {employees.map((employee, id) => {
          return <TR id={id} onEdit={onEdit} employee={employee} />;
        })}
      </tbody>
    </Table>
  );
}

export default EmployeeTable;
