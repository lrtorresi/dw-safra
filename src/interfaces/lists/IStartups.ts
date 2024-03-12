import { IListItem } from "../base/IListItem";

export interface IStartups extends IListItem {
    url: string;
    icon: any;
    resume: string;
    category: string;
    description: string;
}