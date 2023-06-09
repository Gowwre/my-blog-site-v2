"use client";


import React from "react";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import TextField from "@mui/material/TextField";
import { Formik,Form } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().matches(passwordRegex, "Invalid password").required("Required")
  
});

const callbackUrl='/'
function LoginFormV2() {
  const router = useRouter()
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={ async (values, actions) => {
        console.log(values);
        
        const response = await signIn('credentials',{
          redirect:false,
          email:values.email,
          password:values.password,
          callbackUrl
        })
        actions.resetForm();
        console.log(response);

        if(!response?.error)
        {
          router.push(callbackUrl);
        }
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
