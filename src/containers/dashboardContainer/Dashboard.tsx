"use client";
import React, { useState, useEffect } from "react";
import Loader from "@/components/loader/Loader";
import styles from "./Dashboard.module.scss";
import { getRecordByBranchAndDate } from "@/services/record";
import withAuth from "@/hoc/withAuth";
import { getCurrentDate } from "@/utils/common-utils";
import { COUNT } from "@/constants/commom-constants";
import { Locationbox } from "@/components/locationbox/Locationbox";
import { usePathname } from "next/navigation";

/**
 * @description  Dashboard page for website
 * @author [Mathiarasi]
 * @returns function will return the Dashboard
 */

const Dashboard = () => {
  const [isLoading, setiIsLoading] = useState(true);
  const [branchRecords, setBranchRecords] = useState<
    Array<{ branch: string; count: number; src: string }>
  >([
    { branch: "Chennai", count: 0, src: "/images/chennai.svg" },
    { branch: "Bengaluru", count: 0, src: "/images/bengaluru.svg" },
    { branch: "Hyderabad", count: 0, src: "/images/hyderabad.svg" },
  ]);
  const pathname = usePathname();
  const date = getCurrentDate();
  useEffect(() => {
    const getData = async () => {
      const chennaiData = await getRecordByBranchAndDate("chennai", date);

      setBranchRecords((prevRecords) => [
        ...prevRecords.map((record) =>
          record.branch == "Chennai"
            ? { ...record, count: chennaiData?.length }
            : record
        ),
      ]);

      const bengaluruData = await getRecordByBranchAndDate("bengaluru", date);
      setBranchRecords((prevRecords) => [
        ...prevRecords.map((record) =>
          record.branch == "Bengaluru"
            ? { ...record, count: bengaluruData?.length }
            : record
        ),
      ]);
      const hyderabadData = await getRecordByBranchAndDate("hyderabad", date);
      setBranchRecords((prevRecords) => [
        ...prevRecords.map((record) =>
          record.branch === "Hyderabad"
            ? { ...record, count: hyderabadData?.length }
            : record
        ),
      ]);
      setiIsLoading(false);
    };
    getData();
  }, [pathname]);

  const countRecord = branchRecords.map((data) => (
    <Locationbox
      key={data.branch}
      branch={data.branch}
      count={data.count}
      src={data.src}
    />
  ));
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles["dashboard-wrapper"]}>
          {COUNT}
          <div className={styles["count-box"]}>{countRecord}</div>
        </div>
      )}
    </div>
  );
};
export default withAuth(Dashboard);
