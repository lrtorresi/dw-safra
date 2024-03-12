import { IRepository } from "../interfaces/base/IRepository";
import { IInovacaoBanner } from "../interfaces/libraries/IInovacaoBanner";
import Lists from "../common/Lists";
import Libraries from "../common/Libraries";
import { PagedItemCollection } from "impar-digital-workplace-core-library";

export class InovacaoBannerRepository implements IRepository<IInovacaoBanner> {

  public listUrl = Libraries.InovacaoBannerLibrary;
  
  public getUpdateObject(item: IInovacaoBanner) {
    throw new Error("Method not implemented.");
  }
  public mapObject(item: any, includeBaseFields: boolean): IInovacaoBanner {
    return this.objectSet(item);
  }
  public getAddObject(item: IInovacaoBanner): IInovacaoBanner {
    throw new Error("Method not implemented.");
  }
  public mapObjects(items: any[], includeBaseFields: boolean): IInovacaoBanner[] {
    return items.map((v, i) => this.objectSet(v)) as IInovacaoBanner[];
  }
  public mapPagedObjects(pagedItem: PagedItemCollection<any[]>) {
    throw new Error("Method not implemented.");
  }
  private objectSet(v: any): IInovacaoBanner {
    return {
      filePath: v.FileRef,
      id: v.ID,
      title: v.Title,
      redirectUrl: v.UrlRedirecionamento,
      openNewTab: v.AbrirEmNovaGuia,
      order: v.OrdemExibicao,
      status: v.Status,
      description: v.Description,
      chamada: v.Chamada
    } as IInovacaoBanner;
  }
}