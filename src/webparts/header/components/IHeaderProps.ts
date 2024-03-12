import { WebPartContext } from "@microsoft/sp-webpart-base";


export interface IHeaderProps {
  urlCurriculo: string;
  context: WebPartContext;
  tempoDeTransicao:number;
  tempoDePermanencia:number;
  apiUrl: string;
}
