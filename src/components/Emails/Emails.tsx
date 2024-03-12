import { Icon, MessageBar, MessageBarType, Shimmer, ShimmerElementsGroup, ShimmerElementType, handleDateFnsLocale, i18n, format } from "impar-digital-workplace-core-library";
import * as React from 'react';
import UserProfileImage, { UserProfileImageSizes } from '../UserProfileImage/UserProfileImage';
import './Emails.scss';

export default ({data, loading = false, boxTitle = "", error = "", showCallToAction = false, customClass = ""}: IGraphComponentProps) => {

    let ret: JSX.Element;

    if (error) {
        ret = <MessageBar messageBarType={MessageBarType.error} className="hubItemMessageBar">{error}</MessageBar>;
    } else if (data.length === 0) {
        ret = <MessageBar className="hubItemMessageBar">{i18n("Microsoft365HubEmailsEmpty")}</MessageBar>;
    } else {
        ret = <>
            {data.map(({webLink, sender, subject, flag, sentDateTime}) => {
                return (
                    <a className="emailItem" href={webLink} target="_blank" data-interception="off" style={loading ? {pointerEvents: "none"} : {}}>
                        <Shimmer customElementsGroup={renderShimmer} isDataLoaded={!loading} width="100%">
                            <div className="container">
                                <div>
                                    <UserProfileImage
                                        className="senderThumbnail"
                                        picSize={UserProfileImageSizes.SMALL}
                                        userEmail={sender && sender.emailAddress.address}
                                        width={27}
                                        height={27}
                                        title={sender && sender.emailAddress.name}
                                    />
                                    <span>
                                        <h6>{sender && sender.emailAddress.name}</h6>
                                        <h5>{subject}</h5>
                                    </span>
                                </div>
                                { flag && flag.flagStatus == "flagged" && <Icon iconName="Flag" title={i18n("Microsoft365HubEmailsFlaggedEmail")}/> }
                            </div>
                        </Shimmer>
                    </a>
                );
            })}
        </>;
    }

    return (
        <div className={`${customClass} DWEmailsComponent ${showCallToAction ? "withCTA" : ""}`}>
            <h4>{boxTitle}</h4>
            {ret}
        </div>
    );
};

const renderShimmer: JSX.Element =  (
    <div style={{ display: "flex", alignItems: "center" }}>
        <ShimmerElementsGroup
            shimmerElements={[
                { type: ShimmerElementType.circle, width: 27, height: 27 },
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