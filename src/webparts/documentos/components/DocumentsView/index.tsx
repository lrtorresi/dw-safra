// External libraries
import * as React from "react";
import { sp } from "@pnp/sp";
import "@pnp/sp/search"

// Styles
import "./styles.scss";

function DocumentsView(props) {
  const [filteredArray, setFilteredArray] = React.useState([]);

  React.useEffect(() => {
    getFilteredItems()

    if (!props.searchValue)
      setFilteredArray([])
  }, [props.searchValue])

  async function getFilteredItems() {
    const items = await sp.search({
      Querytext: `${props.searchValue} AND Path:https://b0422.sharepoint.com/sites/SouSafra-institucional/Documentos%20Compartilhados/Gest%C3%A3o%20de%20Risco/Documentos%20T%C3%A9cnicos/*`,
      RowLimit: 999,
    }).then((response) => {
      if (response) {
        setFilteredArray(response.PrimarySearchResults)
      }
    })
  }

  return (
    <ul className="ItemsDocumentsView">
      {props.folderList && props.folderList.sort((a, b) => {
        if (props.selectOrder === "az") {
          return a.Name.localeCompare(b.Name);
        } else if (props.selectOrder === "za") {
          return b.Name.localeCompare(a.Name);
        } else if (props.selectOrder === "01-12") {
          return new Date(a.ListItemAllFields.Modified) as any - +new Date(b.ListItemAllFields.Modified);
        } else if (props.selectOrder === "12-01") {
          return new Date(b.ListItemAllFields.Modified) as any - +new Date(a.ListItemAllFields.Modified)
        }
      })
      .filter((filteredFolder: any) => {
        if (filteredFolder.Name.toLowerCase().includes(props.searchValue.toLowerCase())) {
          return filteredFolder;
        }
      }).map((folder) => {
        return (
          <li onClick={props.onChangeFolder.bind(null, folder)} title={folder.Name}>
            <span className="IconCard">
              <img src={require("../../assets/images/folder.svg")} alt="folder" />
            </span>
            <div className="ItemName">
              {folder.Name}
            </div>
          </li>
        );
      })}
      {props.searchValue ? filteredArray.sort((a, b) => {
        if (props.selectOrder === "az") {
          return a.Title.localeCompare(b.Title);
        } else if (props.selectOrder === "za") {
          return b.Title.localeCompare(a.Title);
        } else if (props.selectOrder === "01-12") {
          return new Date(a.LastModifiedTime) as any - +new Date(b.LastModifiedTime);
        } else if (props.selectOrder === "12-01") {
          return new Date(b.LastModifiedTime) as any - +new Date(a.LastModifiedTime)
        }
      }).filter((filteredFile: any) => {
        if (filteredFile.Title.toLowerCase().includes(props.searchValue.toLowerCase())) {
          return filteredFile;
        }
      }).map((file: any) => {
        if (file.hasOwnProperty("Type") && file.Type === "1") {
          return;
        } else {
          const splitFileName = file.Title.split(".");
          // const fileType = splitFileName[splitFileName.length - 1];
          const fileType = file.FileType;

          if (fileType === props.selectType || props.selectType === "all") {
            return (
              <li onClick={props.handleFileFrame.bind(null, file)} title={file.Title}>
                <div className="IconCard">
                  {fileType === "xlsx" && <img className="Icon" src={require("../../assets/images/excel.svg")} />}
                  {fileType === "docx" && <img className="Icon" src={require("../../assets/images/word.svg")} />}
                  {fileType === "pptx" && <img className="Icon" src={require("../../assets/images/powerPoint.png")} />}
                  {fileType === "pdf" && <img className="Icon" src={require("../../assets/images/pdf.svg")} />}
                  {fileType === "vsdx" && <img className="Icon" src={require("../../assets/images/visio.png")} />}
                  {fileType === "txt" && <img className="Icon" src={require("../../assets/images/txt.png")} />}
                  {
                    fileType !== "xlsx" &&
                    fileType !== "docx" &&
                    fileType !== "pptx" &&
                    fileType !== "pdf" &&
                    fileType !== "vsdx" &&
                    fileType !== "txt" &&
                    <img src={require("../../assets/images/oneNote.png")} alt="file" />
                  }
                </div>
                <div className="ItemName" title={file.Title}>
                  {file.Title}
                </div>
              </li>
            );
          } else {
            return;
          }
        }
      })
        :
        props.files && props.files.sort((a, b) => {
          if (props.selectOrder === "az") {
            return a.Name.localeCompare(b.Name);
          } else if (props.selectOrder === "za") {
            return b.Name.localeCompare(a.Name);
          } else if (props.selectOrder === "01-12") {
            return new Date(a.ListItemAllFields.Modified) as any - +new Date(b.ListItemAllFields.Modified);
          } else if (props.selectOrder === "12-01") {
            return new Date(b.ListItemAllFields.Modified) as any - +new Date(a.ListItemAllFields.Modified)
          }
        }).filter((filteredFile: any) => {
          if (filteredFile.Name.toLowerCase().includes(props.searchValue.toLowerCase())) {
            return filteredFile;
          }
        }).map((file: any) => {
          if (file.hasOwnProperty("Type") && file.Type === "1") {
            return;
          } else {
            const splitFileName = file.Name.split(".");
            const fileType = splitFileName[splitFileName.length - 1];

            if (fileType === props.selectType || props.selectType === "all") {
              return (
                <li onClick={props.handleFileFrame.bind(null, file)} title={file.Name}>
                  <div className="IconCard">
                    {fileType === "xlsx" && <img className="Icon" src={require("../../assets/images/excel.svg")} />}
                    {fileType === "docx" && <img className="Icon" src={require("../../assets/images/word.svg")} />}
                    {fileType === "pptx" && <img className="Icon" src={require("../../assets/images/powerPoint.png")} />}
                    {fileType === "pdf" && <img className="Icon" src={require("../../assets/images/pdf.svg")} />}
                    {fileType === "vsdx" && <img className="Icon" src={require("../../assets/images/visio.png")} />}
                    {fileType === "txt" && <img className="Icon" src={require("../../assets/images/txt.png")} />}
                    {
                      fileType !== "xlsx" &&
                      fileType !== "docx" &&
                      fileType !== "pptx" &&
                      fileType !== "pdf" &&
                      fileType !== "vsdx" &&
                      fileType !== "txt" &&
                      <img src={require("../../assets/images/oneNote.png")} alt="file" />
                    }
                  </div>
                  <div className="ItemName" title={file.Name}>
                    {file.Name}
                  </div>
                </li>
              );
            } else {
              return;
            }
          }
        })
      }
    </ul>
  );
}

export default DocumentsView;
