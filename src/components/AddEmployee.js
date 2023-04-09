import { Button, Col, Form, Row, Badge } from "react-bootstrap";
import { Formik } from "formik";

import { getEmployees, postEmployee } from "@/lib/helper";
import { useMutation, useQueryClient } from "react-query";
import styles from "@/styles/AddEmployee.module.css";
import { useDispatch } from "react-redux";

export default function AddEmployee({ schema }) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const addMutation = useMutation(postEmployee, {
    onSuccess: (data) => {
      console.log("data Added", data);
      queryClient.prefetchQuery("getEmployees", getEmployees);
    },
  });

  function handleAdd(formData) {
    if (Object.keys(formData).length == 0) {
      console.log("Dont have form data");
    }
    addMutation.mutate(formData);
  }

  if (addMutation.isLoading) return <div>Loading...</div>;
  if (addMutation.isError)
    return (
      <Badge className={styles.center} bg="danger">
        {addMutation.error.message}
      </Badge>
    );
  if (addMutation.isSuccess)
    return (
      <Badge className={styles.center} bg="success">
        Data added
      </Badge>
    );

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleAdd}
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        description: "",
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
          <Button type="submit" variant="info">
            Add
          </Button>
        </Form>
      )}
    </Formik>
  );
}
