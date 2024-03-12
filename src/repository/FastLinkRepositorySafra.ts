import { IRepository } from "../interfaces/base/IRepository";
import Lists from "../common/Lists";
import { IFastLinkSafra } from "../interfaces/lists/IFastLinkSafra";

export class FastLinksRepositorySafra implements IRepository<IFastLinkSafra> {
  public listUrl = Lists.homeFastLinks;

  public getUpdateObject(item: IFastLinkSafra): any {
    throw new Error("Method not implemented.");
  }

  public mapObject(item: any, includeBaseFields: boolean): IFastLinkSafra {
    return this.objectSet(item);
  }

  public getAddObject(item: IFastLinkSafra): any {
    throw new Error("Method not implemented.");
  }

  public mapObjects(items: any[], includeBaseFields: boolean): IFastLinkSafra[] {
    return items.map((v, i) => this.objectSet(v)) as IFastLinkSafra[];
  }

  private objectSet(v: any): IFastLinkSafra {
    return {
      id: v.ID,
      title: v.Title,
      url: v.Url,
      newTab: v.NewTab,
      order: v.Order0,
      icon: JSON.parse(v.Icon) && JSON.parse(v.Icon).serverRelativeUrl,
      created: new Date(v.Created),
      mobile: v.OpenMobile
    } as IFastLinkSafra;
  }
}