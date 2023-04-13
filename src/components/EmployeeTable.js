import {
  deleteAction,
  toggleChangeAction,
  updateAction,
} from "@/redux/reducer";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { BiEnvelopeOpen, BiEraser, BiEdit } from "react-icons/bi";
import styles from "@/styles/EmployeeTable.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Table, Badge } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { getEmployees } from "@/lib/helper";
import { useRouter } from "next/router";

export default function EmployeeTable() {
  const {
    isLoading,
    isError,
    error,
    data: employees,
  } = useQuery("getEmployees", getEmployees);
  if (isLoading) return <Spinner className={styles.center} />;
  if (isError) return <div>{error}</div>;
  if (employees.length === 0)
    return (
      <Badge bg="warning" className={styles.center}>
        No data{" "}
      </Badge>
    );

  return (
    <>
      <Table responsive className={styles.table}>
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
          {console.log(employees, "employeetable")}
          {employees?.map((employee, id) => {
            return <TR key={employee._id} employee={employee} />;
          })}
        </tbody>
      </Table>
    </>
  );
}

function TR({ employee }) {
  const router = useRouter();
  const formVisible = useSelector((state) => state.client.formVisible);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  function onUpdate() {
    dispatch(toggleChangeAction());
    dispatch(updateAction(employee._id));
    if (!formVisible) window.scrollTo(0, 0);
  }
  function onDelete() {
    console.log(formVisible);
    if (!formVisible) {
      dispatch(deleteAction(employee._id));
    } else {
      dispatch(toggleChangeAction());
    }
  }
  function onEmail() {
    console.log("onEmail pressed");
    router.push(`employee/${employee._id}`);
  }

  return (
    <tr key={employee._id}>
      <td>{employee._id}</td>
      <td>#</td>
      <td>{employee.firstName}</td>
      <td>{employee.lastName} </td>
      <td>{employee.email} </td>
      <td>{employee.phone} </td>
      <td>{employee.description} </td>
      <td className={styles.biIcon}>
        <BiEdit className={styles.editbutton} onClick={onUpdate} />
        <BiEraser className={styles.deletebutton} onClick={onDelete} />
        <BiEnvelopeOpen className={styles.emailbutton} onClick={onEmail} />
      </td>
    </tr>
  );
}
