import EmployeeTable from "@/components/EmployeeTable";
import AddEmployee from "@/components/AddEmployee";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Head from "next/head";
import { getEmployees } from "@/lib/helper";

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      getEmployees().then((data) => setEmployees(data));
    }, 5000);
  }, [employees]);

  const handleVisible = () => {
    setVisible(!visible);
  };

  return (
    <>
      <Head>
        <title>Empleyee App</title>
        <meta name="description" content="Generated for employee record" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Button onClick={handleVisible}>Add Employee</Button>
        {visible && <AddEmployee onVisible={handleVisible} />}
        <EmployeeTable onVisible={handleVisible} employees={employees} />
      </main>
    </>
  );
}
