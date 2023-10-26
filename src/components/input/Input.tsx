import React from "react";
import styles from "./Input.module.scss";
import { Source_Sans_3 } from "next/font/google";
const source_sans_3 = Source_Sans_3({ subsets: ["latin"] });
import PropType from "prop-types";

interface InputProps {
  type: string;
  placeholder: any;
  styleName: string;
  max: any;
  min: any;
  onChange: (data: { identifier: string; value: string }) => void;
}

/**
 * @description A reusable Input component with different styles
 * @author [Mathiarasi]
 * @returns  function will return Input component
 */

export const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  styleName,
  onChange,
  max,
  min
}) => {
  const date = new Date();
  date.getDate();

  return (
    <input
      type={type}
      placeholder={placeholder}
      step={"0.01"}
      className={`${styles[styleName]} ${source_sans_3.className}`}
      onChange={(e) => {
        const value = e.target.value;

        onChange({ identifier: type, value: value });
      }}
      max={max}
      min={min}
    />
  );
};
Input.propTypes = {
  type: PropType.string.isRequired,
  placeholder: PropType.string,
  styleName: PropType.string.isRequired,
  onChange: PropType.func.isRequired,
  max: PropType.string,
};
