
import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styles from './Prateleiras.module.scss';
import { IPrateleirasProps } from './IPrateleirasProps';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Card from './Card';
import { IPrateleira } from '../../../interfaces/irh/IPrateleira';
import { IPilar } from '../../../interfaces/irh/IPilar';
import { ITokenContext } from '../../../services/token/ITokenContext';
import { TokenContext } from '../../../services/token/TokenContextApi';
import { IrhBusiness } from '../../../business/IrhBusiness';
import { ICard } from '../../../interfaces/irh/ICard';

let updateFilterByFavoriteAction: boolean = false;

export default function Prateleiras(props) {

  const [activeSection, setActiveSection] = useState<number>(-1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNoItemsMessage, setShowNoItemsMessage] = useState<boolean>(false);
  const [shelves, setShelves] = useState<IPrateleira[]>([]);
  const [pillars, setPillars] = useState<IPilar[]>([]);
  const [filteredShelves, setFilteredShelves] = useState<IPrateleira[]>([]);
  const [adaptedSize, setadaptedSize]= useState<number>(0);
  const [conditionDots, setConditionDots]= useState<boolean>(false);
  const [error, setError]= useState<any>(null);
  const [loading, setLoading]= useState<boolean>(true);

  
  
  const tokenContext = useContext<ITokenContext>(TokenContext);
  const bllIrh = new IrhBusiness(props, tokenContext.token.accessToken);

  const getPilares = async () => {
    try {
      const pilares: IPilar[] = await bllIrh.getPillar();
      setPillars(pilares);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      console.error('Pilares error >>> ', error);
    }
  };

  const getPrateleiras = async () => {
    try {

      let prateleiras: IPrateleira[] = await bllIrh.getShelf();
      prateleiras = prateleiras.filter(prat => prat.fiqueAtento === false);

      setShelves(prateleiras);
      setFilteredShelves(prateleiras);
      setLoading(false);

      let list;
      list = document.querySelectorAll(".favorito");
      for (var i = 0; i < list.length; ++i) {
          list[i].classList.remove(styles.disabled);
      }

    } catch (error) {
      setError(error);
      setLoading(false);
      console.error('Prateleiras error >>> ', error);
    }
  };
  
  useEffect(()=> {
    getPilares();
    getPrateleiras();
    adaptContainerSize();
  },[]);

  useEffect(() => {
    startFilter();
  }, [searchTerm, activeSection]);

  const updatePrateleirasByFavoriteAction = () => {
    console.log('INIT updatePrateleirasByFavoriteAction');
    updateFilterByFavoriteAction=true;
    getPrateleiras();
  }
  

  useEffect(()=>{
    const slickListValue = document.querySelector("#opcoes .slick-list").clientWidth;
    const containerGeral = document.getElementById('wrapperRef').clientWidth;
    slickListValue > containerGeral ? setConditionDots(true): setConditionDots(false);

    if(updateFilterByFavoriteAction){
      updateFilterByFavoriteAction=false;
      startFilter();
    }

  },[filteredShelves]);

  const adaptContainerSize = () => {
    const containerGeral = document.getElementById('wrapperRef').clientWidth;
    const screenWidth = window.innerWidth;
    var result= (screenWidth - containerGeral)/2;

    setadaptedSize(result);

  };

  window.addEventListener('resize', adaptContainerSize);


  const clearSearch = () => {
    setSearchTerm('');
    setActiveSection(-1);
  };

  const settings = {
    className: "slider variable-width",
    dots: false,
    infinite: false,
    centerMode: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  };
  
  const settingsOpcoes = {
    dots: conditionDots,
    // dots: false,
    infinite: false,
    variableWidth: true,
    speed: 500,
    // slidesToShow: 2,
    slidesToShow: 1,
    slidesToScroll:1
  };

  function startFilter() {

    let filteredTemp:IPrateleira[] = [];
    shelves && shelves.length > 0 && shelves.sort((a,b) => { return a.ordem - b.ordem; }).map((prateleira)=>
      filteredTemp.push({
        prateleira:prateleira.prateleira,
        fiqueAtento: prateleira.fiqueAtento,
        ordem: prateleira.ordem,
        cards: prateleira.cards && prateleira.cards.length > 0 && prateleira.cards.sort((a,b) => { return a.ordem - b.ordem; }).filter((card:ICard)=>
                (
                  searchTerm !== '' ?
                    card && card.palavrasChave && card.palavrasChave.toLowerCase().includes(searchTerm.toLowerCase())
                    :
                    true
                )
                &&
                (activeSection === -1 ? true : 
                activeSection === 0  ? card.favorito === true : 
                (card.pilarSouSafra && card.pilarSouSafra.length > 0 && card.pilarSouSafra.filter((pilar)=>pilar === activeSection).length > 0))
        )
      })
    );

    setFilteredShelves(filteredTemp);

    if(activeSection !== -1 || searchTerm !== '') setShowNoItemsMessage(true);
    filteredTemp && filteredTemp.forEach(prat => {
      if (prat.cards.length > 0) {
        setShowNoItemsMessage(false);
        return;
      }
    });
  }

  return(
    <>
      <div className={styles.container}>    
          <div className={styles.barraPesquisaCont}>
            <input 
              type="text" 
              name="pesquisa" 
              id="pesquisa" 
              placeholder='Pesquise no RH'
              value={searchTerm}
              onChange={(event)=> {
                setSearchTerm(event.target.value);
                setActiveSection(activeSection);
              }}
            />
           
          </div>
          <div id='opcoes' className={`${styles.opcoes} ${!conditionDots ? styles.noSlickButtons : ''}`}>

            <ul>
              <Slider {...settingsOpcoes}>
                  <div>
                    <li>
                      <a href='javascript:void(0);' className={activeSection === -1 ? `${styles.active}`: ''}
                        onClick={()=> {
                          setSearchTerm(searchTerm);
                          setActiveSection(-1);
                        }}  
                      >
                        Tudo
                      </a>
                    </li>
                  </div>
                  <div>
                    <li>
                      <a href='javascript:void(0);' className={activeSection === 0 ? `${styles.active}`: ''}
                        onClick={()=> {
                          setSearchTerm(searchTerm);
                          setActiveSection(0);
                        }}   
                      >
                        Favoritos
                      </a>
                    </li>
                  </div>
                  {loading && <div className={styles.loading}><h4>Carregando...</h4></div>}
                  {
                    error && 
                    <div className={styles.errorPilares}>
                      <h3>Houve um erro ao carregar as informações</h3>
                    </div>
                  }
                  {pillars && pillars.length > 0 && pillars.sort((a,b) => { return a.ordem - b.ordem; })
                  .map((pilar,index)=>
                    <div>
                      <li>
                        <a href='javascript:void(0);' className={activeSection === pilar.idPilar ? `${styles.active}`: ''}
                          onClick={()=> {
                            setSearchTerm(searchTerm);
                            setActiveSection(pilar.idPilar);
                          }}
                        >
                          {pilar.nome}
                        </a>
                      </li>
                    </div>
                  )
                }
              </Slider>
            </ul>
          </div>
          {loading && <div className={styles.loading}><h2>Carregando...</h2></div>}
          {error && 
            <div className={styles.errorPrateleiras}>
              <h3>Houve um erro ao carregar as informações</h3>
            </div>
          }
            {(searchTerm === '' && activeSection === -1) && filteredShelves && filteredShelves.length > 0 &&
              filteredShelves.sort((a,b) => { return a.ordem - b.ordem; }).map((dado:IPrateleira)=>
              <div id='prateleira' className={styles.sectionCards} style={{paddingLeft:`${adaptedSize <= 0 ? '42' : adaptedSize}px`}}>
                <h1 title={dado.prateleira} id='pratTitle'>{dado.prateleira ? dado.prateleira : 'Prateleira sem titulo'}</h1>
                <div className={styles.wrap}>
                  {
                    dado.cards.length > 0 ?
                    <Slider {...settings}>
                      {dado.cards.sort((a,b) => { return a.ordem - b.ordem; }).map((cartao)=><Card card={cartao} context={props.context} apiUrl={props.apiUrl} updatePrateleiras={updatePrateleirasByFavoriteAction} bannerImgUrl={props.bannerImgUrl}/>)}
                    </Slider>
                    : 
                      <div className={styles.noItem} style={{width: `calc(100% - ${adaptedSize}px)`}}>
                        <h3>Não há items a serem exibidos</h3>
                      </div> 
                  }
                </div>
              </div>
            )
          }
          {(searchTerm !== '' || activeSection !== -1) && 
            <div className={styles.containerFiltteredCards}>
              { searchTerm !== '' &&
                <div className={styles.clearSearchContainer}>
                  <h1>Resultado da busca</h1>
                  <button onClick={() => clearSearch()}>Limpar busca</button>
                </div>
              }
              <div className={styles.sectionFilteredCards} style={searchTerm === '' ? {paddingTop: '24px'} : {}}>
                {
                filteredShelves.map(dado => 
                    (
                      dado.cards.map((cartao) =>
                        <Card card={cartao} apiUrl={props.apiUrl} context={props.context} updatePrateleiras={updatePrateleirasByFavoriteAction} bannerImgUrl={props.bannerImgUrl}/>
                      )
                    )
                )}
              </div>
            </div>
          }
          {
            (showNoItemsMessage) &&
            <div className={styles.noItem} style={{width: `calc(100% - ${adaptedSize}px)`}}>
              <h3>Não há items a serem exibidos</h3>
            </div>
          }
      </div>
    </>
  ); 
}


