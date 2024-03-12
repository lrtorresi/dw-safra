import { WebPartContext } from "@microsoft/sp-webpart-base";
import { addDays, endOfDay, startOfDay, isToday, CustomError, i18n } from "impar-digital-workplace-core-library";
import * as _ from "lodash";
import GraphService from "../services/base/GraphService";
import SessionStorageSupport from "./SessionStorageSupport";

export class GraphBusiness extends SessionStorageSupport  {
    
    private context: WebPartContext;
    private tasksResponse: any = null;
    private getInfo:boolean;

    constructor(props, getExtraInfo: boolean = false) {
        super();
        this.context = props.context;
        this.getInfo = getExtraInfo;
    }

    public setTasksResponse(data: any) {this.tasksResponse = data;}

    public async getPlannerTasksOfTheDay() {
        const url = `/me/planner/tasks?$count=true&$select=dueDateTime, completedDateTime`;
        const data = await GraphService.GetGraphData(url , this.context.msGraphClientFactory);
        const allTasks = data.value.filter(x => x.completedDateTime === null && x.dueDateTime !== null);
        const todayTasks = allTasks.filter(x => isToday(new Date(x.dueDateTime)) || new Date(x.dueDateTime) < new Date()); // Filtrando por conclusão para hoje
        return todayTasks.length;
    }

    public getTasksFromPlanner = async (top:number, cache:boolean = false, nextLink: number = 0) => {
        if (cache) {
            const data = this.getStoredData("DWTasks");
            if (data) return data;
        }

        try {
            const plannerTasksUrl = `/me/planner/tasks`;
            let response = _.cloneDeep(this.tasksResponse);
            if (!response) {
                const data = await GraphService.GetGraphData(plannerTasksUrl , this.context.msGraphClientFactory);
                this.tasksResponse = _.cloneDeep(data);
                response = data;
            }
            
            // We have to order and filter on the frontend, because this endpoint does not suport the ODATA queries.
            if (response) {
                response.value = [
                    ...response.value.filter(x => x.dueDateTime).sort((a, b) => (a.dueDateTime > b.dueDateTime ? 1 : -1)),
                    ...response.value.filter(x => !x.dueDateTime)
                ].filter((x) => x.completedDateTime === null).slice(nextLink * top, nextLink * top + top);
            }

            if (response["@odata.count"] % nextLink < top) {
                delete response["@odata.nextLink"];
            } else {
                response["@odata.nextLink"] = nextLink + 1;
            }

            if (this.getInfo) {
                response.value = await this.getTaskInfo(response.value);
            }
            if (cache) this.setStoredData("DWTasks", response);
            return response;
        } catch (error) {
            throw new CustomError(i18n("DefaultError"));
        }
    }

    private async getTaskInfo(data: any[]){
        return Promise.all(data.map(async (item) => {
            try {
                const userUrl = `/users/${item.createdBy.user.id}`;
                const planUrl = `/planner/plans/${item.planId}`;
                const userResponse = await GraphService.GetGraphData(userUrl , this.context.msGraphClientFactory);
                const planResponse = await GraphService.GetGraphData(planUrl , this.context.msGraphClientFactory);

                item.user = {
                    name: userResponse.displayName,
                    profileImageSrc: `/_vti_bin/DelveApi.ashx/people/profileimage?size=L&userId=${userResponse.mail}&UA=0&size=HR96x96`
                };
                
                item.plan = planResponse.title;

                return item;
            } catch (error) {
                throw new CustomError(i18n("DefaultError"));
            }
        }));
    }   

    public getUnreadEmailsFromOutlook = async (top:number, cache:boolean = false, nextLink: string = "") => {
        if (cache) {
            const data = this.getStoredData("DWEmails");
            if (data) return data;
        }

        try {
            const inboxFolder = await GraphService.GetGraphData(`/me/mailFolders/inbox`, this.context.msGraphClientFactory);
            const unreadEmailsUrl = `/me/mailFolders/${inboxFolder.id}/messages?$filter=isRead eq false&$top=${top}&$orderby=sentDateTime desc`;
            const response = await GraphService.GetGraphData(nextLink || unreadEmailsUrl, this.context.msGraphClientFactory);

            if (cache) this.setStoredData("DWEmails", response);
            return response;
        } catch (error) {
            throw new CustomError(i18n("DefaultError"));
        }
    }

