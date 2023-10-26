export const SIDEBAR_ROUTES = [
  {
    name: "DASHBOARD",
    url: (location) => `/${location}/`,
  },
  { name: "RECORD TEMPERATURE", url: (location) => `/${location}/temperature-form` },
  { name: "SWITCH OFFICE", url: (location) => "/locations" },
  { name: "SIGN OUT", url: (location) => "/" },
];

export const TOPBAR_ROUTE = (route) => {
    if (route === "records") return "TEMPERATURE RECORDS";
    if(route==="temperature-form") return "RECORD TEMPERATURE"
    if (route === "chennai" || route === "bengaluru" || route === "hyderabad");
    return "SECURITY DASHBOARD";
};

export const SIDEBAR_FILTER = {
  title: "Filter Records",
  fields: [
    {
      label: "Select Date",
      type: "date",
      styleName: "filter-input",
      placeholder: "Date",
    }
  ],
  button: {
    name: "APPLY FILTER",
    styleName: "secondary-btn",
  },
};
