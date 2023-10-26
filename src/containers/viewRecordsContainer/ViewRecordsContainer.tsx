"use client";
import Loader from "@/components/loader/Loader";
import withAuth from "@/hoc/withAuth";
import {
  getRecordByBranchAndDate,
  getRecordByBranchAndDateAndEmpID,
} from "@/services/record";
import { getCurrentDate } from "@/utils/common-utils";
import { usePathname } from "next/navigation";
import { useRecoilState } from "recoil";
import { recentRecords } from "@/state/atom/Record";
import React, { useState, useEffect } from "react";
import RecordPagination from "../../components/recordPagination/RecordPagination";
import styles from "./ViewRecordsContainer.module.scss";

/**
 * @description A ViewRecordsContainerr for  viewing all records for the selected date
 * @author [Mathiarasi]
 * @returns function will return the RecordPagination component
 */

const ViewRecordsContainer = () => {
  const pathname = usePathname();
  const [date, setDate] = useState(getCurrentDate());
  const [allRecords, setRecentRecords] = useRecoilState<any>(recentRecords);
  const [isLoading, setIsLoading] = useState(true);
  const branch = pathname.split("/")[1];
  //on page load data will be fetched for current date and branch
  useEffect(() => {
    const getData = async () => {
      if (branch) {
        const data = await getRecordByBranchAndDate(branch, date);
        setRecentRecords(data);
        setIsLoading(false);
      }
    };
    getData();
  }, [branch]);
  //on date filtering  will be fetched for selected date,selected co-worker ID   and  current branch
  const onDataFilterHandler = async (data: any) => {
    setIsLoading(true);
    if (branch) {
      setDate(data.date);
      const filterdata = await getRecordByBranchAndDateAndEmpID(
        branch,
        data.date,
        data.id
      );
      const newfiltredRecords = [...filterdata];
      setRecentRecords(newfiltredRecords);
      setIsLoading(false);
    }
  };
  
  return (
    <div className={` ${styles["temperature-wrapper"]}`}>
      {isLoading ? (
        <Loader />
      ) : (
        <RecordPagination
          records={allRecords}
          setFilteredData={onDataFilterHandler}
          date={date}
        />
      )}
    </div>
  );
};

export default withAuth(ViewRecordsContainer);
