import * as React from 'react';
import { IEventosInovacao } from '../../../interfaces/lists/IEventosInovacao';
import { handleDateFnsLocale, i18n, format } from 'impar-digital-workplace-core-library';
import { formatISO } from 'date-fns';

export interface IEventosInovacaoItemProps {
    item: IEventosInovacao;
    isPanel: boolean;
    handlePanel?: any;
    seeAllButtonText?: string;
}

export default (props: IEventosInovacaoItemProps) => {
    
    const itemData:JSX.Element = <>
        <div className={"date"}>
            <h2>{format(props.item.eventDate, "dd", { locale: handleDateFnsLocale() })}</h2>
            <h5>{format(props.item.eventDate, "MMM", { locale: handleDateFnsLocale() })}</h5>
        </div>
        <div className={"details"}>
            <div>
                <h4>{props.item.title}</h4>
                <h5>{props.item.resume}</h5>
                
            </div>
        </div>
        <span className="DWIconSetaDireita"></span>
    </>;

    return (
        <>
            {
                props && props.item &&
                <>
                    {
                        props.isPanel ?
                            <div className="DWItem inView">
                                {itemData}
                            </div>
                        :
                            <a className="DWItem" onClick={(e) => {
                                e.preventDefault();
                                props.handlePanel(props.item);
                            }}>
                                {itemData}
                            </a>
                    }
                    {
                        props.isPanel &&
                            <div className="DWItemInfo">
                                <div>
                                    {props.item.category && <h4>{i18n("CalendarioCorporativoCategory")}{props.item.category}</h4>}
                                    {props.item.location && <h4>{i18n("CalendarioCorporativoPlace")}{props.item.location}</h4>}
                                    {props.item.description && <div dangerouslySetInnerHTML={{ __html: props.item.description }}></div>}
                                </div>
                                
                                <div className="buttonContainer">
                                    <h5 onClick={() => props.handlePanel(null, true)}>{props.seeAllButtonText}</h5>
                                </div>
                            </div>
                    }
                </>
            }
        </>
    );
};