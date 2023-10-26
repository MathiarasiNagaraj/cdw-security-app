import { Branch } from "@/components/branch/Branch";
import { LOCATION } from "@/constants/form-constants";
import React from "react";
import styles from "./LocationContainer.module.scss";

/**
 * @description A container for all the branch component
 * @author Mathiarasi
 * @returns branch components
 */

export const LocationContainer = () => {
  const branch = LOCATION.branch.map((branch) => (
    <Branch
      url={branch.url}
      name={branch.name}
      src={branch.src}
      branch={branch.branch}
      key={branch.name}
    />
  ));
  return (
    <div className={styles["wrapper"]}>
      <p>{LOCATION.title}</p>
      <div className={styles["branch-wrapper"]}>{branch}</div>
    </div>
  );
};
