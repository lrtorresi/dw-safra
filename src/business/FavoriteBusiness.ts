import { IWebPartProps } from "../interfaces/base/IWebPartProps";
import { CoreService } from "../services/base/CoreService";
import * as _ from "lodash";
import { FavoriteRepository } from "../repository/FavoriteRepository";
import { ListService } from "../services/base/ListService";
import { IFavorite, IFavoriteItem } from "../interfaces/lists/IFavorite";
import {
  IItemAddResult,
  IItemUpdateResult,
  ISiteUser,
  IListInfo,
} from "impar-digital-workplace-core-library";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import SessionStorageSupport from "./SessionStorageSupport";
import { SystemFavoriteRepository } from "../repository/SystemFavoriteRepository";

const selectDefault = ["ID", "Id", "Title"];

export class FavoriteBusiness extends SessionStorageSupport {
  public listInfo: IListInfo;
  public currentUser: ISiteUser;
  private svcCore: CoreService;
  private svcFavorite: ListService<IFavorite>;
  private context: WebPartContext | ApplicationCustomizerContext;

  constructor(
    props: IWebPartProps,
    siteUrl: string = "",
    systemsMode: boolean = false
  ) {
    super();
    this.context = props.context;
    this.svcCore = new CoreService(props.context);
    this.svcFavorite = new ListService(
      props.context,
      systemsMode ? new SystemFavoriteRepository() : new FavoriteRepository(),
      siteUrl
    );
  }

  // Favorite List

  private async addFavorite(item: IFavorite): Promise<IItemAddResult> {
    return this.svcFavorite.addItem(item);
  }

  private async setFavorite(
    item: IFavorite,
    id: number
  ): Promise<IItemUpdateResult> {
    return this.svcFavorite.updateItem(item, id);
  }

  public validateUrl(str: string) {
    var pattern = new RegExp(
      /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
    ); // fragment locator
    return !!pattern.test(str);
  }

  public async getFavoriteFromCurrentUser(
    cache: boolean = false
  ): Promise<IFavorite> {
    if (cache) {
      const data = this.getStoredData("DWFavorites");
      if (data) return data;
    }

    const query = await this.svcFavorite.getQueryAsync(false);
    const select = [...selectDefault, "JsonFavoritos", "Title"];
    const filters = [`Title eq '${this.context.pageContext.user.loginName}'`];
    const get = query.select(...select).filter(filters.join(" and "));

    const favorites: IFavorite[] = await this.svcFavorite.getItems(get, true);

    if (cache) this.setStoredData("DWFavorites", favorites[0]);

    if (favorites.length) return favorites[0];
    return null;
  }

  public getParsedJsonFavorites(favorite: IFavorite): IFavoriteItem[] | any[] {
    const parsedJsonFavorites = favorite
      ? JSON.parse(favorite.jsonFavorites)
      : [];
    return parsedJsonFavorites;
  }

  public async addFavoriteToCurrentUser(
    favoriteObj: IFavoriteItem | any
  ): Promise<IItemAddResult> {
    const favorite: IFavorite = await this.getFavoriteFromCurrentUser();

    if (favorite) {
      const parsedJsonFavorites: IFavoriteItem[] | any[] =
        this.getParsedJsonFavorites(favorite);

      return this.setFavorite(
        {
          title: this.context.pageContext.user.loginName,
          jsonFavorites: JSON.stringify([...parsedJsonFavorites, favoriteObj]),
        } as IFavorite,
        favorite.id
      );
    }

    return this.addFavorite({
      title: this.context.pageContext.user.loginName,
      jsonFavorites: JSON.stringify([favoriteObj]),
    });
  }

  public async editFavoriteFromCurrentUser(
    favoriteObj: IFavoriteItem | any,
    favoriteIndex: number
  ): Promise<IItemAddResult> {
    const favorite: IFavorite = await this.getFavoriteFromCurrentUser();

    if (favorite) {
      const parsedJsonFavorites: IFavoriteItem[] | any[] =
        this.getParsedJsonFavorites(favorite);

      if (parsedJsonFavorites[favoriteIndex]) {
        parsedJsonFavorites[favoriteIndex] = favoriteObj;
      } else {
        throw new Error("The index does not exist.");
      }

      return this.setFavorite(
        {
          title: this.context.pageContext.user.loginName,
          jsonFavorites: JSON.stringify(parsedJsonFavorites),
        } as IFavorite,
        favorite.id
      );
    } else {
      throw new Error("The current user does not have any favorites.");
    }
  }

  public async removeFavoriteFromCurrentUserById(
    favoriteIndex: number
  ): Promise<IItemUpdateResult> {
    const favorite: IFavorite = await this.getFavoriteFromCurrentUser();

    if (favorite) {
      const parsedJsonFavorites: IFavoriteItem[] | any[] =
        this.getParsedJsonFavorites(favorite);

      if (parsedJsonFavorites[favoriteIndex]) {
        parsedJsonFavorites.splice(favoriteIndex, 1);
      } else {
        throw new Error("The index does not exist.");
      }

      return this.setFavorite(
        {
          title: this.context.pageContext.user.loginName,
          jsonFavorites: JSON.stringify(parsedJsonFavorites),
        } as IFavorite,
        favorite.id
      );
    }
  }
}
