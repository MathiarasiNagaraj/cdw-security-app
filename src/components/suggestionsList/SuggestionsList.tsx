import React from "react";
import styles from "./SuggestionsList.module.scss";


interface SuggestionsListProps{
  suggestions:string[],
  inputValue:string,
  onSelectSuggestion:(index:number)=>void,
  displaySuggestions:boolean,
  selectedSuggestion:number,
}
export const SuggestionsList : React.FC<SuggestionsListProps> = ({suggestions,
  inputValue,
  onSelectSuggestion,
  displaySuggestions,
  selectedSuggestion}) => {
 

  if (inputValue && displaySuggestions) {
    if (suggestions.length > 0) {
      return (
        <ul className={styles["suggestions-list"]}>
          {suggestions.map((suggestion, index) => {
            const isSelected = selectedSuggestion === index;
            const classname = `${styles['suggestion']} ${
              isSelected ? styles["selected"] : ""
            }`;
            return (
              <li
                key={index}
                className={classname}
                onClick={() => onSelectSuggestion(index)}
              >
                {suggestion}
              </li>
            );
          })}
        </ul>
      );
    } else {
      return <div>No suggestions available...</div>;
    }
  }
  return <></>;
};

