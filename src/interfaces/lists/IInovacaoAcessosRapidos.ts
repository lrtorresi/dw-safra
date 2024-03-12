import { IListItem } from "../base/IListItem";

export interface IInovacaoAcessosRapidos extends IListItem {
    url: string;
    newTab: boolean;
    icon: any;
    order: number;
}