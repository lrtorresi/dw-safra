import * as React from 'react';
import { useState, useEffect } from "react";
import { IEventosInovacao } from '../../../interfaces/lists/IEventosInovacao';
import './EventosInovacao.scss';
import { IEventosInovacaoProps } from './IEventosInovacaoProps';
import { PanelType, Panel, Icon, MessageBar, MessageBarType, HandleError, CustomError, i18n, Spinner, SpinnerSize, getYear } from "impar-digital-workplace-core-library";
import { StylingExtensionBusiness } from '../../../business/StylingExtension';
import EventosInovacaoItem from './EventosInovacaoItem';
import EventosInovacaoAllItems from './EventosInovacaoAllItems';
import { ExpandEvents } from '../../../helpers/EventHelper';

export default (props: IEventosInovacaoProps) => {
  const bllhome = new StylingExtensionBusiness(props);

  const [calendar, setCalendar] = useState<IEventosInovacao[]>([]);
  const [calendarItemSelected, setCalendarItemSelected] = useState<IEventosInovacao>(null);
  const [error, setError] = useState<string>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showPanel, setShowPanel] = useState<boolean>(false);

  const loadCalendar = async () => {
    try {
      const corporateCalendar: IEventosInovacao[] = await bllhome.getCorporateCalendar(2000, props.hasSegmentation);

      setError(null);
      var allEvents = GetAllEvents(corporateCalendar);
      allEvents = OrderByEventDate(allEvents);
      // setCalendar(allEvents.splice(0, props.top));
      setCalendar(corporateCalendar);
      setCalendarItemSelected(null);
      setLoading(false);

    } catch (error) {
        setLoading(false);
        setError(HandleError(error));
    }
  };

  function GetAllEvents(corporateCalendar: IEventosInovacao[]) {
    var allEvents = [];
    var regularEvents = corporateCalendar.filter(x => x.recurrenceData == "");
    var recursiveEvents = corporateCalendar.filter(x => x.recurrenceData != "");
    var expandedRecursiveEvents = ExpandEvents(recursiveEvents);
    allEvents.push(...regularEvents);
    allEvents.push(...expandedRecursiveEvents);
    return allEvents;
  }

  const handlePanel = (item?: IEventosInovacao, seeAll?: boolean) => {
    setCalendarItemSelected(item ? item : null);
    setShowPanel(seeAll ? seeAll : !showPanel);
  };

  useEffect(() => {
    loadCalendar();
  }, []);

  const OrderByEventDate = (events: IEventosInovacao[]): IEventosInovacao[] => {
    return events.sort((a: IEventosInovacao, b: IEventosInovacao) => {
      return a.eventDate > b.eventDate ? 1 : -1;
    });
  };

  let ret:JSX.Element;

  if (error) {
      ret = <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>;
  } else if (loading) {
      ret = <Spinner size={SpinnerSize.large}/>;
  } else if (calendar.length == 0) {
      ret = <MessageBar>{i18n("CalendarioCorporativoEmpty")}</MessageBar>;
  } else {
      ret = (
          <div className={"DWContainer"}>
            {calendar.map((item: IEventosInovacao) =>{
                const itemYear = getYear(new Date(item.eventDate));
                const todayYear = new Date().getFullYear();
                if(itemYear === todayYear || itemYear > todayYear)
                return(
                  <EventosInovacaoItem item={item} isPanel={false} handlePanel={handlePanel}></EventosInovacaoItem>
                );
              }
            )}
          </div>
      );
  }

  return (
    <>
      <div className={"DWWrapper DWCustom DWEventosInovacao"}> 
        {
            props.webpartTitle && 
            <h3>{props.webpartTitle}</h3>
        }

        {ret}

        <div className="buttonContainer">
          <a onClick={(e) => {
            e.preventDefault();
            handlePanel(null);
          }} href="#" className="linkButton">
            <span className="DWIconAdicionar"></span>
            <h5>{props.seeAllButtonText}</h5>
          </a>
        </div>
      </div>

      <Panel isOpen={showPanel} onDismiss={() => handlePanel()} isLightDismiss={true} type={PanelType.medium}>
          <div className={"DWWrapper DWCustom DWEventosInovacaoPanel"}>
            {
                calendarItemSelected &&
                  <EventosInovacaoItem item={calendarItemSelected} isPanel={true} handlePanel={handlePanel} seeAllButtonText={props.returnButtonText}></EventosInovacaoItem>
            }
            {
              !calendarItemSelected &&
                <EventosInovacaoAllItems props={props} calendar={calendar}></EventosInovacaoAllItems>
            }
        </div>
      </Panel>
    </>
  );
};
