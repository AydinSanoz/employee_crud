import EmployeeTable from "@/components/EmployeeTable";
import AddEmployee from "@/components/AddEmployee";
import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import { Button } from "react-bootstrap";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [visible, setVisible] = useState(true);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getEmployees().then((data) => setEmployees(data));
  }, []);

  const handleUpdate = () => {
    !visible && setVisible(!visible);
  };
  const handleVisible = () => {
    setVisible(!visible);
  };
  const getEmployees = async () => {
    const response = await fetch("http://localhost:3000/api/employee");
    const json = response.json();
    return json;
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
        {visible && <AddEmployee />}
        <EmployeeTable onEdit={handleUpdate} employees={employees} />
      </main>
    </>
  );
}
