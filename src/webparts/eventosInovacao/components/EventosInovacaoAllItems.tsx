import * as React from 'react';
import { useState, useEffect } from "react";
import { IEventosInovacao } from '../../../interfaces/lists/IEventosInovacao';
import { StylingExtensionBusiness } from '../../../business/StylingExtension';
import { MessageBar, 
    MessageBarType, 
    HandleError, 
    handleDateFnsLocale, 
    format, 
    addMonths, 
    Spinner, 
    SpinnerSize,
    getMonth,
    getYear,
    i18n  } from "impar-digital-workplace-core-library";
import { IEventosInovacaoProps } from './IEventosInovacaoProps';
import { ExpandEvents } from '../../../helpers/EventHelper';
import EventosInovacaoItem from './EventosInovacaoItem';

export interface IEventosInovacaoAllItemsProps {
    props: IEventosInovacaoProps;
    calendar: any;
}

export default (props: IEventosInovacaoAllItemsProps) => {
    const bllhome = new StylingExtensionBusiness(props.props);

    const [calendarByMonth, setCalendarByMonth] = useState<IEventosInovacao[]>([]);
    const [calendarItemSelected, setCalendarItemSelected] = useState<IEventosInovacao>(null);
    const [selectedMounth, setSelectedMounth] = useState<Date>(new Date());

    const [error, setError] = useState<string>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const loadCalendarByMonth = async () => {
        try {
            const corporateCalendarByMonth: IEventosInovacao[] = await bllhome.getEventosInovacaoByMonth(selectedMounth, props.props.hasSegmentation);

            setError(null);
            var allEvents = GetAllEvents(corporateCalendarByMonth);
            allEvents = OrderByEventDate(allEvents);
            setCalendarByMonth(allEvents);
            setCalendarItemSelected(null);
            setLoading(false);

        } catch (error) {
            setLoading(false);
            setError(HandleError(error));
        }
    };

    function GetAllEvents(corporateCalendarByMonth: IEventosInovacao[]) {
        var allEvents = [];
        var regularEvents = corporateCalendarByMonth.filter(x => x.recurrenceData == "");
        var recursiveEvents = corporateCalendarByMonth.filter(x => x.recurrenceData != "");
        var expandedRecursiveEvents = ExpandEvents(recursiveEvents);
        allEvents.push(...regularEvents);
        allEvents.push(...expandedRecursiveEvents);
        return allEvents;
    }
    const OrderByEventDate = (events: IEventosInovacao[]): IEventosInovacao[] => {
        return events.sort((a: IEventosInovacao, b: IEventosInovacao) => {
            return a.eventDate > b.eventDate ? 1 : -1;
        });
    };

    const showSelectedItem = (item?: IEventosInovacao) => {
        setCalendarItemSelected(item ? item : null);
    };

    const prevNextMonth = (amount: number) => {
        setLoading(true);
        setError(null);
        setSelectedMounth(addMonths(selectedMounth, amount));
    };

    useEffect(() => {
        loadCalendarByMonth();
    }, []);

    useEffect(() => {        
        loadCalendarByMonth();
    }, [selectedMounth]);

    return (
        <>
            {
                !calendarItemSelected &&
                    <div className="navigation">
                        <div className="prev" onClick={() => prevNextMonth(-1)}>
                            <span className="DWIconSetaEsquerda"></span>
                        </div>
                        <h3> {format(selectedMounth, "MMMM yyyy", { locale: handleDateFnsLocale() })} </h3>
                        <div className="next" onClick={() => prevNextMonth(1)}>
                            <span className="DWIconSetaDireita"></span>
                        </div>
                    </div>
            }
            {
                loading &&
                    <Spinner size={SpinnerSize.large} />
            }
            {
                !loading && error &&
                    <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>
            }
            {
                !loading &&
                <>
                    {
                        (!calendarByMonth || calendarByMonth.length == 0) &&
                        <MessageBar>{i18n("CalendarioCorporativoEmptyMonth")}</MessageBar>
                    }
                    {
                        !calendarItemSelected && calendarByMonth && calendarByMonth.length > 0 &&
                            <div className={"DWContainer"}>
                                {
                                    calendarByMonth.map((item: IEventosInovacao) => {
                                        const itemMonth = getMonth(new Date(item.eventDate));
                                        const selectedMonth = getMonth(new Date(selectedMounth));
                                        const itemYear = getYear(new Date(item.eventDate));
                                        const selectedYear = getYear(new Date(selectedMounth));

                                        if ((itemMonth === selectedMonth) && (itemYear === selectedYear))
                                        return(<EventosInovacaoItem item={item} isPanel={false} handlePanel={showSelectedItem}></EventosInovacaoItem>);

                                    })
                                }
                            </div>
                    }
                    {
                        calendarItemSelected &&
                            <EventosInovacaoItem item={calendarItemSelected} isPanel={true} handlePanel={showSelectedItem} seeAllButtonText={props.props.returnButtonText}></EventosInovacaoItem>
                    }
                </>
            }
        </>
    );
};