import { ICard } from "./ICard";


export interface IPrateleira{
    prateleira: string;
    fiqueAtento:boolean;
    ordem:number;
    cards: ICard[];
}