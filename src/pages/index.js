import EmployeeTable from "@/components/EmployeeTable";
import AddEmployee from "@/components/AddEmployee";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Head from "next/head";
import { getEmployee, getEmployees } from "@/lib/helper";
import UpdateEmployee from "@/components/UpdateEmployee";
import { useSelector } from "react-redux";

export default function Home() {
  const visible = useSelector((state) => state.client.toggleForm);
  const [flag, setFlag] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState();

  useEffect(() => {
    setTimeout(() => {
      getEmployees().then((data) => setEmployees(data));
    }, 2000);
  }, [employees]);

  function handleUpdate(id) {
    !visible && setVisible(!visible);
    getEmployee(id).then((res) => {
      setEmployee(res);
    });
    setFlag("true");
  }

  return (
    <>
      <Head>
        <title>Empleyee App</title>
        <meta name="description" content="Generated for employee record" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Button variant="primary">Add Employee</Button>
        {flag
          ? visible && <UpdateEmployee {...employee} />
          : visible && <AddEmployee />}
        <EmployeeTable employees={employees} />
      </main>
    </>
  );
}
