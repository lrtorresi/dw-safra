import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "CurriculoWebPartStrings";
import Curriculo from "./components/Curriculo";
import { ICurriculoProps } from "./components/ICurriculoProps";
import Globals from "../../helpers/Globals";
import { sp } from "impar-digital-workplace-core-library";

export interface ICurriculoWebPartProps {
  urlCurriculo: string;
}

export default class CurriculoWebPart extends BaseClientSideWebPart<ICurriculoWebPartProps> {
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
    const element: React.ReactElement<ICurriculoProps> = React.createElement(
      Curriculo,
      {
        context: this.context,
        urlCurriculo: this.properties.urlCurriculo,
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
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("urlCurriculo", {
                  label: "Digite a Url do Curriculo",
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
