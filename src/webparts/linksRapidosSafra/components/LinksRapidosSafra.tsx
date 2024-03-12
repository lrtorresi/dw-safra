import * as React from 'react';
import { useEffect, useState } from 'react';
import './LinksRapidosSafra.scss';
import { ILinksRapidosSafraProps } from './ILinksRapidosSafraProps';
import { HomeBusiness } from '../../../business/HomeBusiness';
import { IFastLinkSafra } from '../../../interfaces/lists/IFastLinkSafra';
import { HandleError, i18n, MessageBar, MessageBarType, Shimmer, ShimmerElementType } from 'impar-digital-workplace-core-library';

export default (props: ILinksRapidosSafraProps) => {
    const bllhome = new HomeBusiness(props);
    const [links, setLinks] = useState<IFastLinkSafra[]>(new Array(8).fill({}));
    const [loading, setLoading] = useState(true);
    const [mobile, setMobile] = useState(true);
    const [error, setError] = useState("");

    const loadFastLinks = async () => {
        try {
            setLoading(true);
            const fastLinks = await bllhome.getFastLinksHome();
            setLinks([
                ...fastLinks.filter((x) => x.order),
                ...fastLinks.filter((x) => !x.order)
            ]);
            console.log("Links Rápidps: ", fastLinks);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(HandleError(error));
        }
    };

    useEffect(() => {
        if (window.matchMedia("(max-width: 1024px)").matches) {
            setMobile(true)
        } else {
            setMobile(false);
        }
        loadFastLinks();
    }, []);

    const handleLinkProps = (link: IFastLinkSafra) => ({
        href: link.url ? link.url : "",
        target: link.newTab ? "_blank" : "_self"
    });

    let ret: JSX.Element;

    if (error) {
        ret = <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>;
    } else if (links.length === 0) {
        ret = <MessageBar>{i18n("LinksRapidosEmpty")}</MessageBar>;
    } else {
        ret = (
            <div className="DWContainer">
                {links.map((link) => {
                     
                    return (
                        
                        <div className={`DWItem ${mobile && link.mobile == "Inativo" ? 'hide' : ''}`}>
                            <Shimmer isDataLoaded={!loading} width="100%"
                                shimmerElements={shimmerElements}
                            >
                                <a className="DWContent" data-interception="off" {...handleLinkProps(link)} style={loading ? { pointerEvents: "none", backgroundColor: 'white' } : {}}>
                                    <img src={link.icon ? link.icon : ""} alt="" />
                                    <h5>{link.title}</h5>
                                </a>
                            </Shimmer>
                        </div>
                        
                    );
                    
                })}
            </div>
        );
    }

    return (
        <div className="DWWrapper DWCustom LinksRapidosSafra">
            {
                props.webpartTitle &&
                <h3>{props.webpartTitle}</h3>
            }
            {ret}
        </div>
    );
};

const shimmerElements = [
    { type: ShimmerElementType.line, height: 25, width: '10%' },
    { type: ShimmerElementType.gap, width: '5%' },
    { type: ShimmerElementType.line, height: 25, width: '85%' },
];