"use client";
import React, { useState, useEffect } from "react";
import Loader from "@/components/loader/Loader";
import { RecordTemperatureForm } from "../../components/recordTemperatureForm/RecordTemperatureForm";
import styles from "./RecordTemperatureContainer.module.scss";
import { getRecordByBranchAndDate } from "@/services/record";
import { getCurrentDate } from "@/utils/common-utils";
import {
  CO_WORKERS,
  NO_RECORD_TODAY,
  TODAY_RECORD,
} from "@/constants/commom-constants";
import { Record } from "@/components/record/Record";
import Link from "next/link";
import withAuth from "@/hoc/withAuth";

import { usePathname } from "next/navigation";
import { useRecoilState } from "recoil";
import { recentRecords } from "@/state/atom/Record";
const RecordTemperatureContainer = () => {
  const [allRecords, setRecentRecords] = useRecoilState<any>(recentRecords);
  const pathname = usePathname();
  const [isLoading, setiIsLoading] = useState(true);
  const branch = pathname.split("/")[1];
  const date = getCurrentDate();
  useEffect(() => {
    const getData = async () => {
      if (branch) {
        const data = await getRecordByBranchAndDate(branch, date);
        setRecentRecords(data);
        setiIsLoading(false);
      }
    };
    getData();
  }, [branch, allRecords?.length]);

  const records = allRecords
    ?.slice(0, 5)
    .map((data: any, index: number) => (
      <Record
        key={index}
        id={index}
        registerID={data[0]}
        name={data[1]}
        temperature={data[2]}
        time={data[3].toLocaleUpperCase()}
        date={data[4]}
      />
    ));
  return (
    <div className={`${styles["temperature-wrapper"]}`}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={`${styles["co-workers"]} `}>
            {CO_WORKERS.title} <strong>{CO_WORKERS.country}</strong>
            <p>{allRecords?.length}</p>
          </div>
          <RecordTemperatureForm />
          <h4>{TODAY_RECORD.title}</h4>

          {allRecords?.length > 0 && (
            <p>
              {TODAY_RECORD.description(
                allRecords?.length > 5 ? 5 : allRecords?.length
              )}
            </p>
          )}

          {allRecords?.length <= 0 ? (
            <h1 className={styles["fall-back"]}>{NO_RECORD_TODAY}</h1>
          ) : (
            <div className={styles["record-container"]}>{records}</div>
          )}
          <Link href={`${branch}/viewrecords`}>{TODAY_RECORD.link}</Link>
        </>
      )}
    </div>
  );
};

export default withAuth(RecordTemperatureContainer);
