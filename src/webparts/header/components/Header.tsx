
import * as React from 'react';
import Banner from '../../banner/components/Banner';
import Curriculo from '../../curriculo/components/Curriculo';
import Notificacoes from '../../notificacoes/components/Notificacoes';
import styles from './Header.module.scss';
import { IHeaderProps } from './IHeaderProps';

export default function Header(props:IHeaderProps) {
  return (
    <>
    <div className={styles.container}>
      <div id='wrapperRef' className={styles.wrapper}>
        {/* <Curriculo urlCurriculo={props.urlCurriculo} context={props.context} apiUrl={props.apiUrl}/>  */}
        <Banner tempoDeTransicao={props.tempoDeTransicao} tempoDePermanencia={props.tempoDePermanencia} context={props.context} apiUrl={props.apiUrl}/>
        <Notificacoes context={props.context} apiUrl={props.apiUrl}/>
      </div>

    </div>
    {/* links rapidos */}
    <div className={styles.pesquisaCont}>
          <div className={styles.linksCont}>

            <div className={styles.littleBox}>
              <div className={styles.wrap}>
                <img src={require('../../../image/square_icon01.png')} alt="" />
                <p>short text</p>
              </div>
            </div>

            <div className={styles.littleBox}>
              <div className={styles.wrap}>
                <img src={require('../../../image/square_icon02.png')} alt="" />
                <p>short text</p>
              </div>
            </div>

            <div className={styles.littleBox}>
              <div className={styles.wrap}>
                <img src={require('../../../image/square_icon03.png')} alt="" />
                <p>short text</p>
              </div>
            </div>

            <div className={styles.littleBox}>
              <div className={styles.wrap}>
                <img src={require('../../../image/square_icon04.png')} alt="" />
                <p>short text</p>
              </div>
            </div>

            <div className={styles.littleBox}>
              <div className={styles.wrap}>
                <img src={require('../../../image/square_icon05.png')} alt="" />
                <p>short text</p>
              </div>
            </div>

          </div>
    </div>
    
    </>

  );
}
