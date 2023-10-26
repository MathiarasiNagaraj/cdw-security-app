import { Record } from "@/components/record/Record";
import React, { useEffect, useState } from "react";
import styles from "./RecordContainer.module.scss";
import PropType from "prop-types";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { PAGINATION_HEADER } from "@/constants/commom-constants";
import {
  customAscendingSort,
  customDescendingSort,
} from "@/utils/common-utils";

interface RecordContainerProps {
  start: number;
  end: number;
  records: string[][];
}
/**
 * @description A container component for records
 * @author [Mathiarasi]
 * @returns  function will return record container component
 */

export const RecordContainer: React.FC<RecordContainerProps> = ({
  start,
  end,
  records,
}) => {
  const [recordData, setRecordData] = useState<string[][]>();
  const [Arrow, setArrow] = useState([
    { id: 0, isShowUp: true, isShowDown: false },
    { id: 1, isShowUp: true, isShowDown: false },
    { id: 2, isShowUp: true, isShowDown: false },
    { id: 3, isShowUp: true, isShowDown: false },
  ]);

  useEffect(() => {
    const slicedRecords = records?.slice(start, end);
    setRecordData(slicedRecords);
  }, [start, end, records]);

  const onUpSortHandler = (data: any) => {
    const sortData = [...((recordData || []) as string[][])];

    if (data != 1 || data != 4)
      sortData.sort((a: any, b: any) => a[data] - b[data]);
    if (data == 1) sortData.sort((a, b) => a[data].localeCompare(b[data]));
    if (data == 3) sortData.sort(customAscendingSort);
    setRecordData(sortData);
    setArrow((prevItems) => {
      return prevItems.map((item) =>
        item.id === data
          ? { ...item, isShowUp: !item.isShowUp, isShowDown: !item.isShowDown }
          : item
      );
    });
  };
  const onDownSortHandler = (data: number) => {
    const sortData = [...((recordData || []) as string[][])];
    if (data != 1 && data != 4)
      sortData.sort((a: any, b: any) => b[data] - a[data]);
    if (data == 1) sortData.sort((a, b) => b[data].localeCompare(a[data]));
    if (data == 3) sortData.sort(customDescendingSort);
    setRecordData(sortData);
    setArrow((prevItems) => {
      return prevItems.map((item) =>
        item.id === data
          ? { ...item, isShowUp: !item.isShowUp, isShowDown: !item.isShowDown }
          : item
      );
    });
  };

  return (
    <div className={styles["record-wrapper"]}>
      <div className={`${styles["pagination-header"]}`}>
        {PAGINATION_HEADER.map((item, index) => (
          <div className={styles["header"]} key={index}>
            {item.name}
            <div>
              {Arrow[index].isShowUp && (
                <span onClick={() => onUpSortHandler(index)}>
                  {" "}
                  <BiSolidUpArrow />{" "}
                </span>
              )}
              {Arrow[index].isShowDown && (
                <span onClick={() => onDownSortHandler(index)}>
                  <BiSolidDownArrow />
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      {recordData &&
        recordData.map((data: string[], index: number) => (
          <Record
            key={index}
            id={index}
            registerID={data[0]}
            name={data[1]}
            temperature={data[2]}
            time={data[3].toLocaleUpperCase()}
            date={data[4]}
          />
        ))}
    </div>
  );
};

RecordContainer.propTypes = {
  start: PropType.number.isRequired,
  end: PropType.number.isRequired,
};
