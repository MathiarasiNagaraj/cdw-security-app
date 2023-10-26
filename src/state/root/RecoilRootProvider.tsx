
"use client";
import { RecoilRoot } from "recoil";

//Recoil context provider will provide recoil methods for children
export default function RecoilContextProvider({ children }: { children: React.ReactNode }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}