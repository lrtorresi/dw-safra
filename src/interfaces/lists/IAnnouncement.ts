import { IListItem } from "../base/IListItem";

export enum announcementInternalNames {
    url = "Url",
    newTab = "NewTab",
    startDate = "StartDate",
    endDate = "EndDate",
    description = "Description"
}

export interface IAnnouncement extends IListItem {
    url: string;
    newTab: boolean;
    startDate: string;
    endDate: string;
    description: string;
}