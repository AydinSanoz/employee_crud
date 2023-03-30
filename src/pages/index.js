import EmployeeTable from "@/components/EmployeeTable";
import AddEmployee from "@/components/AddEmployee";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Head from "next/head";
import { getEmployee, getEmployees } from "@/lib/helper";
import UpdateEmployee from "@/components/UpdateEmployee";

export default function Home() {
  const [visible, setVisible] = useState(false);
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

  function handleVisible() {
    setVisible(!visible);
    setFlag(false);
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
        <Button onClick={handleVisible} variant="primary">
          Add Employee
        </Button>
        {flag
          ? visible && (
              <UpdateEmployee {...employee} onVisible={handleVisible} />
            )
          : visible && <AddEmployee onVisible={handleVisible} />}
        <EmployeeTable onUpdate={handleUpdate} employees={employees} />
      </main>
    </>
  );
}
