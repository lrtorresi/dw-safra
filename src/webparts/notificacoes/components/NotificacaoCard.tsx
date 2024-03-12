import * as React from 'react';
import { INotification } from '../../../interfaces/irh/INotification';
import styles from './Notificacoes.module.scss';
export interface NotificationCardProps{
  item: INotification;
}


export default function NotificacaoCard(props:NotificationCardProps) {
  
  const iconeUm= require ('../../../extensions/stylingExtension/components/StylingExtension/scss/img/analytics.png');
   
  const {
      titulo, 
      descricao, 
      urlIcone, 
      rgbBgIcone, 
      url, 
      notificacao,
      abrirNovaGuia
    } = props.item;


  return (
      <a href={url} target={abrirNovaGuia === true ? '_blank' : '_self'} className={styles.notificacaoCard}>
          <span style={{background: `${rgbBgIcone}`}}>
            {
              urlIcone ? <img src={`${urlIcone}`} alt="" /> :
              <img src={`${iconeUm}`} alt="" />
            } 
          </span>
          <span 
            className={styles.notificacaoIcon}
            style={
              { display: notificacao >= 0 ? 'block' : 'none', 
                fontSize: notificacao > 9 ? '10px': '12px',
                lineHeight: notificacao > 9 ? '12px' : '1',
                letterSpacing: notificacao > 9 ? '-1px' : 'unset',
                paddingRight: notificacao > 9 ? '2px' : 'unset'
              }}
            >{notificacao > 9 ? '+9': notificacao || notificacao > 0 ?  notificacao: ''}</span>
          <div className={styles.text}>
              <h5 title={titulo}>{titulo ? titulo : 'Sem Título'}</h5>
              <p title={descricao}>{descricao ? descricao : 'Sem descrição'}</p>
          </div>
      </a>
  );
}
