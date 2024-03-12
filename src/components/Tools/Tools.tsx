import * as React from "react";
import Card from "../Card/Card";
import "./Tools.scss";
interface IToolsProps {
  data: any[];
  boxTitle?: string;
}

export default function Tools(props: IToolsProps) {
  return (
    <div className="DWWrapper DWCustom DWTools">
      <h4>{props.boxTitle}</h4>
      <div className="DWContainer">
        {!!props.data &&
          props.data.length > 0 &&
          props.data.map((item) => {
            return (
              <Card
                titulo={item.Titulo}
                link={item.Link}
                height={50}
                width={50}
                src={item.AttachmentFiles[0].ServerRelativeUrl}
              />
            );
          })}
      </div>
    </div>
  );
}
