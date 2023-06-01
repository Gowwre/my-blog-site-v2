"use client";

import { AppBar, Container } from "@mui/material";
import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import ImprovedNavigation from "./TempNavigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ImprovedNavigation/>
      <Container className="min-h-full mt-4">{children}
    </Container>
      <Footer />
    </>
  );
}
