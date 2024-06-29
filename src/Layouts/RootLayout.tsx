"use client";
import React, { ReactNode } from "react";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "@/Shared/Footer/Footer";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <main>
      <Navbar />
      <section className="h-full">{children}</section>
      <Footer/>
    </main>
  );
};

export default RootLayout;
