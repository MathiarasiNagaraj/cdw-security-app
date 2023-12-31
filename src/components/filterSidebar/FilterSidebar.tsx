import { Button } from "@/components/button/Button";
import { Input } from "@/components/input/Input";
import { SIDEBAR_FILTER } from "@/constants/route-constants";
import { getRecordByBranchAndDate } from "@/services/record";
import { formatDate } from "@/utils/common-utils";
import React, { FormEvent, useRef, useState } from "react";
import styles from "./FilterSidebar.module.scss";
import { AiOutlineClose} from 'react-icons/ai';
interface Data {
  identifier: string;
  value: string;
}

export const FilterSidebar = ({ isFilterOpen, onCloseFilter, branch ,onDataFilter}) => {


  const [date, setDate] = useState();
  const [name, setName] = useState();
  const formRef =  useRef<HTMLFormElement | null>(null);
  const sidebarClasses = [styles["sidebar-filter"]];
  if (isFilterOpen) {
    sidebarClasses.push(styles["active"]);
  }
  const onInputChangeHandler = (data:Data) => {
    if (data.identifier === "date") setDate(data.value);
    if (data.identifier === "text") setName(data.value);
  };
  const fields = SIDEBAR_FILTER.fields.map((field) => (
    <div className={styles["form-fields"]} key={field.type}>
      <h2>{field.label}</h2>
      <Input
        styleName={field.styleName}
        key={field.type}
        type={field.type}
        max={new Date().toISOString().split('T')[0]}
        onChange={onInputChangeHandler}
      />
    </div>
  ));

  const onSubmitHandler = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
    const data = {
      date: formatDate(date),
      id:name
    }

    onDataFilter(data);
    if (formRef.current) formRef.current.reset();
  };
  return (
    <div
      className={`${styles["sidebar-filter"]} ${
        isFilterOpen ? styles["active"] : ""
      }`}
    >
      <div className={styles["wrapper"]}>
        <AiOutlineClose onClick={onCloseFilter}/>

        <h4>{SIDEBAR_FILTER.title}</h4>
        <form onSubmit={onSubmitHandler} ref={formRef}>
          {fields}
          <Button
            name={SIDEBAR_FILTER.button.name}
            styleName={SIDEBAR_FILTER.button.styleName}
            onClick={onCloseFilter}
          />
        </form>
      </div>
    </div>
  );
};
