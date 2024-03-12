import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "DocumentosWebPartStrings";
import Documentos from "./components/Documentos";
import { IDocumentosProps } from "./components/IDocumentosProps";
import { sp } from "impar-digital-workplace-core-library";

export interface IDocumentosWebPartProps {
  rootFolder: string;
  nextRootFolder: string;
  isFilterOn: boolean;
}

export default class DocumentosWebPart extends BaseClientSideWebPart<IDocumentosWebPartProps> {
  protected async onInit(): Promise<void> {
    sp.setup({
      sp: {
        baseUrl: this.context.pageContext.web.absoluteUrl
      },
      spfxContext: this.context
  });
  }

  public render(): void {
    const element: React.ReactElement<IDocumentosProps> =
      React.createElement(Documentos, {
        rootFolder: this.properties.rootFolder,
        nextRootFolder: this.properties.nextRootFolder,
        isFilterOn: this.properties.isFilterOn,
        context: this.context,
      });

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
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("rootFolder", {
                  label: "Nome da pasta raíz",
                }),
                PropertyPaneTextField("nextRootFolder", {
                  label: "URL da pasta a ser acessada (opcional)",
                  placeholder: 'Separe os itens da URL com "/"'
                }),
                PropertyPaneToggle("isFilterOn", {
                  label: "Filtro:",
                  checked: true
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
