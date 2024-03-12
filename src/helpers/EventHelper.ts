import { IEventosInovacao } from '../interfaces/lists/IEventosInovacao';
import { addDays, addMonths } from 'impar-digital-workplace-core-library';
import { xml2js } from 'xml-js';

export const ExpandEvents = (events: IEventosInovacao[]) => {
    let toReturnEvents: IEventosInovacao[] = [];
    
    events.forEach(e => {

      if (e.recurrenceData != "") {
        var xmlString = e.recurrenceData.split('&lt;').join('<').split('&gt;').join('>').split('&quot;').join('"');
        var xml: any = xml2js(xmlString, { compact: true });

        if (xml.recurrence.rule.repeat.daily) { // recorrencia diaria
          var dayFrequency = parseInt(xml.recurrence.rule.repeat.daily._attributes.dayFrequency);
          var startDate = new Date(e.eventDate);
          var endDate = new Date(e.endDate);
          var qtt = 999;

          var d = new Date();
          for (var i = 0; i < qtt; i += dayFrequency) {

            toReturnEvents.push({
              allDay: e.allDay,
              category: e.category,
              description: e.description,
              resume: e.resume,
              endDate: addDays(endDate, i),
              eventDate: addDays(startDate, i),
              location: e.location,
              recurrence: e.recurrence,
              recurrenceData: e.recurrenceData,
              author: e.author,
              changed: e.changed,
              created: e.created,
              deleted: e.deleted,
              editor: e.editor,
              id: e.id,
              modified: e.modified,
              title: e.title
            });
          }
        }

        if (xml.recurrence.rule.repeat.monthly) { // recorrencia mensal
          var monthFrequency = parseInt(xml.recurrence.rule.repeat.monthly._attributes.monthFrequency);
          var day = parseInt(xml.recurrence.rule.repeat.monthly._attributes.day);
          var startDate = new Date(e.eventDate);
          var endDate = new Date(e.endDate);
          var qtt = 840;

          for (var i = 0; i < qtt; i += monthFrequency) {
              toReturnEvents.push({
                allDay: e.allDay,
                category: e.category,
                description: e.description,
                resume: e.resume,
                endDate: addMonths(endDate, i),
                eventDate: addMonths(startDate, i),
                location: e.location,
                recurrence: e.recurrence,
                recurrenceData: e.recurrenceData,
                author: e.author,
                changed: e.changed,
                created: e.created,
                deleted: e.deleted,
                editor: e.editor,
                id: e.id,
                modified: e.modified,
                title: e.title
              });
          }
        }

        if (xml.recurrence.rule.repeat.yearly) { // recorrencia anual
          var day = parseInt(xml.recurrence.rule.repeat.yearly._attributes.day);
          var month = parseInt(xml.recurrence.rule.repeat.yearly._attributes.month);
          var frequency = parseInt(xml.recurrence.rule.repeat.yearly._attributes.yearFrequency);

          var startDateYear = new Date(e.eventDate).getFullYear();
          var endDateYear = new Date(e.endDate).getFullYear();

          var startDateHour = new Date(e.eventDate).getHours();
          var startDateMinute = new Date(e.eventDate).getMinutes();
          var startDateSeconds = new Date(e.eventDate).getSeconds();

          var endDateHour = new Date(e.endDate).getHours();
          var endDateMinute = new Date(e.endDate).getMinutes();
          var endDateSeconds = new Date(e.endDate).getSeconds();

          var qtt = 70;

          for (var i = 0; i < qtt; i += frequency) {
            if (new Date(startDateYear + i, month - 1, day , startDateHour, startDateMinute, startDateSeconds) > new Date())
              toReturnEvents.push({
                allDay: e.allDay,
                category: e.category,
                description: e.description,
                resume: e.resume,
                endDate: new Date(endDateYear + i, month - 1, day , endDateHour, endDateMinute, endDateSeconds),
                eventDate: new Date(startDateYear + i, month - 1, day , startDateHour, startDateMinute, startDateSeconds),
                location: e.location,
                recurrence: e.recurrence,
                recurrenceData: e.recurrenceData,
                author: e.author,
                changed: e.changed,
                created: e.created,
                deleted: e.deleted,
                editor: e.editor,
                id: e.id,
                modified: e.modified,
                title: e.title
              });
          }
        }
      }
    });

    return toReturnEvents;
  };