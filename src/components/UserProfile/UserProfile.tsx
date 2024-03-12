import * as React from 'react'
import { useEffect, useState } from 'react';
import UserProfileImage, { UserProfileImageSizes } from './../UserProfileImage/UserProfileImage';
import './UserProfile.scss'
import { sp } from 'impar-digital-workplace-core-library';



export default function UserProfile(props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [job, setJob] = useState('')

  const getProfile = async () => {
    let res = await sp.profiles.myProperties.get();
    setName(res.DisplayName)
    setEmail(res.Email)
    setJob(res.Title)
  }
  useEffect(() => {
    getProfile();
  }, [])




  return (
    <div className="Container">


      <UserProfileImage
        className=""
        picSize={UserProfileImageSizes.LARGE}
        userEmail={email}
        linkToDelve={false}
        width={145}
        height={145}
        title=''
      />


      <div className="Text">
        <h2>{name}</h2>
        <h3>{job}</h3>
      </div>

      <a className='toDelve' href={`https://${window.location.hostname.split(".")[0]}-my.sharepoint.com/PersonImmersive.aspx?accountname=i%3A0%23%2Ef%7Cmembership%7C${email}`}>Acessar Meu Perfil</a>


    </div>
  )
}
