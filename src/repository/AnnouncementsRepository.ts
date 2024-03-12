import { IRepository } from "../interfaces/base/IRepository";
import { IAnnouncement } from "../interfaces/lists/IAnnouncement";
import Lists from "../common/Lists";

export class AnnouncementsRepository implements IRepository<IAnnouncement> {
  public listUrl = Lists.announcements;

  public getUpdateObject(item: IAnnouncement): any {
    throw new Error("Method not implemented.");
  }

  public mapObject(item: any, includeBaseFields: boolean): IAnnouncement {
    return this.objectSet(item);
  }

  public getAddObject(item: IAnnouncement): any {
    throw new Error("Method not implemented.");
  }

  public mapObjects(items: any[], includeBaseFields: boolean): IAnnouncement[] {
    return items.map((v, i) => this.objectSet(v)) as IAnnouncement[];
  }

  private objectSet(v: any): IAnnouncement {
    return {
      id: v.ID,
      title: v.Title,
      url: v.Url,
      newTab: v.NewTab,
      startDate: v.StartDate,
      endDate: v.EndDate,
      description: v.Description
    } as IAnnouncement;
  }
}