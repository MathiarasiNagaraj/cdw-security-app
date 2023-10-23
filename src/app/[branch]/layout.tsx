import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";

export default function Branchlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Sidebar />

      {children}
    </div>
  );
}
