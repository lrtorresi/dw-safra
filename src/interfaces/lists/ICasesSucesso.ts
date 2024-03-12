import { IListItem } from "../base/IListItem";

export interface ICasesSucesso extends IListItem {
    url: string;
    icon: any;
    resume: string;
    category: string;
    description: string;
}