import { IListItem } from "../base/IListItem";

export interface IFastLinkSafra extends IListItem {
    url: string;
    newTab: boolean;
    icon: any;
    order: number;
    mobile?: string;
}