import { CoreService } from "../services/base/CoreService";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import * as _ from "lodash";
import { format, startOfMonth, endOfMonth, ISiteUser, IListInfo, IComboBoxOption, SelectableOptionMenuItemType, meGroupsCAML } from "impar-digital-workplace-core-library";
import { ListService } from "../services/base/ListService";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { IStartups } from "../interfaces/lists/IStartups";
import { StartupsRepository } from "../repository/StartupsRepository";
import { eventosInovacaoInternalNames, IEventosInovacao } from "../interfaces/lists/IEventosInovacao";
import { EventosInovacaoRepository } from "../repository/EventosInovacaoRepository";
import { ICasesSucesso } from "../interfaces/lists/ICasesSucesso";
import { CasesSucessoRepository } from "../repository/CasesSucessoRepository";
import { IInovacaoBanner, principalBannerInternalNames, principalBannerStatus } from "../interfaces/libraries/IInovacaoBanner";
import { IInovacaoBannerSecundario } from "../interfaces/libraries/IInovacaoBannerSecundario";
import { IInovacaoAcessosRapidos } from "../interfaces/lists/IInovacaoAcessosRapidos";
import { InovacaoBannerRepository } from "../repository/InovacaoBannerRepository";
import { InovacaoBannerSecundarioRepository } from "../repository/InovacaoBannerSecundarioRepository";
import { IInovacaoAcessosRapidosRepository } from "../repository/InovacaoAcessosRapidos";
import axios from "axios";

const selectDefault = ["ID", "Id", "Title"];

export class StylingExtensionBusiness {
    public listInfo: IListInfo;
    public currentUser: ISiteUserInfo;
    private svcCore: CoreService;
    private context: WebPartContext;
    private svcHRBenefits: ListService<IStartups>;
    private svcCases: ListService<ICasesSucesso>;
    private svcEventosInovacao: ListService<IEventosInovacao>;
    private svcInovacaoBanner: ListService<IInovacaoBanner>;
    private svcInovacaoBannerSecundario: ListService<IInovacaoBannerSecundario>;
    private svcInovacaoAcessosRapidos: ListService<IInovacaoAcessosRapidos>;

    constructor(props, siteUrl: string = "") {
        this.svcCore = new CoreService(props.context);
        this.context = props.context;
        this.svcHRBenefits = new ListService(props.context, new StartupsRepository());
        this.svcCases = new ListService(props.context, new CasesSucessoRepository());
        this.svcEventosInovacao = new ListService(this.context, new EventosInovacaoRepository(), siteUrl);
        this.svcInovacaoBanner = new ListService(this.context, new InovacaoBannerRepository(), siteUrl);
        this.svcInovacaoBannerSecundario = new ListService(this.context, new InovacaoBannerSecundarioRepository(), siteUrl);
        this.svcInovacaoAcessosRapidos = new ListService(this.context, new IInovacaoAcessosRapidosRepository(), siteUrl);
    }

    public async getBenefits(): Promise<IStartups[]> {
        const query = await this.svcHRBenefits.getQueryAsync();
        const select = [...selectDefault, "Icon", "Created", "Resume", "Descricao", "Order0"];
        const get = query.select(...select).orderBy("Order0", true);
    
        return this.svcHRBenefits.getItems(get);
    }

    public async getFastLinks(): Promise<IInovacaoAcessosRapidos[]> {
        const query = await this.svcInovacaoAcessosRapidos.getQueryAsync();
        const select = [...selectDefault, "Url", "NewTab", "Order0", "Icon", "Created"];
        const get = query.select(...select).orderBy("Order0", true);

        return this.svcInovacaoAcessosRapidos.getItems(get);
    }

    public async getCases(): Promise<ICasesSucesso[]> {
        const query = await this.svcCases.getQueryAsync();
        const select = [...selectDefault, "Icon", "Created", "Descricao"];
        const get = query.select(...select).orderBy("Title", true);
    
        return this.svcCases.getAllItems(get);
    }

    public async getCurrentUserUserProfile(): Promise<ISiteUserInfo> {
        return this.svcCore.currentUserSP();
    }

    public async getCorporateCalendar(limit: number, audience: boolean): Promise<IEventosInovacao[]> {
        
        let audienceQuery = await meGroupsCAML(this.context);
        let queryCAML;

        queryCAML = `<View Scope="RecursiveAll">
                        <Query>
                            <Where>
                                ${audience && `<And>`}
                                    <Or>    
                                        <Geq>
                                            <FieldRef Name='${eventosInovacaoInternalNames.eventDate}' />
                                            <Value IncludeTimeValue='TRUE' Type='DateTime'><Today/></Value>
                                        </Geq>
                                        
                                        <And>
                                            <Leq>
                                                <FieldRef Name='${eventosInovacaoInternalNames.eventDate}' />
                                                <Value IncludeTimeValue='TRUE' Type='DateTime'><Today/></Value>
                                            </Leq>
                                            <Geq>
                                                <FieldRef Name='${eventosInovacaoInternalNames.endDate}' />
                                                <Value IncludeTimeValue='TRUE' Type='DateTime'><Today/></Value>
                                            </Geq>
                                        </And>
                                    </Or>
                                    ${audience &&
                                        `<Or>
                                            <IsNull>
                                                <FieldRef Name='_ModernAudienceAadObjectIds' />
                                            </IsNull>
                                            ${audienceQuery}
                                        </Or>`
                                    }
                                ${audience && `</And>`}
                            </Where>
                        <OrderBy>
                            <FieldRef Name="${eventosInovacaoInternalNames.eventDate}" Ascending="True" />
                        </OrderBy>
                        </Query>
                        <RowLimit>${limit}</RowLimit>
                    </View>`;

        let storedNews = await this.svcEventosInovacao.getQueryAsyncCAML(false, {ViewXml: `
        ${queryCAML}
       `,});
        
        return this.svcEventosInovacao.getItemsCAML(storedNews['Row'], true);
    }

