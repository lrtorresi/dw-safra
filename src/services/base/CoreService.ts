import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { PageContext } from "@microsoft/sp-page-context";
// import { sp, IItems, SPBatch, IItemAddResult, IItemUpdateResult, IFolderAddResult, IItem, ISiteUser } from "impar-digital-workplace-core-library";
import { sp, IItems, SPBatch, IItemAddResult, IItemUpdateResult, IFolderAddResult, IItem, ISiteUser } from "impar-digital-workplace-core-library";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";

export class CoreService  {
      private _spHttpClient: SPHttpClient;
      private _pageContext: PageContext;
      private _currentWebUrl: string;
      private _currentWebRelativeUrl: string;
      private _listName: string;

      constructor(context: WebPartContext | ApplicationCustomizerContext) {
            
            this._spHttpClient = context.spHttpClient;
            this._pageContext = context.pageContext;
            this._currentWebUrl = context.pageContext.site.absoluteUrl;
            this._currentWebRelativeUrl = context.pageContext.site.serverRelativeUrl;
      }

      public currentUser() : Promise<ISiteUserInfo> {
            return sp.web.currentUser.get();
      }

      public currentUserSP() : Promise<any> {
            return sp.profiles.myProperties.get();
      }
}
