import * as React from 'react';
import {useState, useEffect, useContext} from 'react';
import styles from './Notificacoes.module.scss';
import axios from 'axios';

import { INotificacoesProps } from './INotificacoesProps';
import { escape } from '@microsoft/sp-lodash-subset';
import NotificacaoCard from './NotificacaoCard';
import { IPrateleira } from '../../../interfaces/irh/IPrateleira';
import { INotification } from '../../../interfaces/irh/INotification';
import { ITokenContext } from '../../../services/token/ITokenContext';
import { TokenContext } from '../../../services/token/TokenContextApi';
import { IrhBusiness } from '../../../business/IrhBusiness';

export default function Notificacoes(props) {
  //get notificacoes 
  
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [error, setError] = useState<any>(null);

  const tokenContext = useContext<ITokenContext>(TokenContext);
  const bllIrh = new IrhBusiness(props, tokenContext.token.accessToken);

  const loadInfo = async () => {
    try {
      let localNotifications:INotification[] = [];
      const tempPrateleira:IPrateleira[] = await bllIrh.getShelf();

      tempPrateleira && tempPrateleira.length > 0 && tempPrateleira.filter((prateleira) =>
        prateleira.fiqueAtento === true && prateleira.cards && prateleira.cards.length > 0 ? 
          prateleira.cards.sort((a,b) => { return a.ordem - b.ordem; }).map((card)=>
            localNotifications.push({
              titulo: card.titulo,
              descricao: card.descricao,
              urlIcone: card.urlIcone,
              rgbBgIcone: card.rgbBgIcone,
              url: card.url,
              notificacao: card.notificacao,
              abrirNovaGuia: card.abrirNovaGuia,
              ordem: card.ordem
            })
          ): ''
    );
      setNotifications(localNotifications);
    } catch (error) {
      setError(error);
      console.error('Notificação Error >>> ', error);
    }
  };
  
    useEffect(()=>{
      loadInfo();
    },[]);
  
  
  return (
    <div className={styles.notificacoesCont}>
      <h3><span>!</span> Notificações</h3>
      <div className={styles.flexCont}>
        {error && 
        <div className={styles.error}>
          <h3>Houve um erro ao carregar as informações</h3>
        </div>}
        { notifications && notifications.length > 0 &&
          notifications.map((notification, index)=> <NotificacaoCard item={notification}/>)}
      </div>
    </div>
  );
}
