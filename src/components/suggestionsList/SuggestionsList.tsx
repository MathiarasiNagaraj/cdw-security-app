import { NO_SUGGESTION } from "@/constants/commom-constants";
import React from "react";
import styles from "./SuggestionsList.module.scss";

interface SuggestionsListProps {
  suggestions: string[];
  inputValue: string;
  onSelectSuggestion: (index: number) => void;
  displaySuggestions: boolean;
  selectedSuggestion: number;
}
/**
 * @description A suggestion list for typeahead component
 * @author [Mathiarasi]
 * @returns  function will suggestion list component
 */

export const SuggestionsList: React.FC<SuggestionsListProps> = ({
  suggestions,
  inputValue,
  onSelectSuggestion,
  displaySuggestions,
  selectedSuggestion,
}) => {
  if (inputValue && displaySuggestions) {
    if (suggestions.length > 0) {
      return (
        <ul className={styles["suggestions-list"]}>
          {suggestions.map((suggestion, index) => {
            const isSelected = selectedSuggestion === index;
            const classname = `${styles["suggestion"]} ${
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
      return <div>{NO_SUGGESTION}</div>;
    }
  }
  return <></>;
};
