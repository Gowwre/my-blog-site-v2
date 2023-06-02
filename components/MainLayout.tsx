"use client";

import Container from "@mui/material/Container";
import React from "react";
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
