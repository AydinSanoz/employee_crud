import {
  deleteAction,
  toggleChangeAction,
  updateAction,
} from "@/redux/reducer";
import { deleteEmployee, getEmployees } from "@/lib/helper";
import EmployeeTable from "@/components/EmployeeTable";
import { useSelector, useDispatch } from "react-redux";
import styles from "@/styles/Home.module.css";
import { useQueryClient } from "react-query";
import { Button } from "react-bootstrap";
import Form from "@/components/Form";
import Head from "next/head";

export default function Home() {
  const formVisible = useSelector((state) => state.client.formVisible);
  const deleteId = useSelector((state) => state.client.deleteId);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  function handler() {
    dispatch(toggleChangeAction());
    dispatch(updateAction());
  }

  async function handleDelete() {
    console.log("handledelete", deleteId);
    await deleteEmployee(deleteId).then((res) => console.log("deleted", res));
    queryClient.prefetchQuery("getEmployees", getEmployees);
    dispatch(deleteAction(null));
  }
  function handleCancel() {
    console.log("Delete is cancelled");
    dispatch(deleteAction(null));
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
        <div className={styles.content}>
          <Button variant="primary" onClick={handler} className={styles.button}>
            Add Employee
          </Button>
          {deleteId && (
            <DeleteComponenet
              handleDelete={handleDelete}
              handleCancel={handleCancel}
            />
          )}
        </div>
        {formVisible && <Form />}
        <EmployeeTable />
      </main>
    </>
  );
}

function DeleteComponenet({ handleDelete, handleCancel }) {
  return (
    <div className={styles.container}>
      <span>Do you want to delete? </span>
      <div>
        <button className={styles.yes} onClick={handleDelete}>
          Yes
        </button>
        <button className={styles.no} onClick={handleCancel}>
          No
        </button>
      </div>
    </div>
  );
}
