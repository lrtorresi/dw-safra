import { IListItem } from "../base/IListItem";

export enum eventosInovacaoInternalNames {
    location = "Location",
    eventDate = "EventDate",
    description = "Description",
    category = "Category",
    endDate = "EndDate",
    allDay = "fAllDayEvent",
    recurrence = "fRecurrence",
    recurrenceData = ""
}

export interface IEventosInovacao extends IListItem {
    location: string;
    eventDate: Date;
    endDate: Date;
    description: string;
    category: string;
    resume: string;
    allDay: string;
    recurrence: string;
    recurrenceData: any;
}
