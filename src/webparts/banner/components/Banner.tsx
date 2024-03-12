import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import axios from 'axios';

import { IBannerProps } from './IBannerProps';
import styles from './Banner.module.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { IBanner } from '../../../interfaces/irh/IBanner';
import { ITokenContext } from '../../../services/token/ITokenContext';
import { TokenContext } from '../../../services/token/TokenContextApi';
import { IrhBusiness } from '../../../business/IrhBusiness';

export default function Banner(props) {

  const tokenContext = useContext<ITokenContext>(TokenContext);
  const bllIrh = new IrhBusiness(props, tokenContext.token.accessToken);
  
  const [banners, setBanners] = useState<IBanner[]>([]);
  const [error, setError]= useState<any>(null);
  const [loading, setLoading]= useState<boolean>(true);
  

  const getBanners = async () => {
    try {
      const banners: any = await bllIrh.getBanners();
        setBanners(banners);
        setLoading(false);
    } catch (error) {
        setError(error);
        setLoading(false);
        console.error('Banner error >>> ', error);
      
    }
  };

  useEffect(()=>{

    getBanners();
    
  },[]);



  
  const settings = {
    dots: true,
    infinite: true,
    speed: props.tempoDeTransicao ? (props.tempoDeTransicao *1000) : 2000,
    autoplaySpeed: props.tempoDePermanencia? (props.tempoDePermanencia * 1000) : 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };

  

  return(
    <div className={styles.slickwrap}>
      {loading && <div className={styles.loading}><h2>Carregando...</h2></div>}
      {error && 
        <div className={styles.error}>
          <h3>Houve um erro ao carregar as informações</h3>
          {/* <p>{error}</p> */}
        </div>
      }
      <Slider {...settings}>
        {banners && banners.length > 0 && banners.sort((a,b) => { return a.ordem - b.ordem; }).map((banner)=>
          <div>
            <div className={styles.bannerCont}>
              {
                !banner.urlImagem &&
                <div className={styles.error}>
                  <h3>Banner sem URL da Imagem cadastrada.</h3>
                </div>
              }
              {
                banner.urlImagem &&
                <img src={`${banner.urlImagem}`} alt={`${banner.titulo}`}/>
              }
              <div className={styles.txtCont}>
                <h1 title={banner.titulo} style={{color: banner.rgbTitulo ? `${banner.rgbTitulo}`: '#00001E'}}>{banner.titulo ? banner.titulo : 'Sem Tíulo'}</h1>
                <h3 
                  title={banner.descricao} 
                  style={{color: banner.rgbDescricao ? `${banner.rgbDescricao}`: '#1A1A1A'}}>
                    {banner.descricao ? banner.descricao : 'Sem descrição'}</h3>
                <a 
                  style={{color: banner.rgbTextoBotaoAcao ? `${banner.rgbTextoBotaoAcao}`: '#7495b8'}}
                  title={banner.textoBotaoAcao}  
                  href={banner.url}
                  target={banner.abrirNovaGuia ? "_blank" : '_self'}
                >{banner.textoBotaoAcao} ➔</a>
              </div>
            </div>
          </div>
          )
        }
      </Slider>
    </div>
    );
  
}
