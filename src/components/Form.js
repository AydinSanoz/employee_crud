import AddEmployee from "./AddEmployee";
import UpdateEmployee from "./UpdateEmployee";
import { useSelector } from "react-redux";
import { getEmployee, updateEmployee } from "@/lib/helper";
import { useQueryClient, useMutation } from "react-query";

export default function Form() {
  const updateId = useSelector((state) => state.client.updateID);
  const queryClient = useQueryClient();
  const updateMutation = useMutation(
    "updateEmployee",
    (newData) => {
      updateEmployee(newData, updateId);
    },
    {
      onSuccess: async (data) => {
        console.log("data updated");
        queryClient.prefetchQuery("getEmployees");
      },
    }
  );

  {
    return updateId
      ? UpdateEmployee({ updateId, updateMutation })
      : AddEmployee({});
  }
}
