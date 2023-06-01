"use client";

import { Button } from "@mui/material";
import React from "react";

function CustomButton({ children }: { children: React.ReactNode }) {
  return <Button variant="text">{children}</Button>;
}

export default CustomButton;
