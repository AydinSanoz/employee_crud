import Head from "next/head";
import { Inter } from "next/font/google";
import AddEmployee from "@/components/AddEmployee";
import EmployeeTable from "@/components/EmployeeTable";
import { useState } from "react";
import { Button } from "react-bootstrap";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [visible, setVisible] = useState(true);

  const handleUpdate = () => {
    !visible && setVisible(!visible);
  };
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
        {visible && <AddEmployee />}
        <EmployeeTable onEdit={handleUpdate} />
      </main>
    </>
  );
}
