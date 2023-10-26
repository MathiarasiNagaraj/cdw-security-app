"use client";
import { NO_RECORDS, VIEW_RECORDS } from "@/constants/commom-constants";
import React, { useState, useEffect } from "react";
import styles from "./RecordPagination.module.scss";
import { RecordContainer } from "../recordContainer/RecordContainer";
import { BiFilterAlt} from "react-icons/bi";
import { FilterSidebar } from "../filterSidebar/FilterSidebar";
import withAuth from "@/hoc/withAuth";
import { useRecoilState } from "recoil";
import { filterSidebar, sidebars } from "@/state/atom/Record";

interface RecordPaginationProps {
  records: string[][];
  date: string;
  setFilteredData: (data: any) => void;
}

/**
 * @description A pagination component for records
 * @author [Mathiarasi]
 * @returns  function will return record pagination
 */

const RecordPagination: React.FC<RecordPaginationProps> = ({
  records,
  setFilteredData,
  date,
}) => {
  const recordLength = records?.length;
  const end = recordLength > 12 ? 12 : recordLength;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(end);

  const [isSidebarOpen, setSidebarOpen] = useRecoilState(sidebars);
  const [isFilterOpened, setFilterOpen] = useRecoilState(filterSidebar);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  useEffect(() => {
    setEndIndex(end);
  }, [end]);

  const onPrevClickHandler = () => {
    setEndIndex(startIndex);
    setStartIndex((prev) => prev - 12);
  };

  const onNextClickHandler = () => {
    const incrementBy =
      endIndex + 12 < recordLength ? 12 : recordLength - endIndex;
    setStartIndex(endIndex);
    setEndIndex((prev) => prev + incrementBy);
  };

  const onFilterOpenHandler = () => {
    setIsFilterOpen(true);
    setSidebarOpen(false);
  };

  const onFilterClose = () => {
    setFilterOpen(false);
    setIsFilterOpen(false);
  };
  return (
    <div className={` ${styles["view-record-wrapper"]}`}>
      <div className={` ${styles["date"]}`}>
        <h1>{VIEW_RECORDS.title(date)} </h1>
        <div onClick={onFilterOpenHandler}>
          <BiFilterAlt />
        </div>
      </div>
      <FilterSidebar
        isFilterOpen={isFilterOpen}
        onCloseFilter={onFilterClose}
        onDataFilter={(data) => {
          setFilteredData(data);
        }}
      />

      {recordLength == 0 ? (
        <div className={styles["fallback"]}>
          <h1>{NO_RECORDS(date)}</h1>
        </div>
      ) : (
        <>
          <RecordContainer
            start={startIndex}
            end={endIndex}
            records={records}
          />
          <div className={styles["limit-wrapper"]}>
            <p>
              {startIndex + 1 !== endIndex
                ? VIEW_RECORDS.pagination_description(
                    startIndex + 1,
                    endIndex,
                    recordLength
                  )
                : `Showing ${endIndex} out of ${recordLength} ${
                    recordLength == 1 ? `record` : `record`
                  }`}
            </p>
            <div className={styles["btn-group"]}>
              <>
                <button
                  onClick={onPrevClickHandler}
                  disabled={startIndex === 0}
                  className={styles["arrow-btn"]}
                >{`<`}</button>
                <button
                  onClick={onNextClickHandler}
                  disabled={endIndex === recordLength}
                  className={styles["arrow-btn"]}
                >{`>`}</button>
              </>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default withAuth(RecordPagination);
