import { WebPartContext } from '@microsoft/sp-webpart-base';
import { 
    handleDateFnsLocale, 
    i18n, 
    format, 
    Icon,
    MessageBar, 
    MessageBarType, 
    Shimmer, 
    ShimmerElementsGroup, 
    ShimmerElementType 
} from 'impar-digital-workplace-core-library';
import * as React from 'react';
import './Tasks.scss';

export default ({data, loading = false, boxTitle = "", error = "", showCallToAction = false, customClass = "", context = null}: IGraphComponentProps) => {
    let ret: JSX.Element;

    if (error) {
        ret = <MessageBar messageBarType={MessageBarType.error} className="hubItemMessageBar">{error}</MessageBar>;
    } else if (data.length === 0) {
        ret = <MessageBar className="hubItemMessageBar">{i18n("Microsoft365HubTasksEmpty")}</MessageBar>;
    } else {
        ret = <>
            {data.map(({id, title, dueDateTime, createdDateTime}) => {
                const webUrl = id ? `https://tasks.office.com/${context.pageContext.user.email.split('@')[1]}/Home/Task/${id}` : "#";
                const dueDateString = dueDateTime ? format(new Date(dueDateTime), `'${i18n("Microsoft365HubTasksDelivery")}'P`, { locale: handleDateFnsLocale() }) : "";
                const expired = new Date(dueDateTime) < new Date() && dueDateTime != null;
                return (
                    <a className="taskItem" href={webUrl} target="_blank" data-interception="off" style={loading ? {pointerEvents: "none"} : {}}>
                        <Shimmer customElementsGroup={renderShimmer} isDataLoaded={!loading} width="100%">
                            <div className="container">
                                <div>
                                    <img src={require('./../../imgs/microsoft-planner.png')}/>
                                    <span>
                                        <h6>{`${dueDateString}`}</h6>
                                        <h5>{title}</h5>
                                    </span>
                                </div>
                                { expired && <span className="DWIconExclamacao" title={i18n('Microsoft365HubTasksExpiredTask')}></span> }
                            </div>
                        </Shimmer>
                    </a>
                );
            })}
        </>;
    }
    return (
        <div className={`${customClass} DWTasksComponent ${showCallToAction ? "withCTA" : ""}`}>
            { boxTitle && <h4>{boxTitle}</h4>}
            {ret}
            {showCallToAction && <a className="callToAction" href="https://tasks.office.com/" data-interception="off" target="_blank">
                <img src={require('./../../imgs/microsoft-planner.png')}/>
                <h6>{i18n("Microsoft365HubPlannerCTA")}</h6>
                <span className="DWIconSetaDireita"></span>
            </a>}
        </div>
    );
};

const renderShimmer:JSX.Element =  (
    <div style={{ display: "flex", alignItems: "center" }}>
        <ShimmerElementsGroup
            shimmerElements={[
                { type: ShimmerElementType.line, width: 20, height: 20 },
                { type: ShimmerElementType.gap, width: 10, height: 40 },
            ]}
        />
        <ShimmerElementsGroup
            flexWrap
            width="100%"
            shimmerElements={[
                { type: ShimmerElementType.line, width: '100%', height: 13 },
                { type: ShimmerElementType.gap, width: '100%', height: 10 },
                { type: ShimmerElementType.line, width: '80%', height: 13 },
                { type: ShimmerElementType.gap, width: '20%', height: 13 },
            ]}
        />
    </div>
);