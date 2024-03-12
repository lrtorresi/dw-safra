import { IRepository } from "../interfaces/base/IRepository";
import { ISystemFavorite } from "../interfaces/lists/ISystems";
import Lists from "../common/Lists";

export class SystemFavoriteRepository implements IRepository<ISystemFavorite> {
  public listUrl = Lists.systemsFavorites;

  public getUpdateObject(item: ISystemFavorite): any {
    return {
        Title: item.title,
        JsonFavoritos: item.jsonFavorites
    } as any;
  }

  public mapObject(item: any, includeBaseFields: boolean): ISystemFavorite {
    return this.objectSet(item);
  }

  public getAddObject(item: ISystemFavorite): any {
    return {
        Title: item.title,
        JsonFavoritos: item.jsonFavorites
    } as any;
  }

  public mapObjects(items: any[], includeBaseFields: boolean): ISystemFavorite[] {
    return items.map((v, i) => this.objectSet(v)) as ISystemFavorite[];
  }

  private objectSet(v: any): ISystemFavorite {
    return {
      id: v.ID,
      title: v.Title,
      jsonFavorites: v.JsonFavoritos
    } as ISystemFavorite;
  }
}