import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'InovacaoAcessosRapidosWebPartStrings';
import InovacaoAcessosRapidos from './components/InovacaoAcessosRapidos';
import { IInovacaoAcessosRapidosProps } from './components/IInovacaoAcessosRapidosProps';
import { isWebpartAllowed, sp, i18n } from "impar-digital-workplace-core-library";

export interface IInovacaoAcessosRapidosWebPartProps {
  webpartTitle: string;
}

export default class InovacaoAcessosRapidosWebPart extends BaseClientSideWebPart<IInovacaoAcessosRapidosWebPartProps> {

  protected async onInit(): Promise<void> {
    sp.setup({
      sp: {
        baseUrl: this.context.pageContext.web.absoluteUrl
      },
      spfxContext: this.context
  });
  }

  public render(): void {
    const element: React.ReactElement<IInovacaoAcessosRapidosProps> = React.createElement(
      InovacaoAcessosRapidos,
      {
        webpartTitle: this.properties.webpartTitle,
        context: this.context
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
