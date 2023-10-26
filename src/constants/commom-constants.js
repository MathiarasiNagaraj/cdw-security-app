import { toTitleCase } from "@/utils/common-utils";

export const TITLE = "SECURITY APP";
export const TODAY_RECORD = {
  title: "Today's Record",
  description: (length) => `Showing last ${length}  recent entries`,
  link: "View All Records",
};
export const CO_WORKERS = {
  title: "Co-Workers",
  subtitle: (branch) => `in ${toTitleCase(branch)} Office`,
};
export const VIEW_RECORDS = {
  title: (date) => {
    return `Records (${date})`;
  },
  pagination_description: (start, end, total) => {
    return `Showing ${start} to ${end} of ${total} records`;
  },
};

export const PAGINATION_HEADER = [
  {
    name: "ID",
  },
  {
    name: "Name",
  },
  {
    name: "Temperature",
  },
  {
    name: "Time",
  },
];
export const NO_RECORD_TODAY = "No Records Entered Today";

export const NO_RECORDS = (date) => `No Records Found on ${date}`;

export const COUNT = "TODAY'S CO-WORKERS COUNT ";

export const NO_SUGGESTION="No suggestions available..."