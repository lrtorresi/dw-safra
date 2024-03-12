import { IWebPartProps } from "../../../interfaces/base/IWebPartProps";

export interface IInovacaoBannerProps extends IWebPartProps {
  bannerSpeed: number;
  bannerTime: number;
  hasSegmentation: boolean;
}
