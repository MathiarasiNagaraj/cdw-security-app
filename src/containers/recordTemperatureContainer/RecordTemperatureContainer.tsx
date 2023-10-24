"use client";
import React, { useState, useEffect } from "react";
import Loader from "@/components/loader/Loader";
import { RecordTemperatureForm } from "../../components/recordTemperatureForm/RecordTemperatureForm";
import styles from "./RecordTemperatureContainer.module.scss";
import { getRecordByBranchAndDate } from "@/services/record";
import { getCurrentDate } from "@/utils/common-utils";
import { CO_WORKERS, TODAY_RECORD } from "@/constants/commom-constants";
import { Record } from "@/components/record/Record";
import Link from "next/link";
import withAuth from "@/hoc/withAuth";

import { usePathname, useSearchParams } from "next/navigation";
import { useRecoilState, useRecoilValue } from "recoil";
import { recentRecords } from "@/state/atom/Record";
const RecordTemperatureContainer = () => {
  const [recentFiveRecords, setRecentRecords] = useRecoilState<any>(recentRecords);

  const searchParams = useSearchParams();
  const pathname = usePathname();


  const [isLoading, setiIsLoading] = useState(true);
  const branch = pathname.split("/")[1];

  const date = getCurrentDate();
  const [data, setData] = useState<string[][]>([]);
  useEffect(() => {
    const getData = async () => {
      if (branch) {
        const data = await getRecordByBranchAndDate(branch, date);
        setData(data);
        console.log(data);
        setRecentRecords(data);
        setiIsLoading(false);
      }
    };
    getData();
  }, [branch]);

  const records = data
    ?.slice(0, 5)
    .map((data, index) => (
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
            <p>{data?.length}</p>
          </div>
          <RecordTemperatureForm />
          <h4>{TODAY_RECORD.title}</h4>

          {data?.length > 0 && (
            <p>
              {TODAY_RECORD.description(data?.length > 5 ? 5 : data?.length)}
            </p>
          )}

          {data?.length <= 0 ? (
            <h1 className={styles["fall-back"]}>No records entered today</h1>
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
