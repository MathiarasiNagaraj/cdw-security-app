import { Button } from "@/components/button/Button";
import { Input } from "@/components/input/Input";
import { SIDEBAR_FILTER } from "@/constants/route-constants";
import { formatDate } from "@/utils/common-utils";
import React, { useRef, useState, FormEvent, ChangeEvent } from "react";
import { Source_Sans_3 } from "next/font/google";
const source_sans_3 = Source_Sans_3({ subsets: ["latin"] });
import styles from "./FilterSidebar.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { sidebars, filterSidebar } from "@/state/atom/Record";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, Zoom } from "react-toastify";
import { SuggestionsList } from "@/components/suggestionsList/SuggestionsList";
import { employee } from "../../data/employee";
interface Data {
  identifier: string;
  value: string;
}
interface FilterSidebarProps {
  isFilterOpen: boolean;
  onCloseFilter: () => void;
  onDataFilter: (data: any) => void;
}
/**
 * @description A filter sidebar component with filter form
 * @author [Mathiarasi]
 * @returns  function will filter sidebar
 */

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isFilterOpen,
  onCloseFilter,
  onDataFilter,
}) => {
  const [date, setDate] = useState<string>();
  const [isSidebarOpen, setSidebarOpen] = useRecoilState(sidebars);
  const [isFilterOpened, setFilterOpen] = useRecoilState(filterSidebar);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [employeeID, setemployeeID] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<number>(0);
  const [displaySuggestions, setDisplaySuggestions] = useState<boolean>(false);
  const suggestions = employee;
  const sidebarClasses = [styles["sidebar-filter"]];

  if (isSidebarOpen) {
    const index = sidebarClasses.indexOf(styles["active"]);
    if (index !== -1) {
      sidebarClasses.splice(index, 1);
    }
  }

  const onInputChangeHandler = (data: Data) => {
    if (data.identifier === "date") setDate(data.value);
  };
  const fields = SIDEBAR_FILTER.fields.map((field) => (
    <div className={styles["form-fields"]} key={field.type}>
      <h2>{field.label}</h2>
      <Input
        styleName={field.styleName}
        key={field.type}
        type={field.type}
        max={new Date().toISOString().split("T")[0]}
        onChange={onInputChangeHandler}
        placeholder={field.placeholder}
        min=''
      />
    </div>
  ));
  const onCloseFilterHandler = () => {
    onCloseFilter();
  };
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setemployeeID(value);

    const filteredSuggestions = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredSuggestions(filteredSuggestions);
    setDisplaySuggestions(true);
  };

  const onSelectSuggestion = (index: number) => {
    setSelectedSuggestion(index);
    setemployeeID(filteredSuggestions[index]);
    setFilteredSuggestions([]);
    setDisplaySuggestions(false);
  };
  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!date) {
      toast.error("Enter date", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000,
      });
    } else {
      const data = {
        date: formatDate(date),
        id: employeeID.split("-")[0],
      };
      onDataFilter(data);

      if (formRef.current) formRef.current.reset();
    }
  };
  return (
    <div
      className={`${styles["sidebar-filter"]} ${
        isFilterOpen ? styles["active"] : ""
      }`}
    >
      <ToastContainer transition={Zoom} autoClose={2000} />
      <div className={styles["wrapper"]}>
        <span onClick={onCloseFilterHandler}>
          <AiOutlineClose />
        </span>

        <h4>{SIDEBAR_FILTER.title}</h4>
        <form onSubmit={onSubmitHandler} ref={formRef}>
          {fields}
          <input
            className={`${styles["text-input"]} ${source_sans_3.className}`}
            type="text"
            onChange={onChange}
            value={employeeID}
            placeholder={"Co-worker ID"}
          />
          <div className={styles["suggestion-wrapper"]}>
            <SuggestionsList
              inputValue={employeeID}
              selectedSuggestion={selectedSuggestion}
              onSelectSuggestion={onSelectSuggestion}
              displaySuggestions={displaySuggestions}
              suggestions={filteredSuggestions}
            />
          </div>
          <Button
            name={SIDEBAR_FILTER.button.name}
            styleName={SIDEBAR_FILTER.button.styleName}
            onClick={() => {}}
          />
        </form>
      </div>
    </div>
  );
};
