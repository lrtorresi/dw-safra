import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';
import { sp, i18n } from "impar-digital-workplace-core-library";

import * as strings from 'LinksRapidosSafraWebPartStrings';
import LinksRapidosSafra from './components/LinksRapidosSafra';
import { ILinksRapidosSafraProps } from './components/ILinksRapidosSafraProps';
import Globals from '../../helpers/Globals';

export interface ILinksRapidosSafraWebPartProps {
  webpartTitle: string;
}

export default class LinksRapidosSafraWebPart extends BaseClientSideWebPart<ILinksRapidosSafraWebPartProps> {

  protected async onInit(): Promise<void> {
    const _ = await super.onInit();
    let setup = { spfxContext: this.context };
    if (Globals.isIE11())
      setup["ie11"] = true;
    sp.setup(setup);
  }

  public render(): void {
    const element: React.ReactElement<ILinksRapidosSafraProps> = React.createElement(
      LinksRapidosSafra,
      {
        context: this.context,
        siteUrl: this.context.pageContext.site.absoluteUrl,
        webpartTitle: this.properties.webpartTitle
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: i18n('Configuration')
          },
          groups: [
            {
              groupFields: [
                  PropertyPaneTextField('webpartTitle', {
                      label: i18n('LinksRapidosPropertyLabel_webpartTitle')
                  })
              ]
            }
          ]
        }
      ]
    };
  }
}
