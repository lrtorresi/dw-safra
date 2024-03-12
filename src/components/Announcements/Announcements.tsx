import { Icon, MessageBar, MessageBarType, Shimmer, ShimmerElementsGroup, ShimmerElementType } from "impar-digital-workplace-core-library";
import * as React from 'react';
import { IAnnouncement } from '../../interfaces/lists/IAnnouncement';
import './Announcements.scss';

export default ({ data, loading = false, boxTitle = "", error = "", showCallToAction = false, customClass = "", context = null, typeOfBar }: IGraphComponentProps) => {
    const newBar = typeOfBar
    let ret: JSX.Element;
    if (error) {
        ret = <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>;
    } else {
        ret = (
            <>
                {!!data &&
                    data.length > 0 &&
                    data.map(({ id, title, description, url }: IAnnouncement) => {
                    return (
                        <a className="DWItem" href={url} target="_blank" data-interception="off" style={loading ? { pointerEvents: "none" } : {}}>
                            <div className="DWContainer">
                                <div className="DWLeft">
                                    {newBar ? null : <span className="DWIconExclamacao"></span>}
                                </div>
                                <div className="DWRight">
                                    <h3>{title}</h3>
                                    <div dangerouslySetInnerHTML={{ __html: description }} />
                                </div>
                            </div>
                        </a>
                    );
                })}
            </>
        );
    }

    return (
        <div className={`${customClass} ${newBar ? 'DWAnnouncementsComponentNewBar' : ''} ${showCallToAction ? "withCTA" : ""}`}>
            {ret}
        </div>
    );
};