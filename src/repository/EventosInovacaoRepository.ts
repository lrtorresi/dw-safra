import { IRepository } from "../interfaces/base/IRepository";
import { IEventosInovacao } from "../interfaces/lists/IEventosInovacao";
import Lists from "../common/Lists";
import Libraries from "../common/Libraries";
import { PagedItemCollection } from "impar-digital-workplace-core-library";

export class EventosInovacaoRepository implements IRepository<IEventosInovacao> {

  public listUrl = Lists.eventosInovacao;
  
  public getUpdateObject(item: IEventosInovacao) {
    throw new Error("Method not implemented.");
  }
  public mapObject(item: any, includeBaseFields: boolean): IEventosInovacao {
    return this.objectSet(item);
  }
  public getAddObject(item: IEventosInovacao): IEventosInovacao {
    throw new Error("Method not implemented.");
  }
  public mapObjects(items: any[], includeBaseFields: boolean): IEventosInovacao[] {
    return items.map((v, i) => this.objectSet(v)) as IEventosInovacao[];
  }
  public mapPagedObjects(pagedItem: PagedItemCollection<any[]>) {
    throw new Error("Method not implemented.");
  }
  private objectSet(v: any): IEventosInovacao {
    const dataISOEvent = v['EventDate.'].replace("Z", "");
    const dataISOEnd = v['EndDate.'].replace("Z", "");

    return {
      id: v.Id,
      title: v.Title,
      location: v.Location,
      eventDate: v.fAllDayEvent == "Sim" ? new Date(dataISOEvent) : new Date(v['EventDate.']),
      endDate: v.fAllDayEvent == "Sim" ? new Date(dataISOEnd) : new Date(v['EndDate.']),
      description: v.Description,
      category: v.Category,
      resume: v.Resumo,
      allDay: v.fAllDayEvent,
      recurrence: v.fRecurrence,
      recurrenceData: v.RecurrenceData
    } as IEventosInovacao;
  }
}