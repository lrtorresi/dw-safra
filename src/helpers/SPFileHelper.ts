import { Text } from "@microsoft/sp-core-library";
import { SPHttpClient } from "@microsoft/sp-http";
import { PageContext } from "@microsoft/sp-page-context";
import Libraries from "../common/Libraries";

export enum WopiPreviewOption {
      imagepreview,
      interactivepreview
}

export class SPFileHelper {
      private _currentWebUrl: string;
      private _currentWebRelativeUrl: string;

      constructor(pageContext: PageContext) {
            this._currentWebUrl = pageContext.site.absoluteUrl;
            this._currentWebRelativeUrl = pageContext.site.serverRelativeUrl;
      }

      public humanFileSize(bytes: number, si: boolean = true): string {
            let thresh = si ? 1000 : 1024;
            if (Math.abs(bytes) < thresh) {
                  return bytes + " B";
            }
            let units = si
                  ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
                  : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
            let u = -1;
            do {
                  bytes /= thresh;
                  ++u;
            } while (Math.abs(bytes) >= thresh && u < units.length - 1);
            return bytes.toFixed(1) + " " + units[u];
      }

     

      public getWopiPreview(documentUrl: string, previewType: WopiPreviewOption, siteUrl?: string): string {
            if (siteUrl == undefined) {
                  siteUrl = this._currentWebUrl;
            }

            let returnValue: string = Text.format(
                  "{0}/_layouts/15/WopiFrame.aspx?sourcedoc={1}&action={2}",
                  siteUrl,
                  documentUrl,
                  previewType.toString()
            );

            return returnValue;
      }
}
