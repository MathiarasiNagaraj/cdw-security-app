import { atom } from "recoil";
//atom for recent records will hold the recent records in array form
export const recentRecords = atom<string[][]>({
  key: "RecentRecords",
  default: [],
});

export const sidebars = atom({
  key: "Sidebars",
  default: false,
});

export const filterSidebar = atom({
  key: "FilterSidebars",
  default: false,
});
