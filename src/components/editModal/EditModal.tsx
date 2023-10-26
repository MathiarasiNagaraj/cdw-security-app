import React, { useEffect, useState } from "react";
import styles from "./EditModal.module.scss";
import { EDIT } from "../../constants/modal-constants";
import { Button } from "../button/Button";
import { DeleteModal } from "../deleteModal/DeleteModal";
import { editRecordForBranch, getAllRecordsByBranch } from "@/services/record";
import { useRecoilState } from "recoil";
import { recentRecords } from "@/state/atom/Record";
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
/**
 * @description A Modal component for Edit
 * @author [Mathiarasi]
 * @returns  function will return Edit Modal component
 */

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
  const [allRecords, setRecentRecords] = useRecoilState<any>(recentRecords);
  const [editStyleName, setEditStyleName] = useState('edit-btn');
  //when temperature change (input prop) need to set the states to default value and set temperature to editedTemperature state
  useEffect(() => {
    setEditedTemperature(temperature);
    setIsDeleteModalOpen(false);
    setIsDisable(true);
  }, [temperature]);

  //on clicking delete record ,opening delete modal
  const onDeleteHandler = () => {
    setIsDeleteModalOpen(true);
  };
    //on clicking  edit  ,enable the temperature input
  const onEditHandler = () => {
    setIsDisable(false);
  };

  //on clicking update
  const onUpdateHandler = async () => {
    let allData = await getAllRecordsByBranch(branch);
    allData = allData?.slice()?.reverse();
    const index = allData?.findIndex(
      (data:Array<string>) => data[0] === registerID && data[4] === date
    );
    setEditStyleName('updating-btn');
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
    //if the status is successfull then display success toast  component
    //update recoil
    // close the modal
    if (status === 200) {
      setIsDisable(true);
      const index=allRecords?.findIndex(
        (data:Array<string>) => data[0] === registerID && data[4] === date
      );
      const updatedData = [data.EmployeeID, data.EmployeeName, data.Temperature, data.Time, data.Date];
      const newRecords = [...allRecords];
      newRecords[index] = updatedData;
   
      setRecentRecords(newRecords);
      toast.success(`Record ID-${registerID} Updated`, {
        position: toast.POSITION.TOP_CENTER,
      });
      setEditStyleName('edit-btn');
    }
  };
  //on closing delete modal (prop from child)
  const onCloseDeleteModalHandler = () => {
    setIsDeleteModalOpen(false);
  };
  //on closing modal
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
                    styleName={editStyleName}
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