    public getTeams = async (top:number, cache:boolean = false, nextLink: number = 0) => {
        if (cache) {
            const data = this.getStoredData("DWTeams");
            if (data) return data;
        }

        try {
            const pageSlice = [nextLink * top, nextLink * top + top];
            const response = await GraphService.GetGraphData('/me/joinedTeams', this.context.msGraphClientFactory);

            if (response.value.length === 0) {
                return {
                    "value": [],
                    "@odata.nextLink": false
                };
            }

            const teamsUrls    = response.value.slice(...pageSlice).map(i => `/groups/${i.id}/team?$select=displayName, webUrl, createdDateTime`);
            const photosUrls   = response.value.slice(...pageSlice).map(i => `/groups/${i.id}/photos/48x48/$value`);
            const channelsUrls = response.value.slice(...pageSlice).map(i => `/teams/${i.id}/channels?$select=id, displayName, description, webUrl`);
            const membersUrls  = response.value.slice(...pageSlice).map(i => `/groups/${i.id}/members?$select=mail, displayName`);


            const [teams, photos, channels, members]:any = await Promise.all([
                GraphService.GetGraphParallelData(teamsUrls, this.context.msGraphClientFactory),
                GraphService.GetGraphParallelData(photosUrls, this.context.msGraphClientFactory),
                this.getInfo ? GraphService.GetGraphParallelData(channelsUrls, this.context.msGraphClientFactory) : null,
                this.getInfo ? GraphService.GetGraphParallelData(membersUrls, this.context.msGraphClientFactory) : null
            ]);

            teams.responses    = teams.responses.sort((a, b) => a.id - b.id);
            photos.responses   = photos.responses.sort((a, b) => a.id - b.id);

            if (channels)
                channels.responses = channels.responses.sort((a, b) => a.id - b.id);
            if (members)
                members.responses  = members.responses.sort((a, b) => a.id - b.id);
                
            let messages = null;
            if (this.getInfo) {
                const messagesUrls = response.value.slice(...pageSlice).map((i, index) => `/teams/${i.id}/channels/${channels.responses[index].body.value[0].id}/messages?$top=2`);
                messages = await GraphService.GetBETAGraphParallelData(messagesUrls, this.context.msGraphClientFactory);
                messages.responses = messages.responses.sort((a, b) => a.id - b.id);
            }

            const filteredTeams = teams.responses.reduce((acc, team, i) => {
                if (messages)
                    channels.responses[i].body.value[0]["messages"] = messages.responses[i].body.value ? messages.responses[i].body.value : [];
                
                return [...acc, {
                    webUrl:          team.body.webUrl,
                    createdDateTime: team.body.createdDateTime,
                    displayName:     team.body.displayName,
                    imageBody:       photos ? photos.responses[i].body : null,
                    channels:        channels ? channels.responses[i].body.value : [],
                    members:         members ? members.responses[i].body.value : []
                }];
            }, []).sort((a, b) => (a.createdDateTime < b.createdDateTime ? 1 : -1));

            const res = {
                "value": filteredTeams,
                "@odata.nextLink": nextLink + 1
            };

            if (filteredTeams.length < top) {
                return {
                    "value": filteredTeams,
                    "@odata.nextLink": ""
                };
            }

            if (cache) this.setStoredData("DWTeams", res);
            return res;
        } catch (error) {
            throw new CustomError(i18n("DefaultError"));
        }
    }

    public getFiles = async (top:number, cache:boolean = false, nextLink: number = 0) => {
        if (cache) {
            const data = this.getStoredData("DWFiles");            
            if (data) return data;
        }
        try {
            const pageSlice = nextLink * top + top;
            const filesUrl = `/me/insights/used?$top=${top}&$filter=ResourceVisualization/Type ne 'Web'`;
            let nextLinkUrl = `/me/insights/used?$top=${top}&$skip=${pageSlice}&$filter=ResourceVisualization/Type ne 'Web'`;
            const urlFinal = pageSlice > top ? nextLinkUrl : filesUrl;

            const response: any = await GraphService.GetGraphData(urlFinal, this.context.msGraphClientFactory);

            let data: any = [];

            if(response.value.length > 0){
                const urls = response.value.map((item) => `/me/insights/used/${item.id}/resource`);
                data = await GraphService.GetGraphParallelData(urls, this.context.msGraphClientFactory); 
            } else{
                return {
                    "@odata.nextLink": ""
                };
            }

            data.responses.sort(function(x, y){
                return x.id - y.id;
            });

            let arr = [];

            for(let i = 0; i < response.value.length; i++) {
                arr.push({
                    createdBy: data.responses[i].body.createdBy ? data.responses[i].body.createdBy.user.email : "",
                    createdByName: data.responses[i].body.createdBy ? data.responses[i].body.createdBy.user.displayName : i18n("AutorEmpty"),
                    lastModifiedBy: data.responses[i].body.lastModifiedBy ? data.responses[i].body.lastModifiedBy.user.email  : "",
                    lastModifiedByName: data.responses[i].body.lastModifiedBy ? data.responses[i].body.lastModifiedBy.user.displayName  : i18n("AutorEmpty"),
                    title: response.value[i].resourceVisualization ? response.value[i].resourceVisualization.title : "",
                    modified: response.value[i].lastUsed ? response.value[i].lastUsed.lastModifiedDateTime : "",
                    link: response.value[i].resourceReference ? response.value[i].resourceReference.webUrl : "",
                    previewUrl: response.value[i].resourceVisualization ? response.value[i].resourceVisualization.previewImageUrl : "",
                    type: response.value[i].resourceVisualization ? response.value[i].resourceVisualization.type : ""
                });
            }
            
            // const parsedResponse = this.getInfo ? await this.handlePreviewUrl(response) : response;

            // if (cache) this.setStoredData("DWFiles", parsedResponse);
            
            const res = {
                "value": arr,
                "@odata.nextLink": nextLink + 1
            };

            if (arr.length < top) {
                return {
                    "value": arr,
                    "@odata.nextLink": ""
                };
            }

            // if (cache) this.setStoredData("DWFiles", res);
            return res;

        } catch (error) {
            throw new CustomError(i18n("DefaultError"));
        } 
    }

