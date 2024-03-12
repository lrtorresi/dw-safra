import { IListItem } from "../base/IListItem";

export enum adminInternalNames {
    description = "Description",
    category    = "Category",
    url         = "Url"
}

export interface IAdminItem extends IListItem {
    description: string;
    category: string;
    url: string;
}
