import { IWebPartProps } from "../../../interfaces/base/IWebPartProps";

export interface IEventosInovacaoProps extends IWebPartProps {
  webpartTitle: string;
  hasSegmentation: boolean;
  seeAllButtonText: string;
  returnButtonText: string;
}
