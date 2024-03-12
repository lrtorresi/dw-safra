
import * as React from 'react';
import {useState, useEffect} from 'react';
import { IrhBusiness } from '../../../business/IrhBusiness';
import styles from './Curriculo.module.scss';
import { ICurriculoProps } from './ICurriculoProps';

export interface IUserProfileProperties{
  Key
}

export default function Curriculo(props) {

  const bllBar = new IrhBusiness(props);

  const [info, setInfo] = useState<any>();

 const baseUrlImg = '/_vti_bin/DelveApi.ashx/people/profileimage?size=L&userId=';

 const loadInfo = async () => {
  let item = {};
  const infos = await bllBar.getCurrentUserUserProfile();

  if(infos["UserProfileProperties"] && infos["UserProfileProperties"].length > 0){
    infos["UserProfileProperties"].forEach((prop) => {
      item[prop.Key] = prop.Value ? prop.Value : '';
    });
  }
  
  setInfo(item);
};

  useEffect(()=>{
    loadInfo();
  },[]);

  return( 
    <div className={styles.curriculoContainer}>
      <div className={styles.candidatoCont}>
        <img 
          className={styles.photo} 
          src={`${baseUrlImg}${props.context.pageContext.user.loginName}`}
        />
        <div className={styles.wrapTxt}>
          <h3 title={props.context.pageContext.user.displayName} >
            {props.context.pageContext.user.displayName ? 
            props.context.pageContext.user.displayName : 
            'Sem nome para exibir'
            }
          </h3>
          {/* cargo */}
          <h6>{ info && info.department ? info.department.item : ''}</h6>
          {/* <h6 title={fakeCurriculo.cargo}>{fakeCurriculo.cargo}</h6> */}
          
          <div className={styles.line}></div>
          <a href={props.urlCurriculo}> Atualizar CV &#10132; </a>
        </div>  
      </div>


    </div>
  );
}
