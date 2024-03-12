import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneSlider,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'EspecialistaWebPartStrings';
import Especialista from './components/Especialista';
import { IEspecialistaProps } from './components/IEspecialistaProps';

export interface IEspecialistaWebPartProps {
  wpTitle: string;
  textLink: string;
  urlLink: string;
  qtdNoticias: number;
}

export default class EspecialistaWebPart extends BaseClientSideWebPart<IEspecialistaWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IEspecialistaProps> = React.createElement(
      Especialista,
      {
        wpTitle: this.properties.wpTitle,
        textLink: this.properties.textLink,
        urlLink: this.properties.urlLink,
        qtdNoticias: this.properties.qtdNoticias
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
            description: 'Configurações gerais'
          },
          groups: [
            {
              groupName: 'Propriedades do componente:',
              groupFields: [
                PropertyPaneTextField('wpTitle', {
                  label: 'Digite o título da webpart'
                }),
                PropertyPaneTextField('textLink', {
                  label: 'Digite o texto do link de redirecionamento'
                }),
                PropertyPaneTextField('urlLink', {
                  label: 'Digite a URL do link de redirecionamento'
                }),
                PropertyPaneSlider('qtdNoticias',{  
                  label:"Quantidade de notícias a serem exibidas",  
                  min:1,  
                  max:50,  
                  value:50,  
                  showValue:true,  
                  step:1
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
