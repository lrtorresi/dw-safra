import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneCheckbox,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';

import * as strings from 'EventosInovacaoWebPartStrings';
import EventosInovacao from './components/EventosInovacao';
import { IEventosInovacaoProps } from './components/IEventosInovacaoProps';
import { isWebpartAllowed, sp, i18n } from "impar-digital-workplace-core-library";

export interface IEventosInovacaoWebPartProps {
  context: WebPartContext;
  webpartTitle: string;
  hasSegmentation: boolean;
  seeAllButtonText: string;
  returnButtonText: string;
}

export default class EventosInovacaoWebPart extends BaseClientSideWebPart<IEventosInovacaoWebPartProps> {

  protected async onInit(): Promise<void> {
    sp.setup({
      sp: {
        baseUrl: this.context.pageContext.web.absoluteUrl
      },
      spfxContext: this.context
  });
  }

  public render(): void {
    const element: React.ReactElement<IEventosInovacaoProps> = React.createElement(
      EventosInovacao,
      {
        context: this.context,
        webpartTitle: this.properties.webpartTitle,
        hasSegmentation: this.properties.hasSegmentation,
        seeAllButtonText: this.properties.seeAllButtonText,
        returnButtonText: this.properties.returnButtonText
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
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('webpartTitle', {
                  label: i18n('CalendarioCorporativoPropertyLabel_webpartTitle')
                }),
                PropertyPaneTextField('seeAllButtonText', {
                  label: i18n('CalendarioCorporativoPropertyLabel_seeAllButtonText')
                }),
                PropertyPaneTextField('returnButtonText', {
                  label: i18n('CalendarioCorporativoPropertyLabel_returnButtonText')
                }),
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
