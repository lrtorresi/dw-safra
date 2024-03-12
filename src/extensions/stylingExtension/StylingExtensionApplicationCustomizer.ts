import { override } from '@microsoft/decorators';
import {
  ApplicationCustomizerContext,
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';
import { sp, ensureI18n } from "impar-digital-workplace-core-library";


import * as React from 'react';
import * as ReactDOM from 'react-dom';
import StylingExtension from './components/StylingExtension/StylingExtension';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IStylingExtensionApplicationCustomizerProperties {
  // This is an example; replace with your own property
  context: ApplicationCustomizerContext;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class StylingExtensionApplicationCustomizer
  extends BaseApplicationCustomizer<IStylingExtensionApplicationCustomizerProperties> {

  private _bottomPlaceholder: PlaceholderContent | undefined;

  @override
  public async onInit(): Promise<void> {
    sp.setup({
        sp: {
          baseUrl: this.context.pageContext.web.absoluteUrl
        },
        spfxContext: this.context
    });

    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);
    this._renderPlaceHolders();

    let url: string = `https://b0422.sharepoint.com/sites/SouSafra/SiteAssets/favicon.png`;
    var link = document.querySelector("link[rel*='icon']") as HTMLElement || document.createElement('link') as HTMLElement;
    link.setAttribute('type', 'image/x-icon');
    link.setAttribute('rel', 'shortcut icon');
    link.setAttribute('href', url);
    document.getElementsByTagName('head')[0].appendChild(link);

    return Promise.resolve();

  }

  private _renderPlaceHolders(): void {
    if (!this._bottomPlaceholder) {
      this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Bottom,
        {}
      );

      const elem = React.createElement(StylingExtension, { context: this.context });
      ReactDOM.render(elem, this._bottomPlaceholder.domElement);   
    }
  }

}
