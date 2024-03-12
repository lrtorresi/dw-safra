import * as React from "react";
import styles from "./PortalIrh.module.scss";
import { IPortalIrhProps } from "./IPortalIrhProps";
import Prateleiras from "../../prateleiras/components/Prateleiras";
import Header from "../../header/components/Header";
import { useEffect } from "react";
import { TokenContextApi } from "../../../services/token/TokenContextApi";
import SnackbarProvider from 'react-simple-snackbar';

export default function PortalIrh(props: IPortalIrhProps) {

  return (
    <SnackbarProvider>
      <TokenContextApi props={props.context} tenantId={props.tenantId} clientId={props.clientId} portalirhPage={props.portalirhPage} >
        <div id="containerGeral" className={styles.container}>
          <div className="noticias">
            <Header
              urlCurriculo={props.urlCurriculo}
              tempoDePermanencia={props.tempoDePermanencia}
              tempoDeTransicao={props.tempoDeTransicao}
              context={props.context}
              apiUrl={props.apiUrl}
            />
            <Prateleiras context={props.context} apiUrl={props.apiUrl} bannerImgUrl={props.bannerImgUrl}/>
          </div>
        </div>
      </TokenContextApi>
    </SnackbarProvider>
  );
}
