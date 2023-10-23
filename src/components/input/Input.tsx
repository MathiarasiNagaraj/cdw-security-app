import React from 'react';
import styles from './Input.module.scss'
import { Source_Sans_3 } from 'next/font/google';
const source_sans_3 = Source_Sans_3({ subsets: ['latin'] });
import PropType from "prop-types";
import { getCurrentDate } from '@/utils/common-utils';
interface InputProps {
  type: string;
  placeholder: any;
  styleName: string;
  max:any
  onChange: (data: { identifier: string; value: string }) => void;
}

export const Input: React.FC<InputProps> = ({ type, placeholder, styleName, onChange,max }) => {
  const date = new Date();
  date.getDate();
 
  return (
    <input
    type={type}
    placeholder={placeholder}
    className={`${styles[styleName]} ${source_sans_3.className}`}
    onChange={(e) => {
      const value = e.target.value;
    
      onChange({ identifier: type, value: value });
    }}
    max={max}
  />
  );
}
Input.propTypes = {
  type: PropType.string.isRequired,
  placeholder: PropType.string,
  styleName: PropType.string.isRequired,
  onChange: PropType.func.isRequired,
  max:PropType.string
}