import LoginForm from "@/components/loginForm/LoginForm";
import Image from "next/image";
import React from "react";
import styles from "./HomeContainer.module.scss";
import { TITLE } from "@/constants/commom-constants";
export const HomeContainer = () => {
  return (
    <div className={`${styles["index-wrapper"]}`}>
      <Image src="/images/cdwLogo.png" alt="cdw-logo" width="138" height="72" />
      <h1>{TITLE}</h1>
      <LoginForm />
    </div>
  );
};
