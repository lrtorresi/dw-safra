import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IBannerProps {
  context: WebPartContext;
  description: string;
  tempoDeTransicao: number;
  tempoDePermanencia: number;
}
