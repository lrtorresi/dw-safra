import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IPortalIrhProps {
  urlCurriculo: string;
  context: WebPartContext;
  tempoDeTransicao: number;
  tempoDePermanencia: number;
  tenantId: string;
  clientId: string;
  apiUrl: string;
  bannerImgUrl: string;
  portalirhPage: string;
}
