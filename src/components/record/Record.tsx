'use client';
import React, { useState } from "react";
import styles from "./Record.module.scss";
import PropType from "prop-types";
import { EditModal } from "../editModal/EditModal";
import { usePathname } from "next/navigation";

interface RecordProps {
  registerID: string;
  name: string;
  temperature: string;
  time: string;
  date: string;
  id: number;
}
export const Record: React.FC<RecordProps> = ({
  id,
  registerID,
  name,
  temperature,
  time,
  date,
}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClickHandler = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const pathname = usePathname();
  const branch = pathname.split('/')[1];

  return (
    <div
      className={` ${styles["record-box"]} ${styles["record-box"]}`}
      onClick={onClickHandler}
    >
      <span>{registerID}</span>
      <span className={`${styles["name"]} `}>{name}</span>
      <span className={`${styles["temperature"]} `}>{temperature} &deg;F</span>
      <span>{time}</span>
      <EditModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        registerID={registerID}
        name={name}
        id={id}
        temperature={temperature}
        time={time}
        date={date}
        branch={branch}
      />
    </div>
  );
};

Record.propTypes = {
  registerID: PropType.string.isRequired,
  name: PropType.string.isRequired,
  temperature: PropType.string.isRequired,
  time: PropType.string.isRequired,
};
