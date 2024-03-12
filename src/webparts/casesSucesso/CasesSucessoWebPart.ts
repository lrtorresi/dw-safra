import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';

import * as strings from 'CasesSucessoWebPartStrings';
import CasesSucesso from './components/CasesSucesso';
import { ICasesSucessoProps } from './components/ICasesSucessoProps';
import { sp } from "impar-digital-workplace-core-library";

export interface ICasesSucessoWebPartProps {
  context: WebPartContext;
}

export default class CasesSucessoWebPart extends BaseClientSideWebPart<ICasesSucessoWebPartProps> {

  protected async onInit(): Promise<void> {
    sp.setup({
      sp: {
        baseUrl: this.context.pageContext.web.absoluteUrl
      },
      spfxContext: this.context
    });
  }
  
  public render(): void {
    const element: React.ReactElement<ICasesSucessoProps> = React.createElement(
      CasesSucesso,
      {
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
        
      ]
    };
  }
}
