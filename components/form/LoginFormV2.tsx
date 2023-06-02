"use client";


import React from "react";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import TextField from "@mui/material/TextField";
import { Formik,Form } from "formik";

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
        //this code is meant to set session into the browser but I have yet to make it work
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
