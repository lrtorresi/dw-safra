import { IRepository } from "../interfaces/base/IRepository";
import { IFavorite } from "../interfaces/lists/IFavorite";
import Lists from "../common/Lists";

export class FavoriteRepository implements IRepository<IFavorite> {
  public listUrl = Lists.homeFavorites;

  public getUpdateObject(item: IFavorite): any {
    return {
        Title: item.title,
        JsonFavoritos: item.jsonFavorites
    };
  }

  public mapObject(item: any, includeBaseFields: boolean): IFavorite {
    return this.objectSet(item);
  }

  public getAddObject(item: IFavorite): any {
    return {
        Title: item.title,
        JsonFavoritos: item.jsonFavorites
    };
  }

  public mapObjects(items: any[], includeBaseFields: boolean): IFavorite[] {
    return items.map((v, i) => this.objectSet(v)) as IFavorite[];
  }

  private objectSet(v: any): IFavorite {
    return {
      id: v.ID,
      title: v.Title,
      jsonFavorites: v.JsonFavoritos,
    } as IFavorite;
  }
}