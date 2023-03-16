import Table from "react-bootstrap/Table";
import { BiEnvelopeOpen, BiEraser, BiEdit } from "react-icons/bi";

function EmployeeTable(props) {
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
        <tr>
          <td>1</td>
          <td>#</td>
          <td>Aydin</td>
          <td>Sanoz</td>
          <td>a_sanoz@hotmail.com</td>
          <td>+417068072</td>
          <td>Human Resource</td>
          <td>
            <BiEdit onClick={props.onEdit} />
            <BiEraser />
            <BiEnvelopeOpen />
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default EmployeeTable;
