import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { postEmployee } from "@/lib/helper";
import { useEffect } from "react";
import { Badge } from "react-bootstrap";
import styles from "@/styles/AddEmployee.module.css";

const schema = yup.object().shape({
  firstName: yup.string().min(2, "Too Short").max(10, "Too Long").required(),
  lastName: yup.string().min(2, "Too Short").max(10, "Too Long").required(),
  email: yup.string().email("Invalid Email").required(),
  phone: yup.number().required(),
  description: yup
    .string()
    .min(10, "Too Short")
    .max(100, "Too Long")
    .required(),
  terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
});

export default function AddEmployee({ onVisible }) {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    Object.keys(formData).length &&
      postEmployee(formData)
        .then((res) => {
          console.log(res), onVisible();
        })
        .catch((err) => console.log(err));
  }, [formData]);

  return (
    <Formik
      validationSchema={schema}
      onSubmit={setFormData}
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
          <Badge bg="success" className={styles.center}>
            Data is Recorded
          </Badge>
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
            Submit form
          </Button>
        </Form>
      )}
    </Formik>
  );
}
