// External libraries
import * as React from "react";

// Styled
import "./styles.scss";

function Path(props) {
  const regex = new RegExp(props.rootFolder, "ig");
  const indexToHide = props.path.findIndex((name: string) => regex.test(name));
  const position = props.path.length - 2;

  return (
    <div className="Path">
      <main>
        {
          props.path.length > indexToHide + 1 && 
          <img 
            src={require("../../assets/images/returnCircle.svg")} 
            alt="return" 
            onClick={props.onChangeFolderToRelativePath.bind(this, props.path[position], false)} 
          />
        }
        <b onClick={props.onChangeFolderToRelativePath.bind(this, props.path[2], false)}>{props.rootFolder}</b>
        {
          props.path.map((folder, i: number) => {
            if (i < indexToHide + 1) {
              return;
            } else {
              return (
                <p onClick={props.onChangeFolderToRelativePath.bind(this, folder, false)}>
                  <img src={require("../../assets/images/divisorPath.svg")} alt="return" />
                  {" "}
                  {folder}
                </p>
              );
            }
          })
        }
      </main>
    </div>
  );
}

export default Path;
