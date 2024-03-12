import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneCheckbox,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'InovacaoBannerSecundarioWebPartStrings';
import InovacaoBannerSecundario from './components/InovacaoBannerSecundario';
import { IInovacaoBannerSecundarioProps } from './components/IInovacaoBannerSecundarioProps';
import { isWebpartAllowed, sp, i18n } from "impar-digital-workplace-core-library";

export interface IInovacaoBannerSecundarioWebPartProps {
  hasSegmentation: boolean;
}

export default class InovacaoBannerSecundarioWebPart extends BaseClientSideWebPart<IInovacaoBannerSecundarioWebPartProps> {

  protected async onInit(): Promise<void> {
    sp.setup({
      sp: {
        baseUrl: this.context.pageContext.web.absoluteUrl
      },
      spfxContext: this.context
  });
  }

  public render(): void {
    const element: React.ReactElement<IInovacaoBannerSecundarioProps> = React.createElement(
      InovacaoBannerSecundario,
      {
        context: this.context,
        hasSegmentation: this.properties.hasSegmentation
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
                PropertyPaneCheckbox('hasSegmentation', {
                  text: i18n("EnableSegmentation"),
                  checked: this.properties.hasSegmentation
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
