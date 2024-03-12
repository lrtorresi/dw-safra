import { IListItem } from "../base/IListItem";

export enum corporateCalendarInternalNames {
    location = "Location",
    eventDate = "EventDate",
    description = "Description",
    category = "Category",
    endDate = "EndDate",
    allDay = "fAllDayEvent",
    recurrence = "fRecurrence",
    recurrenceData = ""
}

export interface ICorporateCalendar extends IListItem {
    location: string;
    eventDate: Date;
    endDate: Date;
    description: string;
    category: string;
    allDay: string;
    recurrence: string;
    recurrenceData: any;
}
