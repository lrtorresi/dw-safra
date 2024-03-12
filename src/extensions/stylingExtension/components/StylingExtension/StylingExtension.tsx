import * as React from "react";
import "./BarraDeProdutividade.scss";
import './scss/StylingExtension.scss';
import { useState, useEffect } from "react";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import TagManager from "react-gtm-module";
import { StylingExtensionBusiness } from "../../../../business/StylingExtension";
import { getExtensionComponentArray, getHubUrl, HandleError, Icon, validateAdmin, Web } from "impar-digital-workplace-core-library";
import { BlipChat } from "blip-chat-widget";

import Teams from "../../../../components/Teams/Teams";
import Emails from "../../../../components/Emails/Emails";
import Files from "../../../../components/Files/Files";
import Calendar from "../../../../components/Calendar/Calendar";
import Announcements from "../../../../components/Announcements/Announcements";
import { FavoriteBusiness } from "../../../../business/FavoriteBusiness";
import ExtensionFavorites from "../../../../components/ExtensionFavorites/ExtensionFavorites";
import People from "../../../../components/People/People";

import UserBubble from "../../../../components/UserBubble/UserBubble";
import UserProfile from "../../../../components/UserProfile/UserProfile";
import Tools from "../../../../components/Tools/Tools";
import Favorites from "../../../../components/Favorites/Favorites";
import { favoriteModes } from "../../../../interfaces/lists/IFavorite";
import Appointments from "../../../../components/Appointments/Appointments";
import { GraphBusiness } from "../../../../business/GraphBusiness";
import { HomeBusiness } from "../../../../business/HomeBusiness";


export interface IStylingExtensionProps {
  context: ApplicationCustomizerContext;
}

