import * as React from "react";
import {
  Icon,
  MessageBar,
  MessageBarType,
  Shimmer,
  ShimmerElementsGroup,
  ShimmerElementType,
  i18n,
  getFavIcon,
} from "impar-digital-workplace-core-library";
import "./People.scss";
import { IFavorite, IFavoriteItem } from "../../interfaces/lists/IFavorite";
import UserProfileImage, {
  UserProfileImageSizes,
} from "../UserProfileImage/UserProfileImage";

export default ({
  data,
  loading = false,
  boxTitle = "",
  error = "",
  showCallToAction = false,
  customClass = "",
}: IGraphComponentProps) => {
  let ret: JSX.Element;

  if (error) {
    ret = (
      <MessageBar
        messageBarType={MessageBarType.error}
        className="hubItemMessageBar"
      >
        {error}
      </MessageBar>
    );
  } else if (data.length === 0) {
    ret = (
      <MessageBar className="hubItemMessageBar">
        {i18n("PessoasAoRedorEmpty")}
      </MessageBar>
    );
  } else {
    ret = (
      <div className="peopleContainer">
        {data.map((person) => {
          return (
            <div className="imageContainer">
              <UserProfileImage
                picSize={UserProfileImageSizes.SMALL}
                userEmail={person.userPrincipalName}
                width={46}
                height={46}
                title={person.displayName}
              />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`${customClass} DWPeopleComponent`}>
      <div className="titleContainer">
        {boxTitle && <h4>{boxTitle}</h4>}
        <div className={"icon"}>
          i
          <div className={"tooltip"}>
           Seus contatos no teams aparecem aqui
          </div>
        </div>
      </div>
      {ret}
    </div>
  );
};
