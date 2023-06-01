"use client";

import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { Button, Card, CardContent, CardHeader, TextField } from "@mui/material";

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;


const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter an email")
    .test("email-match", "Wrong email", function (value) {
      const password = this.parent.password;
      return value === "email@example.com" && password === "password123";
    }),
  password: Yup.string().test(
    "password-match",
    "Wrong password",
    function (value) {
      const email = this.parent.email;
      return email === "email@example.com" && value === "password123";
    }
  ),
});

function LoginFormV2() {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={(values, actions) => {
        actions.resetForm();
        // sessionStorage.setItem("email", values.email);
        // sessionStorage.setItem("password", values.password);
      }}
    >
      {(props) => (
        <Card className="flex flex-col items-center p-5">
          <CardHeader title="Login" />
          <CardContent>
        <Form className="flex justify-between">
          <TextField
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            
          />

          <Button disabled={props.isSubmitting} type="submit">
            Submit
          </Button>
          {props.errors.email && <p>{props.errors.email}</p>}
          {props.errors.password && <p>{props.errors.password}</p>}
        </Form>
        </CardContent>
        </Card>
      )}
    </Formik>
  );
}

export default LoginFormV2;