    // private handlePreviewUrl = async (data) => {
    //     data.value = await Promise.all(data.value.map(async (item) => {
    //         try {
    //             const previewUrl = await GraphService.GetGraphData(`/drives/${item.remoteItem.parentReference.driveId}/items/${item.remoteItem.id}/thumbnails`, this.context.msGraphClientFactory);
    //             item.previewUrl = previewUrl;
    //             return item;
    //         } catch (error) {
    //             throw new CustomError(i18n("DefaultError"));
    //         }
    //     }));

    //     return data;
    // }

    public getCalendar = async (top:number, cache:boolean = false, nextLink: string = "") => {
        if (cache) {
            const data = this.getStoredData("DWCalendar");
            if (data) return data;
        }

        try {
            const today = new Date();
            const nextDate = addDays(startOfDay(today), 30);
            const todayString = today.toISOString();
            const nextDateString = endOfDay(nextDate).toISOString();
            const selects = ["organizer", "location", "start", "end", "subject", "webLink", "attendees"];
            const calendarUrl = `/me/calendarview?$select=${selects.join(", ")}&$top=${top}&startdatetime=${todayString}&enddatetime=${nextDateString}&$orderby=start/dateTime asc`;
            const response = await GraphService.GetGraphData(nextLink || calendarUrl, this.context.msGraphClientFactory);

            if (cache) this.setStoredData("DWCalendar", response);
            return response;
        } catch (error) {
            throw new CustomError(i18n("DefaultError"));
        }
    }

    public getPeople = async (top:number, cache:boolean = false, nextLink: string = "") => {
        if (cache) {
            const data = this.getStoredData("DWPeople");
            if (data) return data;
        }

        try {
            const peopleUrl = `/me/people?$top=${top}&$filter=personType/class eq 'Person' and personType/subclass eq 'OrganizationUser' and displayName ne '${this.context.pageContext.user.displayName}'`;        
            const response = await GraphService.GetGraphData(nextLink || peopleUrl, this.context.msGraphClientFactory);
            
            if (cache) this.setStoredData("DWPeople", response);
            return response;
        } catch (error) {
            throw new CustomError(i18n("DefaultError"));
        }
    }

    public getCalendarEventsOfTheDay() {
        const today = new Date();
        const nowString = new Date().toISOString();
        const nextDateString = endOfDay(today).toISOString();
        const calendarUrl = `/me/calendarview?$select=id&startdatetime=${nowString}&enddatetime=${nextDateString}&$count=true`;
        return GraphService.GetGraphData(calendarUrl, this.context.msGraphClientFactory);
    }

    public async getUnreadEmailsCountOfTheDay() {
        const inboxFolder = await GraphService.GetGraphData(`/me/mailFolders/inbox`, this.context.msGraphClientFactory);
        const today = new Date();
        const todayString = startOfDay(today).toISOString();
        const filter = `isRead eq false and sentDateTime ge ${todayString}`;
        const unreadEmailsUrl = `/me/mailFolders/${inboxFolder.id}/messages?$filter=${filter}&$select=id&count=true`;
        return GraphService.GetGraphData(unreadEmailsUrl, this.context.msGraphClientFactory);
    }

    public async createChat(senderId: any, recipientId: any) {
        const bodyCreateChat = {
            chatType: 'oneOnOne',
            members: [
                {
                '@odata.type': '#microsoft.graph.aadUserConversationMember',
                roles: ['owner'],
                'user@odata.bind': `https://graph.microsoft.com/v1.0/users(\'${senderId}\')`
                },
                {
                '@odata.type': '#microsoft.graph.aadUserConversationMember',
                roles: ['owner'],
                'user@odata.bind': `https://graph.microsoft.com/v1.0/users(\'${recipientId}\')`
                }
            ]
        };
        const createdChat = await GraphService.PostGraphData('/chats', bodyCreateChat, this.context.msGraphClientFactory);
        return createdChat.id;
    }

    public async createMessageChat(idChat: any, bodyMessageChat: any, imageToBase64: any) {
        const bodyChat = {
            "body": {
                "contentType": "html",
                "content": `${bodyMessageChat}`
            },
            "hostedContents":[
                {
                  "@microsoft.graph.temporaryId": "1",
                  "contentBytes": `${imageToBase64}`,
                    "contentType": "image/png"
                }
            ]
        }
        const urlChat = `/chats/${idChat}/messages`;
        return GraphService.PostGraphData(urlChat, bodyChat, this.context.msGraphClientFactory);
    }
}