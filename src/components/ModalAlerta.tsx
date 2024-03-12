import * as React from 'react';
import styles from './alertaStyles.module.scss';
import { isFirefox, isChrome, isIE, isEdge } from 'react-device-detect';
import { useEffect, useState } from 'react';


const ModalAlerta = ()=>{
 const [showModal, setShowModal] = useState<boolean>(false);
    useEffect (() =>{
        if (isIE){
            setShowModal (true);
        }


    },[] );
 return(
        <div style={{opacity:0}} className={ `${styles.alertaStyles} ${showModal?styles.show:''}` }>            
            <div className={styles.boxGeral}>
                <div className={styles.box}>
                    <header>
                        <div className={styles.vermelho}>
                            <h1><span>!</span> ATENÇÃO</h1> 
                            <p>Este site não funciona mais no internet Explorer</p>
                        </div>
                    </header>
                    <div className={styles.conteudo}>
                    <h2>
                        Para acessar diretamente seu Digital Workplace, recomendamos o navegador abaixo para ter uma melhor experiência:
                    </h2>
                    <a className={styles.linkContainer} target= "_blank" href="https://www.google.com/intl/pt-BR/chrome/">
                    <img src={require('./image/logo.png')} alt="" />
                    <p>Chrome</p>
                    </a>
                    <p>
                        Caso prefira, também é possível acessar pelo <a target='_blank' href="https://www.microsoft.com/pt-br/edge">edge</a>
                    </p>
                    </div>
                    
                </div> 
            </div>         

        </div>
      );
};
export default ModalAlerta;

