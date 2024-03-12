import { IListItem } from "../base/IListItem";

export interface ITools extends IListItem {
  Titulo: string;
  Link: string;
  AttachmentFiles: string[];
}
