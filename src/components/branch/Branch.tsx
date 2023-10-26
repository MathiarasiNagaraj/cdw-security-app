'use client';
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./Branch.module.scss";
import PropType from "prop-types";
interface BranchProps {
  url: string;
  branch: string;
  src: string;
  name: string;
}
/**
 * @description A reusable Branch component with branch image and name
 * @author [Mathiarasi]
 * @returns  function will return branch component
 */

export const Branch: React.FC<BranchProps> = ({ url, branch, src, name }) => {
  return (
    <Link href={url} className={styles["link"]}>
      <div className={styles["location-box"]}>
        <Image src={src} width="90" height="90" alt={`${name} Office`} />
        <h2>{branch}</h2>
      </div>
    </Link>
  );
};
Branch.propTypes = {
  url: PropType.string.isRequired,
  branch: PropType.string.isRequired,
  src: PropType.string.isRequired,
  name: PropType.string.isRequired,
};
