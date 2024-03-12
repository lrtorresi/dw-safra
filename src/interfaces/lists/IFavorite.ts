import { IListItem } from "../base/IListItem";

export enum favoriteModes {
    Home = "HOME",
    Workspace = "WORKSPACE"
}

export interface IFavorite extends IListItem {
    jsonFavorites: string;
}

export interface IFavoriteItem {
    name: string;
    url: string;
    dummy?: boolean;
}