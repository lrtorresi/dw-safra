import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IDocumentosProps {
  rootFolder: string;
  nextRootFolder: string;
  isFilterOn: boolean;
  context: WebPartContext;
}
