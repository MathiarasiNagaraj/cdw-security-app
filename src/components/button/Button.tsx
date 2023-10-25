import React from "react";
import styles from "./Button.module.scss";
import PropType from "prop-types";

interface ButtonProps {
  name: string;
  styleName: string;
  onClick: () => void;
}
export const Button: React.FC<ButtonProps> = ({ name, styleName, onClick }) => {
  return (
    <button className={` ${styles[styleName]}`} onClick={onClick}>
      {name}
    </button>
  );
};

Button.propTypes = {
  name: PropType.string.isRequired,
  styleName: PropType.string.isRequired,
  onClick: PropType.func.isRequired,
};
