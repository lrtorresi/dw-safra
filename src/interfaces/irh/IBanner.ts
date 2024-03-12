

export interface IBanner{
    idBanner: number;
    titulo: string;
    urlImagem?: string;
    //Imagem: string;
    rgbTitulo: string;
    descricao: string;
    rgbDescricao: string;
    url: string;
    abrirNovaGuia: boolean;
    textoBotaoAcao: string;
    rgbTextoBotaoAcao: string;
    ordem: number;
}