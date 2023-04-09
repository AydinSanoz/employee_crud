import AddEmployee from "./AddEmployee";
import UpdateEmployee from "./UpdateEmployee";
import { useSelector } from "react-redux";
import * as yup from "yup";

export default function Form() {
  const updateId = useSelector((state) => state.client.updateID);
  const schema = yup.object().shape({
    firstName: yup.string().min(2, "Too Short").max(20, "Too Long").required(),
    lastName: yup.string().min(2, "Too Short").max(20, "Too Long").required(),
    email: yup.string().email("Invalid Email").required(),
    phone: yup.number().required(),
    description: yup
      .string()
      .min(5, "Too Short")
      .max(100, "Too Long")
      .required(),
    terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
  });

  {
    return updateId
      ? UpdateEmployee({ updateId, schema })
      : AddEmployee({ schema });
  }
}
