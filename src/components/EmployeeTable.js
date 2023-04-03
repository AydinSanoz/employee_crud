import { Table, Badge } from "react-bootstrap";
import { BiEnvelopeOpen, BiEraser, BiEdit } from "react-icons/bi";
import styles from "@/styles/EmployeeTable.module.css";
import Spinner from "react-bootstrap/Spinner";
import { deleteEmployee, getEmployees } from "@/lib/helper";
import { useSelector, useDispatch } from "react-redux";
import { toggleChangeAction, updateAction } from "@/redux/store";
import { useQuery, useMutation, useQueryClient } from "react-query";

export default function EmployeeTable() {
  const {
    isLoading,
    isError,
    error,
    data: employees,
  } = useQuery("getEmployees", getEmployees);
  if (isLoading) return <Spinner className={styles.center} />;
  if (isError) return <div>{error}</div>;
  if (employees.length === 0) return <div>No data </div>;

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
          {employees?.map((employee, id) => {
            return <TR key={employee._id} employee={employee} />;
          })}
        </tbody>
      </Table>
    </>
  );
}

function TR({ employee }) {
  const visible = useSelector((state) => state.client.toggleForm);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  function toggleToUpdate(id) {
    dispatch(toggleChangeAction());
    if (visible) dispatch(updateAction(id));
  }
  const deleteMutation = useMutation(
    "deleteEmployee",
    (newData) => deleteEmployee(newData),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("getEmployees");
        console.log("deleted", data);
      },
    }
  );
  function handleDelete(id) {
    if (!id) {
      console.log("employee id is not selected");
    }
    deleteMutation.mutate(id);
  }
  if (deleteMutation.isLoading)
    return (
      <tr>
        <td>Deleting...</td>
      </tr>
    );
  if (deleteMutation.isError)
    return (
      <tr>
        <td>{deleteMutation.error.message}</td>
      </tr>
    );

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
        <BiEdit onClick={() => toggleToUpdate(employee._id)} />
        <BiEraser onClick={() => handleDelete(employee._id)} />
        <BiEnvelopeOpen />
      </td>
    </tr>
  );
}
