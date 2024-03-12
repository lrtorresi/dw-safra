import { IRepository } from "../interfaces/base/IRepository";
import Lists from "../common/Lists";
import { IInovacaoAcessosRapidos } from "../interfaces/lists/IInovacaoAcessosRapidos";

export class IInovacaoAcessosRapidosRepository implements IRepository<IInovacaoAcessosRapidos> {
  public listUrl = Lists.homeFastLinks;

  public getUpdateObject(item: IInovacaoAcessosRapidos): any {
    throw new Error("Method not implemented.");
  }

  public mapObject(item: any, includeBaseFields: boolean): IInovacaoAcessosRapidos {
    return this.objectSet(item);
  }

  public getAddObject(item: IInovacaoAcessosRapidos): any {
    throw new Error("Method not implemented.");
  }

  public mapObjects(items: any[], includeBaseFields: boolean): IInovacaoAcessosRapidos[] {
    return items.map((v, i) => this.objectSet(v)) as IInovacaoAcessosRapidos[];
  }

  private objectSet(v: any): IInovacaoAcessosRapidos {
    return {
      id: v.ID,
      title: v.Title,
      url: v.Url,
      newTab: v.NewTab,
      order: v.Order0,
      icon: JSON.parse(v.Icon) && JSON.parse(v.Icon).serverRelativeUrl,
      created: new Date(v.Created)
    } as IInovacaoAcessosRapidos;
  }
}