export default function StylingExtension(props: IStylingExtensionProps) {
  const bllBar = new StylingExtensionBusiness(props);




  const bllGraph = new GraphBusiness(props);
  let bllHome;
  let bllFavorites;
  const [newBar] = useState<boolean>(true);

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hubSiteUrl, setHubSiteUrl] = useState("");

  const [componentOrder, setComponentOrder] = useState({});
  const [tasks, setTasks] = useState([]);
  const [emails, setEmails] = useState([]);
  const [teams, setTeams] = useState([]);
  const [calendar, setCalendar] = useState([]);
  const [files, setFiles] = useState([]);
  const [people, setPeople] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [tools, setTools] = useState([]);
  const [toolsError, setToolsError] = useState("");
  const bllhome = new HomeBusiness(props);
  bllFavorites = new FavoriteBusiness(props);
  const [tasksError, setTasksError] = useState("");
  const [emailsError, setEmailsError] = useState("");
  const [teamsError, setTeamsError] = useState("");
  const [calendarError, setCalendarError] = useState("");
  const [filesError, setFilesError] = useState("");
  const [peopleError, setPeopleError] = useState("");
  const [announcementsError, setAnnouncementsError] = useState("");
  const [favoritesError, setFavoritesError] = useState("");
  const [appointments, setAppointments] = useState([]);

  let [width, setWidth] = useState(window.innerWidth);

  const breakpoint = 1024;

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  useEffect(() => {

    if (hubSiteUrl) {
      if (window.location.href == `${hubSiteUrl}` && width > breakpoint) 
      {
        window.location.href = `${hubSiteUrl}/SitePages/HomeMobile.aspx`;
      } 
      else if (window.location.href == `${hubSiteUrl}/SitePages/HomeMobile.aspx` && width > breakpoint) { 
        window.location.href = `${hubSiteUrl}`
      }
    }

  }, [hubSiteUrl, width]);

  const listenerFunction = (e) => {
    const ignoreClickOnMeElement =
      document.getElementById("BarraProdutividade2");

    const ignoreClickOnMeElementCallout = document.getElementById("CalloutBarra")


    const isClickInsideElement =
      ignoreClickOnMeElement && ignoreClickOnMeElement.contains(e.target);

    const isClickInsideElementCallout =
      ignoreClickOnMeElementCallout && ignoreClickOnMeElementCallout.contains(e.target);
    if (!isClickInsideElement && !isClickInsideElementCallout) {
      setIsPanelOpen(false);
    }
  };


  const announcementsComponent = (
    <Announcements
      data={announcements ? announcements : new Array(1).fill({})}
      error={announcementsError}
      customClass="BarraProdutividadeChildComponent"
      typeOfBar={newBar}
    />
  );

  const extensionFavoritesComponent = (
    <ExtensionFavorites
      data={favorites ? favorites : new Array(5).fill({})}
      error={favoritesError}
      customClass="BarraProdutividadeChildComponent"
      context={props}
      boxTitle={
        componentOrder["ExtensionFavorites"]
          ? componentOrder["ExtensionFavorites"].title
          : false
      }
    />
  );

  const peopleComponent = (
    <People
      data={people ? people : new Array(5).fill({})}
      error={peopleError}
      customClass="BarraProdutividadeChildComponent"
      boxTitle={
        componentOrder["People"] ? componentOrder["People"].title : false
      }
    />
  );

  const favoriteComponent = (
    <Favorites
      props={props}
      title={
        componentOrder["Services"] ? componentOrder["Services"].title : false
      }
      mode={favoriteModes.Home}
    />
  );

  const teamsComponent = (
    <Teams
      data={teams ? teams : new Array(5).fill({})}
      customClass="BarraProdutividadeChildComponent"
      boxTitle={componentOrder["Teams"] ? componentOrder["Teams"].title : false}
      loading={teams.length === 0}
      error={teamsError}
      showCallToAction={
        componentOrder["Teams"] ? componentOrder["Teams"].showCTA : false
      }
    />
  );

  const calendarComponent = (
    <Calendar
      data={calendar ? calendar : new Array(5).fill({})}
      customClass="BarraProdutividadeChildComponent"
      boxTitle={
        componentOrder["Calendar"] ? componentOrder["Calendar"].title : false
      }
      loading={calendar.length === 0}
      error={calendarError}
      showCallToAction={
        componentOrder["Calendar"] ? componentOrder["Calendar"].showCTA : false
      }
    />
  );

  const emailsComponent = (
    <Emails
      data={emails ? emails : new Array(5).fill({})}
      customClass="BarraProdutividadeChildComponent"
      boxTitle={
        componentOrder["Emails"] ? componentOrder["Emails"].title : false
      }
      loading={emails.length === 0}
      error={emailsError}
      showCallToAction={
        componentOrder["Emails"] ? componentOrder["Emails"].showCTA : false
      }
    />
  );

  const tasksComponent = (
    <Appointments
      data={tasks ? tasks.concat(calendar) : new Array(5).fill({})}
      customClass="BarraProdutividadeChildComponent"
      boxTitle={componentOrder["Tasks"] ? componentOrder["Tasks"].title : false}
      context={props.context}
      top={componentOrder["Tasks"] ? componentOrder["Tasks"].top : 3}
      loading={tasks.length === 0}
      error={tasksError}
      showCallToAction={
        componentOrder["Tasks"] ? componentOrder["Tasks"].showCTA : false
      }
    />
  );
  const toolsComponent = (
    <Tools
      boxTitle={componentOrder["Tools"] ? componentOrder["Tools"].title : false}
      data={tools ? tools : new Array(5).fill({})}
    />
  );

  const filesComponent = (
    <Files
      data={files ? files : new Array(5).fill({})}
      customClass="BarraProdutividadeChildComponent"
      boxTitle={componentOrder["Files"] ? componentOrder["Files"].title : false}
      loading={files ? files.length === 0 : false}
      error={filesError}
      showCallToAction={
        componentOrder["Files"] ? componentOrder["Files"].showCTA : false
      }
    />
  );

  const components = {
    Announcements: componentOrder["Announcements"] ? (
      announcementsComponent
    ) : (
      <></>
    ),
    Tasks: componentOrder["Tasks"] ? tasksComponent : <></>,
    Emails: componentOrder["Emails"] ? emailsComponent : <></>,
    Services: componentOrder["Services"] ? favoriteComponent : <></>,
    Teams: componentOrder["Teams"] ? teamsComponent : <></>,
    Files: componentOrder["Files"] ? filesComponent : <></>,
    Calendar: componentOrder["Calendar"] ? calendarComponent : <></>,
    People: componentOrder["People"] ? peopleComponent : <></>,
    Tools: componentOrder["Tools"] ? toolsComponent : <></>,
    ExtensionFavorites: componentOrder["ExtensionFavorites"] ? (
      extensionFavoritesComponent
    ) : (
      <></>
    ),
  };

  const componentsNewBar = {
    Announcements: componentOrder["Announcements"] ? (
      announcementsComponent
    ) : (
      <></>
    ),
    Tasks: componentOrder["Tasks"] ? tasksComponent : <></>,
    Emails: componentOrder["Emails"] ? emailsComponent : <></>,
    People: componentOrder["People"] ? peopleComponent : <></>,
    Teams: componentOrder["Teams"] ? teamsComponent : <></>,
    Files: componentOrder["Files"] ? filesComponent : <></>,
    Tools: componentOrder["Tools"] ? toolsComponent : <></>,
    ExtensionFavorites: componentOrder["ExtensionFavorites"] ? (
      extensionFavoritesComponent
    ) : (
      <></>
    ),
  };

  useEffect(() => {
    loadComponents();
  }, [componentOrder]);

  useEffect(() => {
    init();
    document.addEventListener("click", listenerFunction);
    return () => document.removeEventListener("click", listenerFunction);
  }, []);

  const loadComponents = async () => {
    if (!bllFavorites || !bllHome) {
      const hubUrl = await getHubUrl(props.context);
      setHubSiteUrl(hubUrl);
      bllFavorites = new FavoriteBusiness(props, hubSiteUrl);
      bllHome = new HomeBusiness(props, hubSiteUrl);
    }

    if (componentOrder["ExtensionFavorites"]) {
      bllFavorites
        .getFavoriteFromCurrentUser()
        .then((res) => {
          setFavorites(bllFavorites.getParsedJsonFavorites(res));
        })
        .catch((err) => setFavoritesError(HandleError(err)));
    }

    if (componentOrder["Announcements"]) {
      bllHome
        .getAnnouncements(true, false)
        .then((res) => {
          setAnnouncements(res)
        })
        .catch((err) => setAnnouncementsError(HandleError(err)));
    }

    if (componentOrder["People"]) {
      bllGraph
        .getPeople(
          componentOrder["People"].top ? componentOrder["People"].top : 10,
          true
        )
        .then((res) => setPeople(res.value))
        .catch((err) => setPeopleError(HandleError(err)));
    }

    if (componentOrder["Files"]) {
      bllGraph
        .getFiles(
          componentOrder["Files"].top ? componentOrder["Files"].top : 3,
          true
        )
        .then((res) => setFiles(res.value))
        .catch((err) => setFilesError(HandleError(err)));
    }

    if (componentOrder["Tools"]) {
      bllhome
        .getTools()
        .then((res) => setTools(res))
        .catch((err) => setToolsError(HandleError(err)));
    }
    if (componentOrder["Services"]) {
      bllhome
        .getTools()
        .then((res) => setTools(res))
        .catch((err) => setToolsError(HandleError(err)));
    }

    if (componentOrder["Teams"]) {
      bllGraph
        .getTeams(componentOrder["Teams"].top ? componentOrder["Teams"].top : 3)
        .then((res) => setTeams(res.value))
        .catch((err) => setTeamsError(HandleError(err)));
    }

    if (componentOrder["Tasks"]) {
      bllGraph
        .getTasksFromPlanner(
          componentOrder["Tasks"].top ? componentOrder["Tasks"].top : 3
        )
        .then((res) => {
          setTasks(res.value);
          setAppointments([...appointments, res.value]);
        })
        .catch((err) => setTasksError(HandleError(err)));

      bllGraph
        .getCalendar(
          componentOrder["Calendar"].top ? componentOrder["Calendar"].top : 3
        )
        .then((res) => {
          setCalendar(res.value);
          setAppointments([...appointments, res.value]);
        })
        .catch((err) => setCalendarError(HandleError(err)));
    }

    if (componentOrder["Emails"]) {
      bllGraph
        .getUnreadEmailsFromOutlook(
          componentOrder["Emails"].top ? componentOrder["Emails"].top : 3
        )
        .then((res) => setEmails(res.value))
        .catch((err) => setEmailsError(HandleError(err)));
    }

    if (componentOrder["Calendar"]) {
      bllGraph
        .getCalendar(
          componentOrder["Calendar"].top ? componentOrder["Calendar"].top : 3
        )
        .then((res) => setCalendar(res.value))
        .catch((err) => setCalendarError(HandleError(err)));
    }

    const interval = setInterval(() => {
      if (componentOrder["Tasks"]) {
        bllGraph
          .getTasksFromPlanner(
            componentOrder["Tasks"].top ? componentOrder["Tasks"].top : 3
          )
          .then((res) => setTasks(res.value))
          .catch((err) => setTasksError(HandleError(err)));
      }

      if (componentOrder["Emails"]) {
        bllGraph
          .getUnreadEmailsFromOutlook(
            componentOrder["Emails"].top ? componentOrder["Emails"].top : 3
          )
          .then((res) => setEmails(res.value))
          .catch((err) => setEmailsError(HandleError(err)));
      }

      if (componentOrder["Calendar"]) {
        bllGraph
          .getCalendar(
            componentOrder["Calendar"].top ? componentOrder["Calendar"].top : 3
          )
          .then((res) => setCalendar(res.value))
          .catch((err) => setCalendarError(HandleError(err)));
      }
    }, 30000);

    return () => clearInterval(interval);
  };

  const init = async () => {
    try {
      const storedComponentOrder = await getExtensionComponentArray(
        props.context
      );
      setComponentOrder(storedComponentOrder);

      const adminValid = await validateAdmin(props.context);
      setIsAdmin(adminValid == true);
    } catch (error) {
      HandleError(error);
    }
  };






  const loadInfo = async () => {
    const infos = await bllBar.getCurrentUserUserProfile();
    return infos;
  };

  useEffect(() => {

    loadInfo().then((result) => {

      let item = {};

      result['UserProfileProperties'].forEach((prop) => {
        item[prop.Key] = prop.Value;
      });

      let userId = item['UserProfile_GUID'] ? item['UserProfile_GUID'] : 'vazio';
      let department = item['Department'] ? item['Department'] : 'vazio';

      const tagManagerArgsClient = {
        gtmId: 'GTM-T57PHWS',
        dataLayer: {
          userId: userId,
          userDepartment: department,
        }
      };

      // const tagManagerArgsImpar = {
      //   gtmId: 'GTM-NR5XCRQ',
      //   dataLayer: {
      //     userId: userId,
      //     userDepartment: department,
      //   }
      // };

      TagManager.initialize(tagManagerArgsClient);
      // TagManager.initialize(tagManagerArgsImpar);

    });

    setInterval(() => {
      detectScrollPage();
    }, 500)

  }, []);

  //###################################################################################
  //###################################################################################
  //###################################################################################
  //Get SharePoint Scrollable Main DIV
  const [hasPageScroll, setHasPageScroll] = useState<boolean>(false);
  const detectScrollPage = () => {
    let divsElement: HTMLCollectionOf<HTMLDivElement> = document.getElementsByTagName('div');
    let scrollRegionDiv: HTMLDivElement;

    for (let i = 0; i < divsElement.length; i++) {
      const divElement = divsElement[i];
      if (divElement.getAttribute('data-automation-id') === 'contentScrollRegion' && divElement.getAttribute('role') === 'main') {
        scrollRegionDiv = divElement;
        break;
      }
    }
    //console.log('clientHeight',scrollRegionDiv.clientHeight,"scrollHeight",scrollRegionDiv.scrollHeight);

    setHasPageScroll(scrollRegionDiv.clientHeight < scrollRegionDiv.scrollHeight)
  }
  //###################################################################################
  //###################################################################################
  //###################################################################################

  const getBlipChatList = async () => {
    // const web = Web(props.context.pageContext.site.absoluteUrl);
    const web = Web("https://b0422.sharepoint.com/sites/SouSafra-institucional");
    const items = web.lists.getByTitle("Blip Chat").items();

    compareURL(await items);
  }

  const compareURL = (items) => {
    let newURL: string;
    let appKey: string;
    let colorButton: string;

    items.forEach(item => {
      if (window.location.href === item.URL) {
        newURL = item.URL;
        appKey = item.AppKey;
        colorButton = item.Color;
      }
    });

    const blipChat = new BlipChat()
      .withAppKey(appKey)
      .withButton({ color: colorButton, icon: "" })
      .withCustomCommonUrl("https://safra.chat.blip.ai/")
      .withAccount({
        fullName: props.context.pageContext.user.displayName,
        email: props.context.pageContext.user.email != '' ? props.context.pageContext.user.email : props.context.pageContext.user.loginName,
      });

    if (newURL === window.location.href) {
      blipChat.build();
    } else {
      const element = document.querySelector("#blip-chat-container");
      element.parentElement.removeChild(element);
    }
  }

  useEffect(() => {
    getBlipChatList();
  }, [window.location.href]);

  if (newBar === true) {
    return (
      <>
        <div
          className={
            `DWWrapper DWCustom DWBarraDeProdutividade DWBarraDeProdutividade2 ${hasPageScroll ? 'pageHasScroll' : ''}`
          }
          id="BarraProdutividade2"
        >
          <div
            className={`DWContainer barraLateral ${isPanelOpen ? "open" : ""}`}
            onClick={() => {
              setIsPanelOpen(!isPanelOpen);
            }}
          >
            <UserBubble props={props} />



            {componentOrder["AdminPage"] && isAdmin && hubSiteUrl && (
              <a
                className="DWItem"
                href={`${hubSiteUrl}/sitepages/Admin.aspx`}
                title="Administração"
              >
                <Icon iconName={"Settings"}></Icon>
              </a>
            )}
          </div>

          <div className={isPanelOpen ? `painel open` : `painel`}>
            <div
              className="closeIcon"
              onClick={() => {
                setIsPanelOpen(false);
              }}
            >
              <span className="DWIconFechar closeIcon"></span>
            </div>

            <UserProfile />


            <div className="newBtn"><a href="https://b0422.sharepoint.com/sites/SouSafra-meu-espaco-de-trabalho" data-interception="off">Espaço de trabalho</a></div>

            {Object.keys(componentOrder).map((k) => {
              return componentsNewBar[k];
            })}


          </div>
        </div>
      </>
    );
  }
}
