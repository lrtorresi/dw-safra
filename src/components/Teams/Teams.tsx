import * as React from "react";
import {
  Icon,
  MessageBar,
  MessageBarType,
  Shimmer,
  ShimmerElementsGroup,
  ShimmerElementType,
  i18n,
} from "impar-digital-workplace-core-library";
import "./Teams.scss";

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
        {i18n("Microsoft365HubTeamsEmpty")}
      </MessageBar>
    );
  } else {
    ret = (
      <div className="teamsContainer">
        {data.map(({ imageBody, webUrl, displayName }) => {
          return (
            <a
              className="teamItem"
              href={webUrl}
              target="_blank"
              data-interception="off"
              style={loading ? { pointerEvents: "none" } : {}}
            >
              <Shimmer
                customElementsGroup={renderShimmer}
                isDataLoaded={!loading}
                width="100%"
              >
                {imageBody && (
                  <img
                    src={`data:image/png;base64, ${imageBody}`}
                    title={displayName}
                  />
                )}
              </Shimmer>
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={`${customClass} DWTeamsComponent ${
        showCallToAction ? "withCTA" : ""
      }`}
    >
      {boxTitle && <h4>{boxTitle}</h4>}
      {ret}
      {showCallToAction && (
        <a
        className="teamsLink"
          href="https://teams.microsoft.com"
          data-interception="off"
          target="_blank"
        >
          <button >acessar teams</button>
        </a>
      )}
    </div>
  );
};

const renderShimmer: JSX.Element = (
  <div style={{ display: "flex", alignItems: "center" }}>
    <ShimmerElementsGroup
      width="100%"
      shimmerElements={[
        { type: ShimmerElementType.circle, width: 40, height: 40 },
      ]}
    />
  </div>
);
