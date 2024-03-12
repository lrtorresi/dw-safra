import { IListItem } from "../base/IListItem";

export enum SystemsInternalNames {
    url = "Url",
    newTab = "NewTab",
    icon = "Icon",
    category = "Category",
    categoryTitle = "Category/Title",
    description = "Description"
}

export interface ISystemFavorite extends IListItem {
    jsonFavorites: string;
}

export interface ISystemCategory extends IListItem {
}

export interface ISystem extends IListItem {
    url: string;
    newTab: boolean;
    icon: any;
    category: any;
    description: string;
    favoriteIndex?: number;
    attachments?: any[];
}