import {
  Icon,
  MessageBar,
  MessageBarType,
  Shimmer,
  ShimmerElementsGroup,
  ShimmerElementType,
  handleDateFnsLocale,
  i18n,
  capitalize,
  format,
  formatDistanceToNow,
} from "impar-digital-workplace-core-library";
import * as React from "react";
import UserProfileImage, {
  UserProfileImageSizes,
} from "../UserProfileImage/UserProfileImage";
import "./Calendar.scss";

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
        {i18n("Microsoft365HubCalendarEmpty")}
      </MessageBar>
    );
  } else {
    ret = (
      <>
        {data.map(
          ({
            organizer,
            location,
            start,
            end,
            subject,
            webLink,
            attendees,
          }) => {
            const startDtt = start ? new Date(start.dateTime) : null;
            const endDtt = end ? new Date(end.dateTime) : null;
            const fromDateString = startDtt
              ? formatDistanceToNow(startDtt, {
                  locale: handleDateFnsLocale(),
                  addSuffix: true,
                })
              : "";
            const fromTimeString = startDtt
              ? format(startDtt, "p", { locale: handleDateFnsLocale() })
              : "";
            const toTimeString = endDtt
              ? format(endDtt, "p", { locale: handleDateFnsLocale() })
              : "";
            const isFullDay =
              fromTimeString === "00:00" && toTimeString === "00:00";
            const fullTimeString = isFullDay
              ? i18n("Microsoft365HubCalendarAllDay")
              : `${i18n("Microsoft365HubCalendarFrom")}${fromTimeString}${i18n(
                  "Microsoft365HubCalendarTo"
                )}${toTimeString}`;
            const crowdedMeeting =
              attendees && attendees.length > 5 ? attendees.length - 5 : null;

            const currentlyActive =
              new Date() > startDtt && new Date() < endDtt;

            return (
              <a
                className={loading ? "calendarItem loading" : "calendarItem"}
                href={webLink}
                target="_blank"
                data-interception="off"
                style={loading ? { pointerEvents: "none" } : {}}
              >
                <Shimmer
                  customElementsGroup={renderShimmer}
                  isDataLoaded={!loading}
                  width="100%"
                >
                  <h6>{`${capitalize(fromDateString)} - ${fullTimeString}`}</h6>
                  <h5>{subject}</h5>
                  <h6>{location && location.displayName}</h6>
                  <div className="thumbnails">
                    {attendees &&
                      attendees.slice(0, 4).map((attendee) => {
                        return (
                          <UserProfileImage
                            className="thumbnailImg"
                            picSize={UserProfileImageSizes.SMALL}
                            userEmail={attendee.emailAddress.address}
                            width={20}
                            height={20}
                            title={attendee.emailAddress.name}
                          />
                        );
                      })}
                    {crowdedMeeting && (
                      <div className="plusLabel">+{crowdedMeeting}</div>
                    )}
                  </div>
                  {currentlyActive && (
                    <div
                      className="ring-container"
                      title={i18n("Microsoft365HubCalendarActiveEvent")}
                    >
                      <div className="ringring"></div>
                      <div className="circle"></div>
                    </div>
                  )}
                </Shimmer>
              </a>
            );
          }
        )}
      </>
    );
  }
  return (
    <div
      className={`${customClass} DWCalendarComponent ${
        showCallToAction ? "withCTA" : ""
      }`}
    >
      {boxTitle && <h4>{boxTitle}</h4>}
      {ret}
      {showCallToAction && (
        <a
          className="callToAction"
          href="https://outlook.office.com/calendar"
          data-interception="off"
          target="_blank"
        >
          <img src={require("./../../imgs/outlook.png")} />
          <h6>{i18n("Microsoft365HubOutlookCalendarCTA")}</h6>
          <span className="DWIconSetaDireita"></span>
        </a>
      )}
    </div>
  );
};

const renderShimmer: JSX.Element = (
  <div style={{ display: "flex" }}>
    <ShimmerElementsGroup
      flexWrap
      width={"100%"}
      shimmerElements={[
        { type: ShimmerElementType.line, width: "80%", height: 10 },
        { type: ShimmerElementType.gap, width: "20%", height: 20 },
        { type: ShimmerElementType.line, width: "60%", height: 10 },
        { type: ShimmerElementType.gap, width: "40%", height: 20 },
        { type: ShimmerElementType.line, width: "70%", height: 10 },
        { type: ShimmerElementType.gap, width: "30%", height: 20 },
        { type: ShimmerElementType.circle, width: "10%" },
        { type: ShimmerElementType.gap, width: "2%" },
        { type: ShimmerElementType.circle, width: "10%" },
        { type: ShimmerElementType.gap, width: "2%" },
        { type: ShimmerElementType.circle, width: "10%" },
        { type: ShimmerElementType.gap, width: "2%" },
        { type: ShimmerElementType.circle, width: "10%" },
        { type: ShimmerElementType.gap, width: "53%" },
      ]}
    />
  </div>
);
