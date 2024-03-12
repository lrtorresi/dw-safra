import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  PropertyPaneTextField,
  IPropertyPaneConfiguration,
  PropertyPaneCheckbox,
  PropertyPaneSlider
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'InovacaoBannerWebPartStrings';
import InovacaoBanner from './components/InovacaoBanner';
import { IInovacaoBannerProps } from './components/IInovacaoBannerProps';
import { isWebpartAllowed, sp, i18n } from "impar-digital-workplace-core-library";

export interface IInovacaoBannerWebPartProps {
  bannerSpeed: number;
  bannerTime: number;
  hasSegmentation: boolean;
}

export default class InovacaoBannerWebPart extends BaseClientSideWebPart<IInovacaoBannerWebPartProps> {

  protected async onInit(): Promise<void> {
    sp.setup({
      sp: {
        baseUrl: this.context.pageContext.web.absoluteUrl
      },
      spfxContext: this.context
  });
  }

  public render(): void {
    const element: React.ReactElement<IInovacaoBannerProps> = React.createElement(
      InovacaoBanner,
      {
        context: this.context,
        bannerSpeed: this.properties.bannerSpeed,
        bannerTime: this.properties.bannerTime,
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
                PropertyPaneSlider('bannerSpeed',{  
                  label: i18n('BannerPrincipalPropertyLabel_bannerSpeed'),
                  min: 100,
                  max: 2000,
                  value: 900,
                  showValue: true,
                  step: 50
                }),
                PropertyPaneSlider('bannerTime',{  
                  label: i18n('BannerPrincipalPropertyLabel_bannerTime'),
                  min: 500,
                  max: 10000,
                  value: 3500,
                  showValue: true,
                  step: 100
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
