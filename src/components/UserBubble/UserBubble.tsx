import * as React from 'react';
import UserProfileImage, { UserProfileImageSizes } from './../UserProfileImage/UserProfileImage';
import './UserBubble.scss'


export default function UserBubble(props) {
  const email = props.props.context.pageContext._user.email

  return (
    <div className="Contributor">

      <UserProfileImage
        className="ProfileImg"
        picSize={UserProfileImageSizes.LARGE}
        userEmail={email}
        linkToDelve={false}
        width={78}
        height={78}
        title=''
      />
    </div>
  )
}