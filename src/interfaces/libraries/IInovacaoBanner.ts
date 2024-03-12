import { ILibraryGeneric } from '../base/ILibraryGeneric';

export enum principalBannerStatus {
    active = "Ativo",
    inactive = "Inativo"
}

export enum principalBannerThemeColor {
    systemColor = "Cor do Sistema",
    black = "Preto",
    white = "Branco"
}

export enum principalBannerInternalNames{
    fileServerRelativeUrl = "File/ServerRelativeUrl",
    fileName = "File/Name",
    redirectUrl = "UrlRedirecionamento",
    openNewTab = "AbrirEmNovaGuia",
    order = "OrdemExibicao",
    status = "Status",
    description = "Description"
}

export interface IInovacaoBanner extends ILibraryGeneric{
    redirectUrl: string;
    openNewTab: boolean;
    order: number;
    status: principalBannerStatus;
    description: string;
    filePath: string;
    chamada: string;
}