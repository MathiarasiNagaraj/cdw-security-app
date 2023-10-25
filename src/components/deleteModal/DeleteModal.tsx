'use client';
import React, { useState } from "react";
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
import { useRecoilState } from "recoil";
import { recentRecords } from "@/state/atom/Record";
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

  const [deleteStyleName, setDeleteStyleName] = useState('edit-btn');
  const [allRecords, setRecentRecords] = useRecoilState<any>(recentRecords);
  const onCloseModalHandler = () => {
    closeModal();
  };

  const onDeleteHandler = async () => {
    setDeleteStyleName('updating-btn');
    let allData = await getAllRecordsByBranch(branch);
    allData = allData?.slice()?.reverse();
    const dataIndex = allData?.findIndex(
      (data:Array<string>) => data[0] === registerID && data[4] === date
    );
    const data = {
      range: dataIndex + 2,
      branch: branch,
    };
    const status = await deleteRecordForBranch(data);

   
   
    if (status === 200) {
      const recoilindex=allRecords?.findIndex(
        (data:Array<string>) => data[0] === registerID && data[4] === date
      );
      const newRecords = allRecords.filter((_:any, index:number) => index !== recoilindex);;
      setDeleteStyleName('edit-btn');
      setRecentRecords(newRecords);
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
     <span  onClick={onCloseModalHandler}><AiOutlineCloseCircle /></span> 
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
          styleName={deleteStyleName}
        />
      </div>
    </div>
  );
};
