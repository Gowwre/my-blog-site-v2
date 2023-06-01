"use client";
import { FormikHelpers, useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter an email")
    .required("Please do not leave blanks"),
  password: Yup.string()
    .min(6)
    .matches(passwordRegex, "Must contain at least one letter and one number")
    .required("Please do not leave blanks"),
});

function onSubmit(
  value: {
    email: string;
    password: string;
  },
  actions: FormikHelpers<{
    email: string;
    password: string;
  }>
) {
  console.log(typeof value);
  console.log(typeof actions);
  actions.resetForm();
}


function LoginForm() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit,
  });

  console.log(formik.errors);

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        placeholder="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={formik.errors.email && formik.touched.email ? "error" : ""}
      />
      {formik.errors.email && formik.touched.email && (
        <p>{formik.errors.email}</p>
      )}
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        placeholder="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={
          formik.errors.password && formik.touched.password ? "error" : ""
        }
      />
      {formik.errors.password && formik.touched.password && (
        <p>{formik.errors.password}</p>
      )}
      <button disabled={formik.isSubmitting} type="submit">
        Submit
      </button>
    </form>
  );
}

export default LoginForm;
