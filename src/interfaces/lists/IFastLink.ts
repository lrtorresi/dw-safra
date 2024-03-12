import { IListItem } from "../base/IListItem";

export interface IFastLink extends IListItem {
    url: string;
    newTab: boolean;
    icon: any;
    order: number;
}