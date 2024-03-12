import { Text } from "@microsoft/sp-core-library";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { PageContext } from "@microsoft/sp-page-context";

import {
  sp,
  IItems,
  SPBatch,
  IItemAddResult,
  IItemUpdateResult,
  IFolderAddResult,
  IItem,
  IListInfo,
  IWeb,
  Web,
  IFolders,
} from "impar-digital-workplace-core-library";

import { IListService } from "../../interfaces/base/IListService";
import { IRepository } from "../../interfaces/base/IRepository";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";

export class ListService<T> implements IListService<T> {
  private _spHttpClient: SPHttpClient;
  private _pageContext: PageContext;
  private _currentWebUrl: string;
  private _currentWebRelativeUrl: string;
  private _repository: IRepository<T>;
  private _listName: string;
  private _web: IWeb;

  constructor(context: WebPartContext | ApplicationCustomizerContext, repository: IRepository<T>, siteUrl: string = "") {
    this._spHttpClient = context.spHttpClient;
    this._pageContext = context.pageContext;
    this._currentWebUrl = context.pageContext.web.absoluteUrl;
    this._currentWebRelativeUrl = context.pageContext.web.serverRelativeUrl;
    this._repository = repository;
    this._listName = repository.listUrl;
    this._web = sp.web;

    if (siteUrl) this.useSiteUrl(siteUrl);
  }

  private useSiteUrl(siteUrl) {
    const web = Web(siteUrl);
    this._web = web;
    this._currentWebRelativeUrl = siteUrl.substring(siteUrl.indexOf("/sites"));
  }

  public getListInfo(library: boolean = false): Promise<IListInfo> {
    return this._web
      .getList(
        Text.format(
          "{0}/{1}/{2}",
          this._currentWebRelativeUrl,
          !library ? "/Lists" : "",
          this._listName
        )
      )
      .get();
  }

  public getQuery(library: boolean = false): IItems {
    return this._web.getList(
      Text.format(
        "{0}/{1}/{2}",
        this._currentWebRelativeUrl,
        !library ? "/Lists" : "",
        this._listName
      )
    ).items;
  }

  public getFoldersQuery(library: boolean = false): IFolders {
    return this._web.getList(
      Text.format(
        "{0}/{1}/{2}",
        this._currentWebRelativeUrl,
        !library ? "/Lists" : "",
        this._listName
      )
    ).rootFolder.folders;
  }

  public async getQueryAsyncCAML(library: boolean = false, xml: any): Promise<any> {
    return await this._web.getList(
      Text.format(
        "{0}/{1}/{2}",
        this._currentWebRelativeUrl,
        !library ? "/Lists" : "",
        this._listName
      )
    ).renderListDataAsStream(xml);
  }

  public getItemsCAML(promise: any,includeBaseFields: boolean = false){
    return this._repository.mapObjects(promise, includeBaseFields);
}

  public async getQueryAsync(library: boolean = false, siteUrl: string = ""): Promise<IItems> {
    return await this._web.getList(
      Text.format(
        "{0}/{1}/{2}",
        this._currentWebRelativeUrl,
        !library ? "/Lists" : "",
        this._listName
      )
    ).items;
  }

  public async getQueryAsyncTeste(library: boolean = false): Promise<any> {
    return await this._web
      .getList(
        Text.format(
          "{0}/{1}/{2}",
          this._currentWebRelativeUrl,
          !library ? "/Lists" : "",
          this._listName
        )
      )
      .items.getPaged();
  }

  public async getQueryAsyncItem(
    id: number,
    library: boolean = false
  ): Promise<IItem> {
    return await this._web
      .getList(
        Text.format(
          "{0}/{1}/{2}",
          this._currentWebRelativeUrl,
          !library ? "/Lists" : "",
          this._listName
        )
      )
      .items.getById(id);
  }

  public getQueryOptions(library: boolean = false, listName?: any): IItems {
    return this._web.getList(
      Text.format(
        "{0}/{1}/{2}",
        this._currentWebRelativeUrl,
        !library ? "/Lists" : "",
        listName
      )
    ).items;
  }

  public getItems(
    promise: IItems,
    includeBaseFields: boolean = false
  ): Promise<T[]> {
    return promise().then((items: any[]) => {
      return this._repository.mapObjects(items, includeBaseFields);
    });
  }

  public getAllItems(
    promise: IItems,
    includeBaseFields: boolean = false,
    requestSize: number = 2000
  ): Promise<T[]> {
    return promise.getAll(requestSize).then((items: any[]) => {
      return this._repository.mapObjects(items, includeBaseFields);
    });
  }

  public getById(
    promise: IItem,
    includeBaseFields: boolean = false
  ): Promise<T> {
    return promise.get().then((item: any) => {
      return this._repository.mapObject(item, includeBaseFields);
    });
  }

  public addItem(item: T): Promise<IItemAddResult> {
    let objToAdd = this._repository.getAddObject(item);

    let listUrl = Text.format(
      "{0}/Lists/{1}",
      this._currentWebRelativeUrl,
      this._listName
    );

    return this._web.getList(listUrl).items.add(objToAdd);
  }

  public updateItem(item: T, id: number): Promise<IItemUpdateResult> {
    let obj = this._repository.getUpdateObject(item);

    let listUrl = Text.format(
      "{0}/Lists/{1}",
      this._currentWebRelativeUrl,
      this._listName
    );

    return this._web.getList(listUrl).items.getById(id).update(obj);
  }

  public addFolder(folderName: string): Promise<IFolderAddResult> {
    return this._web.folders.add(
      Text.format("{0}/{1}", this._listName, folderName)
    );
  }

  public deleteItem(id: number): Promise<void> {
    return this._web.lists.getByTitle(this._listName).items.getById(id).delete();
  }
}
