import { Badge, Button, Form, Row, Col } from "react-bootstrap";
import styles from "@/styles/AddEmployee.module.css";
import { getEmployee } from "@/lib/helper";
import { useQuery } from "react-query";
import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object().shape({
  firstName: yup.string().min(2, "Too Short").max(20, "Too Long").required(),
  lastName: yup.string().min(2, "Too Short").max(20, "Too Long").required(),
  email: yup.string().email("Invalid Email").required(),
  phone: yup.number().required(),
  description: yup.string().min(5, "Too Short").max(100, "Too Long").required(),
  terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
});

export default function UpdateEmployee({ updateId, updateMutation }) {
  const {
    isLoading,
    isError,
    error,
    data: employee,
  } = useQuery(["getEmployee", updateId], () => getEmployee(updateId));
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;
  const { firstName, lastName, email, phone, description } = employee;

  async function handleUpdate(values) {
    if (Object.keys(values).length === 0) {
      console.log("No formData");
    }
    await updateMutation.mutate(values);
  }

  if (updateMutation.isLoading) return <div>Loading...</div>;
  if (updateMutation.isError)
    return (
      <Badge bg="danger" className={styles.center}>
        {updateMutation.error.message}
      </Badge>
    );
  if (updateMutation.isSuccess) {
    return (
      <Badge bg="success" className={styles.center}>
        Data Updated
      </Badge>
    );
  }

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleUpdate}
      initialValues={{
        firstName,
        lastName,
        email,
        phone,
        description,
        terms: false,
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        isInvalid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationFormikFirstName">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="firstName"
                value={values.firstName}
                onChange={handleChange}
                isValid={touched.firstName && !errors.firstName}
                isInvalid={errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormikLastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="lastName"
                value={values.lastName}
                onChange={handleChange}
                isValid={touched.lastName && !errors.lastName}
                isInvalid={errors.lastName}
              />

              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormikEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                placeholder="email"
                value={values.email}
                onChange={handleChange}
                isValid={touched.email && !errors.email}
                isInvalid={errors.email}
              />

              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationFormikPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="number"
                placeholder="Phone Number..."
                name="phone"
                value={values.phone}
                onChange={handleChange}
                isValid={values.phone && !errors.phone}
                isInvalid={errors.phone}
              />

              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="8" controlId="validationFormikDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                name="description"
                value={values.description}
                onChange={handleChange}
                isValid={touched.description && !errors.description}
                isInvalid={errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Check
              required
              name="terms"
              label="Agree to terms and conditions"
              onChange={handleChange}
              isInvalid={!!errors.terms}
              feedback={errors.terms}
              feedbackType="invalid"
              id="validationFormik0"
            />
          </Form.Group>
          <Button type="submit" variant="danger">
            Update
          </Button>
        </Form>
      )}
    </Formik>
  );
}
