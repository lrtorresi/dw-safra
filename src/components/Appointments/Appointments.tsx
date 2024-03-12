import { WebPartContext } from "@microsoft/sp-webpart-base";
import { min } from "date-fns/fp";
import {
  handleDateFnsLocale,
  i18n,
  format,
  Icon,
  MessageBar,
  MessageBarType,
  Shimmer,
  ShimmerElementsGroup,
  ShimmerElementType,
  formatDistanceToNow,
  capitalize,
} from "impar-digital-workplace-core-library";
import * as React from "react";
import "./Appointments.scss";

export default ({
  data,
  loading = false,
  boxTitle = "",
  error = "",
  showCallToAction = false,
  customClass = "",
  context = null,
  top = 3,
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
        {i18n("Microsoft365HubTasksEmpty")}
      </MessageBar>
    );
  } else {
    
    let filteredData = data.filter((item) => {
      if(isNaN(item.dueDateTime) || (item.end && isNaN(item.end.dateTime))){
        return item;
      }
    });
    //function to sort the timestamp from the task and calendar object
    filteredData.sort(function (a, b) {
     
      let firstDate = a.dueDateTime || a.end.dateTime;
      let secondDate = b.dueDateTime || b.end.dateTime;

      firstDate = format(new Date(firstDate), "yyyy/M/dd hh:mm", {
        locale: handleDateFnsLocale(),
      });

      secondDate = format(new Date(secondDate), "yyyy/M/dd hh:mm", {
        locale: handleDateFnsLocale(),
      });

      let dateArray = [];
      dateArray.push(new Date(firstDate));
      dateArray.push(new Date(secondDate));

      let earliestArray = format(min(dateArray), "yyyy/M/dd hh:mm");
      if (earliestArray === firstDate) {
        return -1;
      } else {
        return 1;
      }
    });

    ret = (
      <>
        {filteredData
          .slice(0, top)
          .map(
            ({
              id,
              title,
              dueDateTime,
              createdDateTime,
              location,
              start,
              end,
              subject,
              webLink,
            }) => {
              //Logica do planner
              const taskUrl = id
                ? `https://tasks.office.com/${
                    context.pageContext.user.email.split("@")[1]
                  }/Home/Task/${id}`
                : "#";
              const taskDueDate = dueDateTime
                ? format(new Date(dueDateTime), "dd/MM/yyyy", {
                    locale: handleDateFnsLocale(),
                  })
                : "";
              const taskCreatedDate = createdDateTime
                ? format(new Date(createdDateTime), "dd/MM/yyyy", {
                    locale: handleDateFnsLocale(),
                    useAdditionalWeekYearTokens: false,
                    useAdditionalDayOfYearTokens: false,
                  })
                : "";

              //   logica do calendar
              const eventStartTime = start ? new Date(start.dateTime) : null;
              const eventEndTime = end ? new Date(end.dateTime) : null;
              const fromDateString = eventStartTime
                ? formatDistanceToNow(eventStartTime, {
                    locale: handleDateFnsLocale(),
                    addSuffix: true,
                  })
                : "";
              const eventStartTimeString = eventStartTime
                ? format(eventStartTime, "p", { locale: handleDateFnsLocale() })
                : "";
              const eventEndTimeString = eventEndTime
                ? format(eventEndTime, "p", { locale: handleDateFnsLocale() })
                : "";
              const isFullDay =
                eventStartTimeString === "00:00" &&
                eventEndTimeString === "00:00";
              const fullTimeString = isFullDay
                ? i18n("Microsoft365HubCalendarAllDay")
                : `${i18n(
                    "Microsoft365HubCalendarFrom"
                  )}${eventStartTimeString}${i18n(
                    "Microsoft365HubCalendarTo"
                  )}${eventEndTimeString}`;

              return (
                <a
                  className="taskItem"
                  href={subject ? webLink : taskUrl}
                  target="_blank"
                  data-interception="off"
                  style={loading ? { pointerEvents: "none" } : {}}
                >
                  <Shimmer
                    customElementsGroup={renderShimmer}
                    isDataLoaded={!loading}
                    width="100%"
                  >
                    <div className="container">
                      <div>
                        <img
                          src={
                            subject
                              ? require("./../../imgs/outlook.png")
                              : require("./../../imgs/microsoft-planner.png")
                          }
                        />
                        <span>
                          {taskDueDate ? (
                            <h6>{` Criado ${taskCreatedDate} Entrega ${taskDueDate}`}</h6>
                          ) : (
                            <h6>{`${capitalize(
                              fromDateString
                            )} - ${fullTimeString}`}</h6>
                          )}
                          <h5>{title ? title : subject}</h5>
                        </span>
                      </div>
                    </div>
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
      className={`${customClass} DWAppointmentComponent ${
        showCallToAction ? "withCTA" : ""
      }`}
    >
      <div className="titleContainer">
        {boxTitle && <h4>{boxTitle}</h4>}
        <div className={"icon"}>
          i<div className={"tooltip"}>Seus compromissos aparecem aqui</div>
        </div>
      </div>
      {ret}
    </div>
  );
};

const renderShimmer: JSX.Element = (
  <div style={{ display: "flex", alignItems: "center" }}>
    <ShimmerElementsGroup
      shimmerElements={[
        { type: ShimmerElementType.line, width: 20, height: 20 },
        { type: ShimmerElementType.gap, width: 10, height: 40 },
      ]}
    />
    <ShimmerElementsGroup
      flexWrap
      width="100%"
      shimmerElements={[
        { type: ShimmerElementType.line, width: "100%", height: 13 },
        { type: ShimmerElementType.gap, width: "100%", height: 10 },
        { type: ShimmerElementType.line, width: "80%", height: 13 },
        { type: ShimmerElementType.gap, width: "20%", height: 13 },
      ]}
    />
  </div>
);
