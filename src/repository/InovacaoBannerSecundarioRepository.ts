import { IRepository } from "../interfaces/base/IRepository";
import { IInovacaoBannerSecundario } from "../interfaces/libraries/IInovacaoBannerSecundario";
import Lists from "../common/Lists";
import Libraries from "../common/Libraries";
import { PagedItemCollection } from "impar-digital-workplace-core-library";

export class InovacaoBannerSecundarioRepository implements IRepository<IInovacaoBannerSecundario> {

  public listUrl = Libraries.InovacaoBannerSecundarioLibrary;
  
  public getUpdateObject(item: IInovacaoBannerSecundario) {
    throw new Error("Method not implemented.");
  }
  public mapObject(item: any, includeBaseFields: boolean): IInovacaoBannerSecundario {
    return this.objectSet(item);
  }
  public getAddObject(item: IInovacaoBannerSecundario): IInovacaoBannerSecundario {
    throw new Error("Method not implemented.");
  }
  public mapObjects(items: any[], includeBaseFields: boolean): IInovacaoBannerSecundario[] {
    return items.map((v, i) => this.objectSet(v)) as IInovacaoBannerSecundario[];
  }
  public mapPagedObjects(pagedItem: PagedItemCollection<any[]>) {
    throw new Error("Method not implemented.");
  }
  private objectSet(v: any): IInovacaoBannerSecundario {
    return {
      filePath: v.FileRef,
      id: v.ID,
      title: v.Title,
      redirectUrl: v.UrlRedirecionamento,
      openNewTab: v.AbrirEmNovaGuia,
      order: v.OrdemExibicao,
      status: v.Status,
      description: v.Description
    } as IInovacaoBannerSecundario;
  }
}