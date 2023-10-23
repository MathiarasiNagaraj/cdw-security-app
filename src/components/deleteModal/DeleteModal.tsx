'use client';
import React from "react";
import styles from "./DeleteModal.module.scss";
import { DELETE } from "@/constants/modal-constants";
import { Button } from "../button/Button";
import {
  deleteRecordForBranch,
  getAllRecordsByBranch,
} from "@/services/record";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSetRecoilState, useRecoilValue } from "recoil";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { useRouter } from "next/router";

interface DeleteModalProps {
  closeDeleteModal: () => void;
  closeModal: () => void;
  registerID: string;
  date: string;
  branch:string
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  closeDeleteModal,
  closeModal,
  registerID,
  date,
  branch
}) => {

  console.log(branch,'branch in delet')

  const onCloseModalHandler = () => {
    closeModal();
  };

  const onDeleteHandler = async () => {
    let allData = await getAllRecordsByBranch(branch);
    allData = allData?.slice()?.reverse();
    const index = allData?.findIndex(
      (data:Array<string>) => data[0] === registerID && data[4] === date
    );
    const data = {
      range: index + 2,
      branch: branch,
    };
    const status = await deleteRecordForBranch(data);

    if (status === 200) {
     
      toast.success(`Record ID-${registerID} on ${date} Deleted `, {
        position: toast.POSITION.TOP_CENTER,
      });
      closeModal();
    }
  };
  return (
    <div
      className={styles["delete-modal"]}
      onClick={(e) => e.stopPropagation()}
    >
      <ToastContainer />
      <AiOutlineCloseCircle onClick={onCloseModalHandler} />
      <h1> {DELETE.title}</h1>
      <h5> {DELETE.description}</h5>
      <div className={styles["button-wrapper"]}>
        <Button
          name={DELETE.cancel}
          onClick={closeDeleteModal}
          styleName="cancel-btn"
        />

        <Button
          name={DELETE.delete}
          onClick={onDeleteHandler}
          styleName="edit-btn"
        />
      </div>
    </div>
  );
};
