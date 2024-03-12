import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IWebPartProps {
  context: WebPartContext | ApplicationCustomizerContext;
  siteUrl?: string;
}