    public async getEventosInovacaoByMonth(month: Date, audience: boolean): Promise<IEventosInovacao[]>{
        let audienceQuery = await meGroupsCAML(this.context);

        const initDate = startOfMonth(month).toISOString();
        const endDate = endOfMonth(month).toISOString();
        let queryCAML;

        queryCAML = `<View>
                    <Query>
                        <Where>
                            ${audience && `<And>`}
                                <Or>
                                    <And>    
                                        <Geq>
                                            <FieldRef Name='${eventosInovacaoInternalNames.eventDate}' />
                                            <Value IncludeTimeValue='TRUE' Type='DateTime'>${initDate}</Value>
                                        </Geq>
                                        <Leq>
                                            <FieldRef Name='${eventosInovacaoInternalNames.eventDate}' />
                                            <Value IncludeTimeValue='TRUE' Type='DateTime'>${endDate}</Value>
                                        </Leq>
                                    </And>
                                    <And>
                                        <Leq>
                                            <FieldRef Name='${eventosInovacaoInternalNames.eventDate}' />
                                            <Value IncludeTimeValue='TRUE' Type='DateTime'>${initDate}</Value>
                                        </Leq>
                                        <Geq>
                                            <FieldRef Name='${eventosInovacaoInternalNames.endDate}' />
                                            <Value IncludeTimeValue='TRUE' Type='DateTime'>${endDate}</Value>
                                        </Geq>
                                    </And>
                                </Or>
                                
                                ${audience && `
                                    <Or>
                                        <IsNull>
                                            <FieldRef Name='_ModernAudienceAadObjectIds' />
                                        </IsNull>
                                        ${audienceQuery}
                                    </Or>
                                `}
                            ${audience && `</And>`}
                        </Where>
                    <OrderBy>
                        <FieldRef Name="${eventosInovacaoInternalNames.eventDate}" Ascending="True" />
                    </OrderBy>
                    </Query>
                    <ViewFields>
                            <FieldRef Name='Id'/>
                            <FieldRef Name='ID'/>
                            <FieldRef Name='Title'/>
                            <FieldRef Name='Location'/>
                            <FieldRef Name='Description'/>            
                            <FieldRef Name='Category'/>
                            <FieldRef Name='fAllDayEvent'/>
                            <FieldRef Name='fRecurrence'/>
                            <FieldRef Name='RecurrenceData'/>
                            <FieldRef Name='EventDate.'/>
                            <FieldRef Name='EndDate.'/>
                        </ViewFields>
                </View>`;

        let storedNews = await this.svcEventosInovacao.getQueryAsyncCAML(false, {ViewXml: `${queryCAML}`,});
        let listItems = this.svcEventosInovacao.getItemsCAML(storedNews['Row'], true);
        return listItems;
    }


    public async getPrincipalBanner(audience: boolean): Promise<IInovacaoBanner[]> {

        let audienceQuery = await meGroupsCAML(this.context);
        let queryCAML;

        queryCAML = `<View Scope="RecursiveAll">
                    <Query>
                        <Where>
                            ${audience && `<And>`}
                                <Eq>
                                    <FieldRef Name="${principalBannerInternalNames.status}" />
                                    <Value Type="Text">${principalBannerStatus.active}</Value>
                                </Eq>
                                ${audience && 
                                    `<Or>
                                        <IsNull>
                                            <FieldRef Name='_ModernAudienceAadObjectIds' />
                                        </IsNull>
                                        ${audienceQuery}
                                    </Or>`
                                }
                            ${audience && `</And>`}
                        </Where>
                    <OrderBy>
                        <FieldRef Name="${principalBannerInternalNames.order}" Ascending="True" />
                    </OrderBy>
                    </Query>
                </View>`;
        

        let storedNews = await this.svcInovacaoBanner.getQueryAsyncCAML(true, {ViewXml: `
        ${queryCAML}
       `,});

        return this.svcInovacaoBanner.getItemsCAML(storedNews['Row'], true);
    }

    public async getSecondaryBanner(audience: boolean): Promise<IInovacaoBannerSecundario[]> {

        let audienceQuery = await meGroupsCAML(this.context);
        let queryCAML;

        queryCAML = `<View Scope="RecursiveAll">
                    <Query>
                        <Where>
                            ${audience && `<And>`}
                                <Eq>
                                    <FieldRef Name="${principalBannerInternalNames.status}" />
                                    <Value Type="Text">${principalBannerStatus.active}</Value>
                                </Eq>

                                ${audience &&
                                    `<Or>
                                        <IsNull>
                                            <FieldRef Name='_ModernAudienceAadObjectIds' />
                                        </IsNull>
                                        ${audienceQuery}
                                    </Or>`
                                }
                            ${audience && `</And>`}
                        </Where>
                    <OrderBy>
                        <FieldRef Name="${principalBannerInternalNames.order}" Ascending="True" />
                    </OrderBy>
                    </Query>
                </View>`;
        

        let storedNews = await this.svcInovacaoBannerSecundario.getQueryAsyncCAML(true, {ViewXml: `
        ${queryCAML}
       `,});
    
        return this.svcInovacaoBannerSecundario.getItemsCAML(storedNews['Row'], true);
    }

    public async getEspecialista() {
        let results = axios.get('https://oespecialista.com.br/feed/home').then(resp => {
    
            console.log(resp.data);
        });
    
        return results;
    }


}