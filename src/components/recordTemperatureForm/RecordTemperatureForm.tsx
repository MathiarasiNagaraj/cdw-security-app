"use client";
import { Button } from "@/components/button/Button";
import { Input } from "@/components/input/Input";
import { SuggestionsList } from "@/components/suggestionsList/SuggestionsList";
import styles from "./RecordTemperatureForm.module.scss";
import React, { useState, useRef, FormEvent, ChangeEvent } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, Zoom } from "react-toastify";
import { Source_Sans_3 } from "next/font/google";
import { getCurrentDate, getCurrentTime } from "@/utils/common-utils";
const source_sans_3 = Source_Sans_3({ subsets: ["latin"] });
import { TEMPERATURE } from "@/constants/form-constants";
import { employee } from "../../data/employee";
import { addRecordForBranch, getCountByBranch, isEmployeeIDPresentToday ,getAllRecordsByBranch} from "../../services/record";
import { useSetRecoilState, useRecoilValue } from "recoil";

import { Branch } from "@/components/branch/Branch";


interface Data {
  identifier: string;
  value: string;
}
export const RecordTemperatureForm = () => {

  const branch = 'Chennai';

  const [temperature, setTemperature] = useState<string>("");
  const [employeeID, setemployeeID] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<number>(0);
  const [displaySuggestions, setDisplaySuggestions] = useState<boolean>(false);
 

  const suggestions = employee;
  const formRef = useRef<HTMLFormElement | null>(null);
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setemployeeID(value);

    const filteredSuggestions = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredSuggestions(filteredSuggestions);
    setDisplaySuggestions(true);
  };

  const onSelectSuggestion = (index: number) => {
    setSelectedSuggestion(index);
    setemployeeID(filteredSuggestions[index]);
    setFilteredSuggestions([]);
    setDisplaySuggestions(false);
  };

  const onInputChangeHandler = (data: Data) => {
    if (data.identifier === "number")
      if (parseInt(data.value) > 99) {
        toast.error("High temperature!", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 3000,
        });
      }
    setTemperature(data.value);
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
    const data = {
      EmployeeID: employeeID?.split("-")[0],
      EmployeeName:employeeID?.split("-")[1],
      Temperature: temperature,
      Time: getCurrentTime(),
      Date: getCurrentDate(),
      branch: branch,
    };

   
    
    if (employeeID === "" || temperature === "" ) {
      toast.error(`Enter ${employeeID===""?'Employee ID':'temperature'}`, { position: toast.POSITION.BOTTOM_CENTER });
    }
    else if (isEmployeeIDPresentToday(data.EmployeeID)) {
      //if (formRef.current) formRef.current.reset();
      setemployeeID("");
      toast.error("EmployeeId already present in today's record ", { position: toast.POSITION.BOTTOM_CENTER });
    }
    else {
      const status =await  addRecordForBranch(data);
      if (formRef.current) formRef.current.reset();
      setemployeeID("");

      if (status === 200) {
        //setCount((count) => count + 1);

        toast.success("Record Added", { position: toast.POSITION.BOTTOM_CENTER });
      }
    }
  };

  const fields = TEMPERATURE.fields.map((field) => (
    <Input
      placeholder={field.placeholder}
      styleName={field.style}
      key={field.type}
      type={field.type}
      onChange={onInputChangeHandler}
    />
  ));

  return (
    <form
      className={`${styles["form-container"]}`}
      onSubmit={onSubmitHandler}
      ref={formRef}
    >
      <div className={styles["toast-container"]}>
        <ToastContainer  transition={Zoom} autoClose={2000} />
      </div>
      <h3>{TEMPERATURE.title}</h3>
      <input
        className={`${styles["text-input"]} ${source_sans_3.className}`}
        type="text"
        onChange={onChange}
        value={employeeID}
        placeholder={"Employee ID"}
      />

      <SuggestionsList
        inputValue={employeeID}
        selectedSuggestion={selectedSuggestion}
        onSelectSuggestion={onSelectSuggestion}
        displaySuggestions={displaySuggestions}
        suggestions={filteredSuggestions}
      />
      {fields}
      <Button name={TEMPERATURE.button} styleName="primary-btn" onClick={()=>{}} />
    </form>
  );
};
