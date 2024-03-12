import * as _ from "lodash";
import { ListService } from "../services/base/ListService";
import {
  IListInfo,
  meGroupsCAML,
} from "impar-digital-workplace-core-library";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import {
  IAnnouncement,
  announcementInternalNames,
} from "../interfaces/lists/IAnnouncement";
import { AnnouncementsRepository } from "../repository/AnnouncementsRepository";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import { adminInternalNames, IAdminItem } from "../interfaces/lists/IAdminItem";
import { AdminRepository } from "../repository/AdminRepository";
import SessionStorageSupport from "./SessionStorageSupport";
import { ITools } from "../interfaces/lists/ITools";
import { ToolsRepository } from "../repository/ToolsRepository";
import { corporateCalendarInternalNames } from "../interfaces/lists/ICorporateCalendar";
import { IFastLink } from "../interfaces/lists/IFastLink";
import { FastLinksRepository } from "../repository/FastLinkRepository";
import { IFastLinkSafra } from "../interfaces/lists/IFastLinkSafra";
import { FastLinksRepositorySafra } from "../repository/FastLinkRepositorySafra";

const selectDefault = ["ID", "Id", "Title"];

export class HomeBusiness extends SessionStorageSupport {
  public listInfo: IListInfo;
  private svcAnnouncements: ListService<IAnnouncement>;
  private svcAdmin: ListService<IAdminItem>;
  private svcTools: ListService<ITools>;
  private svcFastLinks: ListService<IFastLink>;
  private svcFastLinksSafra: ListService<IFastLinkSafra>;

  private context: WebPartContext | ApplicationCustomizerContext;

  constructor(props, siteUrl: string = "") {
    super();
    this.context = props.context;
    
    this.svcAnnouncements = new ListService(
      this.context,
      new AnnouncementsRepository(),
      siteUrl
    );
    this.svcAdmin = new ListService(
      this.context,
      new AdminRepository(),
      siteUrl
    );
    this.svcTools = new ListService(
      this.context,
      new ToolsRepository(),
      siteUrl
    );
    this.svcFastLinks = new ListService(this.context, new FastLinksRepository(), siteUrl);
    this.svcFastLinksSafra = new ListService(this.context, new FastLinksRepositorySafra(), siteUrl);
  }

  

  public async getTools(): Promise<ITools[]> {
    const query = await this.svcTools.getQueryAsync();
    const select = [
      ...selectDefault,
      "Link",
      "Attachments",
      "AttachmentFiles/ServerRelativeUrl",
    ];
    const get = query.select(...select).expand("AttachmentFiles");

    return this.svcTools.getItems(get);
  }


  public async getAnnouncements(
    cache: boolean = false,
    audience
  ): Promise<IAnnouncement[]> {
    let audienceQuery = await meGroupsCAML(this.context);
    let queryCAML;

    const currDate = new Date();
    currDate.setUTCHours(0, 0, 0, 0);

    if (audience) {
      queryCAML = `<View>
                        <Query>
                            <Where>
                                <And>
                                    <And>    
                                        <Geq>
                                            <FieldRef Name='${
                                              announcementInternalNames.endDate
                                            }' />
                                            <Value IncludeTimeValue='TRUE' Type='DateTime'>${currDate.toISOString()}</Value>
                                        </Geq>
                                        <Leq>
                                            <FieldRef Name='${
                                              announcementInternalNames.startDate
                                            }' />
                                            <Value IncludeTimeValue='TRUE' Type='DateTime'>${currDate.toISOString()}</Value>
                                        </Leq>
                                    </And>
                                    <Or>
                                        <IsNull>
                                            <FieldRef Name='_ModernAudienceAadObjectIds' />
                                        </IsNull>
                                        ${audienceQuery}
                                    </Or>
                                </And>
                            </Where>
                        <OrderBy>
                            <FieldRef Name="${
                              corporateCalendarInternalNames.eventDate
                            }" Ascending="True" />
                        </OrderBy>
                        </Query>
                        <ViewFields>
                            <FieldRef Name='Id'/>
                            <FieldRef Name='ID'/>
                            <FieldRef Name='Title'/>
                            <FieldRef Name='Url'/>
                            <FieldRef Name='NewTab'/>
                            <FieldRef Name='StartDate'/>            
                            <FieldRef Name='EndDate'/>
                            <FieldRef Name='Description'/>
                        </ViewFields>
                    </View>`;
    } else {
      queryCAML = `<View>
                        <Query>
                            <Where>
                                <And>    
                                    <Geq>
                                        <FieldRef Name='${
                                          announcementInternalNames.endDate
                                        }' />
                                        <Value IncludeTimeValue='TRUE' Type='DateTime'>${currDate.toISOString()}</Value>
                                    </Geq>
                                    <Leq>
                                        <FieldRef Name='${
                                          announcementInternalNames.startDate
                                        }' />
                                        <Value IncludeTimeValue='TRUE' Type='DateTime'>${currDate.toISOString()}</Value>
                                    </Leq>
                                </And>
                            </Where>
                        <OrderBy>
                            <FieldRef Name="${
                              corporateCalendarInternalNames.eventDate
                            }" Ascending="True" />
                        </OrderBy>
                        </Query>
                        <ViewFields>
                            <FieldRef Name='Id'/>
                            <FieldRef Name='ID'/>
                            <FieldRef Name='Title'/>
                            <FieldRef Name='Url'/>
                            <FieldRef Name='NewTab'/>
                            <FieldRef Name='StartDate'/>            
                            <FieldRef Name='EndDate'/>
                            <FieldRef Name='Description'/>
                        </ViewFields>
                    </View>`;
    }

    let storedNews = await this.svcAnnouncements.getQueryAsyncCAML(false, {
      ViewXml: `
        ${queryCAML}
       `,
    });

    return this.svcAnnouncements.getItemsCAML(storedNews["Row"], true);
  }

  public async getAdminItems(): Promise<IAdminItem[]> {
    const query = await this.svcAdmin.getQueryAsync();
    const select = [...selectDefault, ...Object.values(adminInternalNames)];
    const get = query.select(...select);

    return this.svcAdmin.getItems(get);
  }

  public async getFastLinks(): Promise<IFastLink[]> {
    const query = await this.svcFastLinks.getQueryAsync();
    const select = [...selectDefault, "Url", "NewTab", "Order0", "Icon", "Created"];
    const get = query.select(...select).orderBy("Order0", true);

    return this.svcFastLinks.getItems(get);
}

public async getFastLinksHome(): Promise<IFastLinkSafra[]> {
  const query = await this.svcFastLinksSafra.getQueryAsync();
  const select = [...selectDefault, "Url", "NewTab", "Order0", "Icon", "Created", "OpenMobile"];
  const get = query.select(...select).orderBy("Order0", true);

  return this.svcFastLinksSafra.getItems(get);
}
}
