
export interface ICard{
    idCard: number;
    titulo:string;
    descricao:string;
    textoOnHover: string;
    tamanho: number;
    ordem: number;
    palavrasChave: string;  
    url: string;
    textoBotaoAcao: string;
    urlIcone: any;
    rgbBgIcone: string;
    abrirNovaGuia: boolean;
    urlImagem: string;
    favorito: boolean;
    notificacao: number;
    pilarSouSafra:[number] | null;
}
