import { IUser } from "../interfaces/base/IUser";

export class SPBaseFieldsMap {

    public static getMap(item: any): any {
        return {
            created: new Date(item.Created),
            modified: new Date(item.Modified),
            author: { id: item.Author.Id, title: item.Author.Title } as IUser,
            editor: { id: item.Editor.Id, title: item.Editor.Title } as IUser
          };
    }

}