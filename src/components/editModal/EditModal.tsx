import React, { useEffect, useState } from "react";
import styles from "./EditModal.module.scss";
import { EDIT } from "../../constants/modal-constants";
import { Button } from "../button/Button";
import { DeleteModal } from "../deleteModal/DeleteModal";
import { editRecordForBranch, getAllRecordsByBranch } from "@/services/record";
import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface EditModalProps {
  isOpen: boolean;
  closeModal: () => void;

  registerID: string;
  name: string;
  temperature: string;
  time: string;
  date: string;
  id:number;
  branch: string;
}
export const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  closeModal,
  registerID,
  name,
  temperature,
  time,
  id,
  date,
  branch
}) => {



  const [isDisable, setIsDisable] = useState(true);
  const [editedTemperature, setEditedTemperature] = useState<string>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
 
  useEffect(() => {
    setEditedTemperature(temperature);
    setIsDeleteModalOpen(false);
    setIsDisable(true);
  }, [temperature]);
  const onDeleteHandler = () => {
    setIsDeleteModalOpen(true);
  };
  const onEditHandler = () => {
    setIsDisable(false);
  };
  const onUpdateHandler = async () => {
    let allData = await getAllRecordsByBranch(branch);
    allData = allData?.slice()?.reverse();
    const index = allData?.findIndex(
      (data:Array<string>) => data[0] === registerID && data[4] === date
    );

    const data = {
      EmployeeID: registerID,
      EmployeeName: name,
      Temperature: editedTemperature,
      Time: time,
      Date: date,
      branch: branch,
      range: index + 2,
    };

    const status = await editRecordForBranch(data);
    if (status === 200) {
      setIsDisable(true);

      toast.success(`Record ID-${registerID} Updated`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  const onCloseDeleteModalHandler = () => {
    setIsDeleteModalOpen(false);
  };
  const onCloseModalHandler = () => {
    closeModal();
  };
  return (
    <>
      {isOpen && (
        <div className={styles["overlay"]}>
          {!isDeleteModalOpen ? (
            <div
              className={styles["modal"]}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>{EDIT.date}</h3>
              <h2>{date + ", " + time}</h2>
              <h3>{EDIT.ID}</h3>
              <h2>{registerID}</h2>
              <h3> {EDIT.name}</h3>
              <h2>{name}</h2>
              <h3> {EDIT.temperature}</h3>
              <input
                value={editedTemperature}
                disabled={isDisable}
                onChange={(e) => setEditedTemperature(e.target.value)}
                type="number"
              />
              <ToastContainer transition={Zoom} autoClose={2000} />
              <div className={styles["button-wrapper"]}>
                <Button
                  name={EDIT.delete}
                  onClick={onDeleteHandler}
                  styleName="delete-btn"
                />

                {!isDisable ? (
                  <Button
                    name={EDIT.update}
                    onClick={onUpdateHandler}
                    styleName="edit-btn"
                  />
                ) : (
                  <Button
                    name={EDIT.edit}
                    onClick={onEditHandler}
                    styleName="edit-btn"
                  />
                )}
              </div>
            <span onClick={closeModal} > <AiOutlineCloseCircle /></span> 
            </div>
          ) : (
            <DeleteModal
              closeDeleteModal={onCloseDeleteModalHandler}
              closeModal={onCloseModalHandler}
                registerID={registerID}
                date={date}
                branch={branch}
            />
          )}
        </div>
      )}
    </>
  );
};
