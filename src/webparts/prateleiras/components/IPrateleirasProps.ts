import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IPrateleirasProps {
  description: string;
  context: WebPartContext;
  apiUrl: string;
  bannerImgUrl: string;
}
