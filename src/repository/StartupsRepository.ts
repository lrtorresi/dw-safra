import { IRepository } from "../interfaces/base/IRepository";
import Lists from "../common/Lists";
import { IStartups } from "../interfaces/lists/IStartups";

export class StartupsRepository implements IRepository<IStartups> {
  public listUrl = Lists.startups;

  public getUpdateObject(item: IStartups): any {
    throw new Error("Method not implemented.");
  }

  public mapObject(item: any, includeBaseFields: boolean): IStartups {
    return this.objectSet(item);
  }

  public getAddObject(item: IStartups): any {
    throw new Error("Method not implemented.");
  }

  public mapObjects(items: any[], includeBaseFields: boolean): IStartups[] {
    return items.map((v, i) => this.objectSet(v)) as IStartups[];
  }

  private objectSet(v: any): IStartups {
    return {
      id: v.ID,
      title: v.Title,
      url: v.Url,
      icon: JSON.parse(v.Icon) && JSON.parse(v.Icon).serverRelativeUrl,
      created: new Date(v.Created),
      resume: v.Resume,
      description: v.Descricao
    } as IStartups;
  }
}