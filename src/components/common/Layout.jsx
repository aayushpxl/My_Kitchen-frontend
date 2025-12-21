// src/components/common/Layout.jsx
import React from "react";
import Navbar from "./Navbar";
import Footer from "../landing/Footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
