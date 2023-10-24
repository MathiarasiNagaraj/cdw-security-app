import { atom } from "recoil";
export const recentRecords = atom({
    key: 'RecentRecords',
    default: []
});

export const sidebars = atom({
    key: 'Sidebars',
    default: false
})

export const filterSidebar = atom({
    key: 'FilterSidebars',
    default: false
})