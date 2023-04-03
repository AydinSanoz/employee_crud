import EmployeeTable from "@/components/EmployeeTable";
import { Button } from "react-bootstrap";
import Head from "next/head";
import { getEmployee, getEmployees } from "@/lib/helper";
import { useSelector, useDispatch } from "react-redux";
import { toggleChangeAction, updateAction } from "@/redux/store";
import Form from "@/components/Form";
import { useQuery } from "react-query";

export default function Home() {
  const visible = useSelector((state) => state.client.toggleForm);
  const dispatch = useDispatch();

  function handler() {
    dispatch(toggleChangeAction());
    dispatch(updateAction());
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
        <Button variant="primary" onClick={handler}>
          Add Employee
        </Button>
        {visible && <Form />}
        <EmployeeTable />
      </main>
    </>
  );
}
