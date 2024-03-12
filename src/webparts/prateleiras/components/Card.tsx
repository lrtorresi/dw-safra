import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { IrhBusiness } from '../../../business/IrhBusiness';
import { ITokenContext } from '../../../services/token/ITokenContext';
import { TokenContext } from '../../../services/token/TokenContextApi';
import styles from './Prateleiras.module.scss';
import { useSnackbar } from 'react-simple-snackbar';
import { ICard } from '../../../interfaces/irh/ICard';

export default function Card (props) {
    const card:ICard = props.card;
    const icone = require('../../../extensions/stylingExtension/components/StylingExtension/scss/img/analytics.png');

    const [openSnackbar, closeSnackbar] = useSnackbar();

    const tokenContext = useContext<ITokenContext>(TokenContext);
    
    let bllIrh = new IrhBusiness(props, tokenContext.token.accessToken);
    
    const addFavorite = async (id) => {
        let list;
        list = document.querySelectorAll(".favorito");
        for (var i = 0; i < list.length; ++i) {
            list[i].classList.add(styles.disabled);
        }
        try {
            await bllIrh.addFavorite(id);
            openSnackbar('Favorito adicionado com sucesso');
            props.updatePrateleiras();
        } catch (error) {
            openSnackbar('Erro ao adicionar favorito');
            console.error('Favorito Error >>> ', error);
        }
    };

    const removeFavorite = async (id) => {
        let list;
        list = document.querySelectorAll(".favorito");
        for (var i = 0; i < list.length; ++i) {
            list[i].classList.add(styles.disabled);
        }
        try {
            await bllIrh.removeFavorite(id);
            openSnackbar('Favorito removido com sucesso');
            props.updatePrateleiras();
        } catch (error) {
            openSnackbar('Erro ao remover favorito');
            console.error('Favorito Error >>> ', error);
        }
    };

    return(
        <div className={styles.foraCard}>
            <span 
            className={styles.notificacaoIcon}
            style={{
                display: card.notificacao >= 0 ? 'block' : 'none',
                letterSpacing: card.notificacao > 9 ? '-1px' : 'unset',
                paddingRight: card.notificacao > 9 ? '3px' : 'unset'
            }}
            >
                {
                    card.notificacao > 9 ? '+9': card.notificacao || 
                    card.notificacao > 0 ?  card.notificacao: '' 
                }
            </span>
            <div className={styles.card}
                style={{width: card.tamanho === 1 ? '264px': '360px'}}
            >
                <div className={styles.postImage}>
                    <img src={`${card.urlImagem ? card.urlImagem : props.bannerImgUrl}`} alt="" />
                </div>
                <div className={styles.content}>
                    <span className={styles.category} style={{background:`${card.rgbBgIcone? card.rgbBgIcone: '#00003C'}`}}>
                        <img  className={styles.categoryIcon} src={`${card.urlIcone ? card.urlIcone : icone}`} alt="" />
                    </span>
                    <span className={styles.subject} title={card.titulo}>{card.titulo ? card.titulo : 'Sem Titulo'}</span>
                    <h4 title={card.descricao}>{card.descricao ? card.descricao : 'Sem descrição'}</h4>
                    <a 
                        href='javascript:void(0);' 
                        className={`${styles.favorite} favorito`} 
                        onClick={() => card.favorito === false ? addFavorite(card.idCard) : removeFavorite(card.idCard)}
                    >
                        {/* Need a post to change the status of it */}
                        {card.favorito === false ? 'Favoritar ☆' : 'Favoritado ★' }
                    </a>
                    <p title={card.textoOnHover}>
                        <br />
                        {card.textoOnHover ? card.textoOnHover : 'Sem informações'}
                    </p>
                </div>
                    <div className={styles.acesseBox}>
                        <a 
                            className={styles.acesse} 
                            title={card.textoBotaoAcao} 
                            target={card.abrirNovaGuia ? "_blank" : '_self'}
                            href={card.url}>{card.textoBotaoAcao ? card.textoBotaoAcao : 'Acessar '}➔
                        </a>
                    </div>
            </div>
        </div>
    );
}