import Image from "next/image";
import React from "react";
import styles from "./Locationbox.module.scss";

interface LocationboxProps {
  branch: string;
  count: number;
  src: string;
}

/**
 * @description A reusable location box component with branch image and name
 * @author [Mathiarasi]
 * @returns  function will return location box component
 */

export const Locationbox: React.FC<LocationboxProps> = ({
  branch,
  count,
  src,
}) => {
  return (
    <div className={styles["location-box"]}>
      <div className={styles["branch-box"]}>
        <Image
          src={src}
          width="35"
          height="35"
          alt={`${branch} Office`}
          className={styles["image-box"]}
        />
        {branch.toLocaleUpperCase()}
      </div>
      <div>{count}</div>
    </div>
  );
};
