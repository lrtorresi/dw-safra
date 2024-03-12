import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';
import { isWebpartAllowed, sp, i18n } from "impar-digital-workplace-core-library";

import * as strings from 'StartupsWebPartStrings';
import Startups from './components/Startups';
import { IStartupsProps } from './components/IStartupsProps';
import Globals from '../../helpers/Globals';

export interface IStartupsWebPartProps {
  context: WebPartContext;
}

export default class StartupsWebPart extends BaseClientSideWebPart<IStartupsWebPartProps> {

  protected async onInit(): Promise<void> {
    sp.setup({
      sp: {
        baseUrl: this.context.pageContext.web.absoluteUrl
      },
      spfxContext: this.context
  });
  }

  public render(): void {
    const element: React.ReactElement<IStartupsProps> = React.createElement(
      Startups,
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
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
