import React from "react";
import { ThreeDots } from "react-loader-spinner";
import styles from "./Loader.module.scss";
const Loader = () => {
  return (
    <div className={styles["loader-wrapper"]}>
      <ThreeDots
        height="100"
        width="100"
        radius="12"
        color="#000"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  );
};

export default Loader;
