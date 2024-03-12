import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'BlipChatSafraWebPartStrings';
import BlipChatSafra from './components/BlipChatSafra';
import { IBlipChatSafraProps } from './components/IBlipChatSafraProps';
import Globals from '../../helpers/Globals';
import { sp } from 'impar-digital-workplace-core-library';

export interface IBlipChatSafraWebPartProps {
  AppKey: string;
  CustomCommonUrl: string;
}

export default class BlipChatSafraWebPart extends BaseClientSideWebPart<IBlipChatSafraWebPartProps> {

  protected async onInit(): Promise<void> {
    let setup = {
      sp: {
        baseUrl: this.context.pageContext.web.absoluteUrl,
      },
      spfxContext: this.context,
    };
    if (Globals.isIE11()) setup["ie11"] = true;
    sp.setup(setup);
  }

  public render(): void {
    const element: React.ReactElement<IBlipChatSafraProps> = React.createElement(
      BlipChatSafra,
      {
        AppKey: this.properties.AppKey,
        context: this.context,
        apiUrl: '',
        CustomCommonUrl: this.properties.CustomCommonUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'Configurações'
          },
          groups: [
            {
              groupName: 'Insira os dados abaixo',
              groupFields: [
                PropertyPaneTextField('AppKey', {
                  label: 'Insira o AppKey'
                }),
                PropertyPaneTextField('CustomCommonUrl', {
                  label: 'Insira o CustomCommonUrl'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
