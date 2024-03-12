import { IRepository } from "../interfaces/base/IRepository";
import Lists from "../common/Lists";
import { ICasesSucesso } from "../interfaces/lists/ICasesSucesso";

export class CasesSucessoRepository implements IRepository<ICasesSucesso> {
  public listUrl = Lists.cases;

  public getUpdateObject(item: ICasesSucesso): any {
    throw new Error("Method not implemented.");
  }

  public mapObject(item: any, includeBaseFields: boolean): ICasesSucesso {
    return this.objectSet(item);
  }

  public getAddObject(item: ICasesSucesso): any {
    throw new Error("Method not implemented.");
  }

  public mapObjects(items: any[], includeBaseFields: boolean): ICasesSucesso[] {
    return items.map((v, i) => this.objectSet(v)) as ICasesSucesso[];
  }

  private objectSet(v: any): ICasesSucesso {
    return {
      id: v.ID,
      title: v.Title,
      url: v.Url,
      icon: JSON.parse(v.Icon) && JSON.parse(v.Icon).serverRelativeUrl,
      created: new Date(v.Created),
      resume: v.Resume,
      description: v.Descricao
    } as ICasesSucesso;
  }
}