import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";

/**
 * @description A layout for branch  with fixed sidebar
 * @author [Mathiarasi]
 * @returns function will return the layout of all page with sidebar
 */

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
