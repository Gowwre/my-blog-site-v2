"use client";

import { Button } from "@mui/material";
import React from "react";

function CustomButton({ children }: { children: React.ReactNode }) {
  return <Button variant="text" sx={{
    '.css-sghohy-MuiButtonBase-root-MuiButton-root:hover': {
      backgroundColor: "#003049",
    }
  }} className="text-blue-950 bg-orange-400">{children}</Button>;
}

export default CustomButton;
