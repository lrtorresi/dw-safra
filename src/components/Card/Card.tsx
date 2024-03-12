import * as React from "react";
import "./Card.scss";
interface ICardProps {
  titulo: string;
  link: string;
  src: string;
  height: number;
  width: number;
}

export default function Card(props: ICardProps) {
  return (
    <a className="DWCard" href={props.link}>
      <div className="container">
        <img
          className="image"
          src={props.src}
          alt={props.titulo}
          height={50}
          width={50}
        />
        <p className="title">{props.titulo}</p>
      </div>
    </a>
  );
}
