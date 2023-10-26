import React from "react";
import styles from "./Button.module.scss";
import PropType from "prop-types";
import { Source_Sans_3 } from "next/font/google";
const source_sans_3 = Source_Sans_3({ subsets: ["latin"] });

interface ButtonProps {
  name: string;
  styleName: string;
  onClick: () => void;
}
/**
 * @description A reusable Button component with different styles
 * @author [Mathiarasi]
 * @returns  function will return button component
 */

export const Button: React.FC<ButtonProps> = ({ name, styleName, onClick }) => {
  return (
    <button
      className={` ${styles[styleName]}`}
      style={source_sans_3.style}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

Button.propTypes = {
  name: PropType.string.isRequired,
  styleName: PropType.string.isRequired,
  onClick: PropType.func.isRequired,
};
