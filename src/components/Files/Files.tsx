import {  
    Icon, 
    MessageBar, 
    MessageBarType, 
    Shimmer, 
    ShimmerElementsGroup, 
    ShimmerElementType, 
    formatDistanceToNow, 
    getFileExtension, 
    handleDateFnsLocale, 
    i18n } from "impar-digital-workplace-core-library";
import * as React from 'react';
import { getFileTypeIconProps, initializeFileTypeIcons } from '@uifabric/file-type-icons';
import './Files.scss';

initializeFileTypeIcons();

export default ({data, loading = false, boxTitle = "", error = "", showCallToAction = false, customClass = ""}: IGraphComponentProps) => {

    let ret: JSX.Element;

    if (error) {
        ret = <MessageBar messageBarType={MessageBarType.error} className="hubItemMessageBar">{error}</MessageBar>;
    } else if (data.length === 0) {
        ret = <MessageBar className="hubItemMessageBar">{i18n("Microsoft365HubFilesEmpty")}</MessageBar>;
    } else {
        ret = <>
            {data && data.map((item) => {
                const lastModifiedDateTimeString = item.modified && formatDistanceToNow(new Date(item.modified), { locale: handleDateFnsLocale() });
                const webUrl = item.link && item.link;
                const title = item.title && item.title;
                const type = item.type && item.type;
                
                return (
                    <a className="fileItem" href={webUrl} target="_blank" data-interception="off" style={loading ? {pointerEvents: "none"} : {}}>
                        <Shimmer customElementsGroup={renderShimmer} isDataLoaded={!loading} width="100%">
                            <div className="container">
                                <div className="fileIcon">
                                    <Icon {...getFileTypeIconProps({ extension: getFileExtension(type), size: 20, imageFileType: 'svg' })} />
                                </div>
                                <div>
                                    <h6>{i18n("Microsoft365HubFilesModifiedSince")}{lastModifiedDateTimeString}</h6>
                                    <h5>{title}</h5>
                                </div>
                            </div>
                        </Shimmer>
                    </a>
                );
            })}
        </>;
    }
    return (
        <div className={`${customClass} DWFilesComponent ${showCallToAction ? "withCTA" : ""}`}>
            <h4>{boxTitle}</h4>
            {ret}
        </div>
    );
};

const renderShimmer: JSX.Element =  (
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