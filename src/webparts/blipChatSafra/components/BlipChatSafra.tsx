import * as React from 'react';
import { useEffect } from "react";
import { IBlipChatSafraProps } from './IBlipChatSafraProps';
import { BlipChat } from "blip-chat-widget";
//import { IrhBusiness } from '../../../business/IrhBusiness';

export default (props:IBlipChatSafraProps) => {

  useEffect(()=> {

    new BlipChat()
      .withAppKey(props.AppKey)
      .withButton({ color:"#1e2447", icon:""})
      .withCustomCommonUrl(props.CustomCommonUrl)
      .withAccount({
        fullName: props.context.pageContext.user.displayName,
        email:props.context.pageContext.user.email != '' ? props.context.pageContext.user.email : props.context.pageContext.user.loginName,
      })
      .build();

  });

  return (
    <></>
  );
};