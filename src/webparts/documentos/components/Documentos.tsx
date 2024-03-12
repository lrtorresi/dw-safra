// External libraries
import * as React from "react";
import { useEffect, useState } from "react";
import { useBoolean } from "@uifabric/react-hooks";
import { Panel, PanelType, sp, Spinner, SpinnerSize } from "impar-digital-workplace-core-library";

// Components
import Message from "./Message";
import Header from "./Header";
import Path from "./Path";
import DocumentsView from "./DocumentsView";

// Props
import { IDocumentosProps } from "./IDocumentosProps";

// Styles
import "./Documentos.scss";

const Documentos = (props: IDocumentosProps) => {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);

  const windowHeight = window.innerHeight;
  const [folders, setFolders] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [path, setPath] = useState<any[]>([]);
  const [iframeData, setIframeData] = useState<{src: string; title: string; downloadLink: string;}>({src: "",title: "",downloadLink: "",});
  const [selectOrder, setSelectOrder] = useState("az");
  const [selectType, setSelectType] = useState("all");

  // Busca a pasta principal digitada
  const getRootFolder = async () => {
    try {
      const library = await sp.web.lists
        .getByTitle(props.rootFolder)
        .items.expand("FieldValuesAsText")
        .select("FieldValuesAsText, *")
        .get();
  
      let libraryUrl: any;
      library.map(document => {
        if (document.FieldValuesAsText.FileRef) {
          libraryUrl = document.FieldValuesAsText.FileRef;
        }
      })

      const libraryUrlArr = libraryUrl.split("/");

      const URL = props.context.pageContext.site.serverRelativeUrl + "/" + libraryUrlArr[3];
      const newURL = URL + "/" + props.nextRootFolder

      const data = await sp.web
        .getFolderByServerRelativeUrl(props.nextRootFolder ? newURL : URL)
        .select("*,listItemAllFields")
        .folders.filter(`Name ne 'Forms' and Name ne '_t' and Name ne '_w' `)
        .expand("Files, Folders/Files, listItemAllFields")
        .get();

      const filesData = await sp.web
        .getFolderByServerRelativeUrl(props.nextRootFolder ? newURL : URL)
        .select("*,listItemAllFields")
        .files.expand("listItemAllFields")
        .filter(`ListItemAllFields/FileSystemObjectType ne '0'`)
        .get();

      if (props.nextRootFolder) {
        const pathToArr = newURL.substring(1).split("/");
        setPath(pathToArr);
      } else {
        const pathToArr = URL.substring(1).split("/");
        setPath(pathToArr);
      }
      if (data && data.length || filesData && filesData.length > 0) {
        setFolders(data);
        setFiles(filesData);
      } else {
        throw new Error();
      }
    } catch (error) {
      setError(
        "Falha ao buscar documentos, verifique se o nome da pasta raiz está correto"
      );
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setError(null);
    setIsLoading(true);
    // Evita um request na lista a cada tecla clicada

    const delay = setTimeout(() => {
      getRootFolder();
    }, 800);

    return () => {
      clearTimeout(delay);
    };
  }, [props.rootFolder, props.nextRootFolder]);

  // Vai entrando na árvore de documentos ao passo que o usúario vai clicando nas pastas
  // Atualiza as pastas e arquivos a serem exibidos
  const changeFolder = async (folder: any) => {
    setIsLoading(true);
    setError(null);

    const URL = folder.ServerRelativeUrl;
    const urlToArr = URL.split("/").filter((c: string) => c !== "");

    setPath(urlToArr);

    try {
      const data = await sp.web
        .getFolderByServerRelativeUrl(URL)
        .select("*,listItemAllFields")
        .folders.expand("Files, Folders/File, listItemAllFields")
        .filter(`Name ne 'Forms' and Name ne '_t' and Name ne '_w'`)
        .get();

      const filesData = await sp.web
        .getFolderByServerRelativePath(URL)
        .files.select("*,listItemAllFields")
        .expand("listItemAllFields")
        .get();

      if ((data && data.length > 0) || (filesData && filesData.length > 0)) {
        setPath(urlToArr);
        setFiles(filesData);
        setFolders(data);
      } else {
        throw new Error();
      }
    } catch (error) {
      setError(
        "Nenhum item foi encontrado nesta pasta!"
      );
    }
    setIsLoading(false);
  };

  // Vai para a pasta desejada quando o usuário clica no caminho relativo (breadcrumbs)
  const changeFolderToRelativePath = async (folder) => {
    const newRelativePathIndex = path.findIndex((item) => item === folder);
    const newRelativePathArr = path.slice(0, newRelativePathIndex + 1);
    const newRelativePathURL = "/" + newRelativePathArr.join("/");

    setError(null);
    setIsLoading(true);

    try {
      const data = await sp.web
        .getFolderByServerRelativeUrl(newRelativePathURL)
        .select("*,listItemAllFields")
        .folders.expand("Files, Folders/File, listItemAllFields")
        .filter(`Name ne 'Forms' and Name ne '_t' and Name ne '_w'`)
        .get();

      const filesData = await sp.web
        .getFolderByServerRelativeUrl(newRelativePathURL)
        .files.select("*,listItemAllFields")
        .expand("listItemAllFields")
        .get();

      if ((data && data.length > 0) || (filesData && filesData.length > 0)) {
        setFolders(data);
        setFiles(filesData);

        setPath(newRelativePathArr);
        setSearchValue("");
      } else {
        throw new Error();
      }
    } catch (error) {
      setError("Falha ao buscar documentos, por favor atualize a página e tente novamente.");
    }
    setIsLoading(false);
  };

  // Abre o Panel lateral com o arquivo selecionado e opçoes de baixar ou ver no office 365
  const handleFileFrame = (file) => {
    const src = file.LinkingUrl ? file.LinkingUrl : "";

    setIframeData({
      src,
      title: file.Name,
      downloadLink: file.ServerRelativeUrl ? file.ServerRelativeUrl : file.OriginalPath,
    });

    openPanel();
  };

  return (
    <div className="DocumentosContainer">
      <div className="Box">
        <Header titleHeader={path[path.length - 1]}>
          {props.isFilterOn &&
           (
            <>
              <select className="SelectOrder" onClick={(event: any) => {
                if (event.target.value !== selectOrder) {
                  setIsLoading(true);
                  setSelectOrder(event.target.value);
                  setTimeout(() => {
                    setIsLoading(false);
                  }, 600);
                }
              }}>
                <option value="az">Ordem alfabética - crescente</option>
                <option value="za">Ordem alfabética - decrescente</option>
                <option value="01-12">Data de modificação - crescente</option>
                <option value="12-01">Data de modificação - descrescente</option>
              </select>
            
              <select className="SelectType" onClick={(event: any) => {
                if (event.target.value !== selectType) {
                  setIsLoading(true);
                  setSelectType(event.target.value);
                  setTimeout(() => {
                    setIsLoading(false);
                  }, 600);
                }
              }}>
                <option value="all">{selectType === "all" ? "Tipo de arquivo" : "Todos"}</option>
                <option value="xlsx">xlsx</option>
                <option value="docx">docx</option>
                <option value="pptx">pptx</option>
                <option value="pdf">pdf</option>
                <option value="vsdx">vsdx</option>
                <option value="txt">txt</option>
              </select>

              <main className="SearchInputContainer">
                <input 
                  type="search" 
                  placeholder="Pesquise em nome da biblioteca" 
                  value={searchValue} 
                  onChange={(event) => {
                    setIsLoading(true);
                    setSearchValue(event.target.value);
                    setTimeout(() => {
                      setIsLoading(false);
                    }, 600);
                  }}
                />
                <button>
                  <img src={require("../assets/images/search.svg")} alt="search" width={24} height={24} />
                </button>
              </main>
            </>
            )
          }
        </Header>
        <div className="Content">
          <Path 
            path={path} 
            onChangeFolderToRelativePath={changeFolderToRelativePath} 
            rootFolder={props.rootFolder}
          />
          <div className="ContentBody">
            {isLoading &&
              <Message>
                <Spinner 
                  label="Carregando documentos" 
                  labelPosition="top" 
                  size={SpinnerSize.large}
                />
              </Message>
            }
            {
              !isLoading &&
              !error &&
              <DocumentsView 
                folderList={folders} 
                onChangeFolder={changeFolder} 
                files={files} 
                handleFileFrame={handleFileFrame}
                selectOrder={selectOrder}
                selectType={selectType}
                searchValue={searchValue}
              />
            }
            {
              !isLoading &&
              error &&
              <Message>{error}</Message>
            }
            {
              !isLoading &&
              searchValue !== "" &&
              <Message>
                Não foram encontrados mais resultados para sua busca!
              </Message>
            }
              
            {
              searchValue === "" &&
              !isLoading &&
              !error &&
              selectType !== "all" &&
              <Message><p>Não há mais arquivos do tipo <i>{selectType}</i> nessa pasta!</p></Message> 
            }
          </div>
        </div>
      </div>
      <Panel
        className="PanelStyle"
        isOpen={isOpen}
        onDismiss={dismissPanel}
        isLightDismiss={true}
        type={PanelType.medium}
      >
        <div className="PanelContainer">
          <div className="PanelHeader">
            <h2>{iframeData.title}</h2>
          </div>
          <div className="PanelContent">
            <div className="IframeContent">
              {iframeData.src !== "" && (
                <iframe
                  allowFullScreen={true}
                  height={windowHeight - windowHeight/2.5}
                  src={iframeData.src}
                  title={iframeData.title}
                />
              )}
              {iframeData.src === "" && (
                <>
                  <img src={require("../assets/images/files.svg")} alt="files_image" />
                  <h3>Visualização não disponível. Abra o arquivo.</h3>
                  <a href={iframeData.downloadLink}>
                    <button className="ViewButton">Abrir arquivo</button>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
};

export default Documentos;
