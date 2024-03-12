import { IRepository } from "../interfaces/base/IRepository";
import { ITools } from "../interfaces/lists/ITools";
import Lists from "../common/Lists";

export class ToolsRepository implements IRepository<ITools> {
  public listUrl = Lists.tools;

  public getUpdateObject(item: ITools): any {
    throw new Error("Method not implemented.");
  }

  public mapObject(item: any, includeBaseFields: boolean): ITools {
    return this.objectSet(item);
  }

  public getAddObject(item: ITools): any {
    throw new Error("Method not implemented.");
  }

  public mapObjects(items: any[], includeBaseFields: boolean): ITools[] {
    return items.map((v, i) => this.objectSet(v)) as ITools[];
  }

  private objectSet(v: any): ITools {

    return {
      id: v.ID,
      Titulo: v.Title,
      Link: v.Link,
      AttachmentFiles: v.AttachmentFiles,
      created: new Date(v.Created),
    } as ITools;
  }
}
