import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IBlipChatSafraProps {
  context: WebPartContext;
  AppKey: string;
  apiUrl: string;
  CustomCommonUrl: string;
}
