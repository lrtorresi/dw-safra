import { IRepository } from "../interfaces/base/IRepository";
import { IAdminItem } from "../interfaces/lists/IAdminItem";
import Lists from "../common/Lists";

export class AdminRepository implements IRepository<IAdminItem> {
  public listUrl = "";

  public getUpdateObject(item: IAdminItem): any {
    throw new Error("Method not implemented.");
  }

  public mapObject(item: any, includeBaseFields: boolean): IAdminItem {
    return this.objectSet(item);
  }

  public getAddObject(item: IAdminItem): any {
    throw new Error("Method not implemented.");
  }

  public mapObjects(items: any[], includeBaseFields: boolean): IAdminItem[] {
    return items.map((v, i) => this.objectSet(v)) as IAdminItem[];
  }

  private objectSet(v: any): IAdminItem {
    return {
      id: v.ID,
      title: v.Title,
      category: v.Category,
      description: v.Description,
      url: v.Url
    } as IAdminItem;
  }
}