import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "PortalIrhWebPartStrings";
import PortalIrh from "./components/PortalIrh";
import { IPortalIrhProps } from "./components/IPortalIrhProps";
import Globals from "../../helpers/Globals";
import { sp } from "impar-digital-workplace-core-library";

export interface IPortalIrhWebPartProps {
  urlCurriculo: string;
  tempoDeTransicao: number;
  tempoDePermanencia: number;
  tenantId: string;
  clientId: string;
  apiUrl: string;
  bannerImgUrl: string;
  portalirhPage: string;
}

export default class PortalIrhWebPart extends BaseClientSideWebPart<IPortalIrhWebPartProps> {
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
    const element: React.ReactElement<IPortalIrhProps> = React.createElement(
      PortalIrh,
      {
        urlCurriculo: this.properties.urlCurriculo,
        context: this.context,
        tempoDeTransicao: this.properties.tempoDeTransicao,
        tempoDePermanencia: this.properties.tempoDePermanencia,
        tenantId: this.properties.tenantId,
        clientId: this.properties.clientId,
        apiUrl: this.properties.apiUrl,
        bannerImgUrl: this.properties.bannerImgUrl,
        portalirhPage: this.properties.portalirhPage
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Configurações do Portal IRH",
          },
          groups: [
            {
              groupName: "Propriedades do bem-vindo",
              groupFields: [
                PropertyPaneTextField("urlCurriculo", {
                  label: "Digite a Url do Curriculo",
                }),
              ],
            },
            {
              groupName: "Propriedades do Banner",
              groupFields: [
                // PropertyPaneTextField("tempoDeTransicao", {
                //   label: "Digite o tempo de transição",
                  
                // }),
                PropertyPaneSlider('tempoDeTransicao',{  
                  label:"Tempo de transição em segundos",  
                  min:1,  
                  max:5,  
                  value:2,  
                  showValue:true,  
                  step:1
                }),
                PropertyPaneSlider('tempoDePermanencia',{  
                  label:"Tempo de permanência em segundos",  
                  min:1,  
                  max:5,  
                  value:2,  
                  showValue:true,  
                  step:1
                }),
              ],
            },
            {
              groupName: "Propriedades do ambiente",
              groupFields: [
                PropertyPaneTextField("tenantId", {
                  label: "Digite o ID do Tenant",
                }),
                PropertyPaneTextField("clientId", {
                  label: "Digite o ClientId",
                }),
                PropertyPaneTextField("apiUrl", {
                  label: "Digite a URL da API",
                }),
                PropertyPaneTextField("portalirhPage", {
                  label: "Digite a URL da página do PortalIRH",
                }),
              ],
            },
            {
              groupName: "Propriedades do Card",
              groupFields: [
                PropertyPaneTextField("bannerImgUrl", {
                  label: "Digite a Url da imagem padrão do Card",
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
