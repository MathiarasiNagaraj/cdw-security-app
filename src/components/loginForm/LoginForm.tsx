"use client";
import { Button } from "@/components/button/Button";
import { Input } from "@/components/input/Input";
import React, { FormEvent, useEffect, useState } from "react";
import { LOGIN, LOGIN_INFO } from "@/constants/form-constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import styles from "./LoginForm.module.scss";
/**
 * @description  A form component for user login
 * @author Mathiarasi
 * @returns login form
 */
interface Data {
  identifier: string;
  value: string;
}

function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();
  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(false));
  }, [router]);
  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (LOGIN_INFO.email.includes(email) && password === LOGIN_INFO.password) {
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      router.push("/locations");
    } else {
      toast.error(LOGIN.error_message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
  const onChangeHandler = (data: Data) => {
    if (data.identifier === "email") setEmail(data.value);
    else if (data.identifier === "password") setPassword(data.value);
  };
  const fields = LOGIN.form_fields.map((field) => (
    <Input
      type={field.type}
      placeholder={field.placeholder}
      key={field.type}
      onChange={onChangeHandler}
      styleName={field.style}
      max={undefined}
      min={undefined}
    />
  ));
  return (
    <form onSubmit={onSubmitHandler} className={` ${styles["form-container"]}`}>
      <ToastContainer />
      <h4>{LOGIN.title}</h4>
      {fields}
      <Button name={LOGIN.button} styleName="primary-btn" onClick={() => {}} />
    </form>
  );
}

export default LoginForm;
