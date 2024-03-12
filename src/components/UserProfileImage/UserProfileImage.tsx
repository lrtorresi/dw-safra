import * as React from "react";
import { Image, ImageFit } from "impar-digital-workplace-core-library";

export enum UserProfileImageSizes {
  SMALL = "S",
  MEDIUM = "M",
  LARGE = "L",
}

export default function UserProfileImage({
  userEmail,
  picSize = UserProfileImageSizes.MEDIUM,
  className = "",
  width = 49,
  height = 49,
  linkToDelve = true,
  title = "",
}: {
  userEmail: string;
  picSize: UserProfileImageSizes;
  className?: string;
  width?: number;
  height?: number;
  linkToDelve?: boolean;
  title?: string;
}) {
  const image = (
    <Image
      imageFit={ImageFit.cover}
      styles={{
        root: {
          display: "flex",
          justifyContent: "center",
        },
      }}
      width={width}
      height={height}
      src={`/_vti_bin/DelveApi.ashx/people/profileimage?size=${picSize}&userId=${userEmail}`}
      title={title}
    />
  );

  if (linkToDelve) {
    return (
      <a
        href={`https://${
          window.location.hostname.split(".")[0]
        }-my.sharepoint.com/PersonImmersive.aspx?accountname=i%3A0%23%2Ef%7Cmembership%7C${userEmail}`}
        className={`DWUserProfileImage ${className}`}
        target="_blank"
        title={title}
        style={{
          width,
          height,
          minWidth: width,
          minHeight: height,
        }}
      >
        {image}
      </a>
    );
  } else {
    return (
      <div
        className={`DWUserProfileImage ${className}`}
        style={{
          width,
          height,
          minWidth: width,
          minHeight: height,
        }}
      >
        {image}
      </div>
    );
  }
}
