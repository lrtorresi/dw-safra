import * as React from 'react';
import { useEffect, useState } from 'react';
import './InovacaoAcessosRapidos.scss';
import { IFastLink } from '../../../interfaces/lists/IFastLink';
import { createTheme, ITheme, MessageBar, MessageBarType, Shimmer, ShimmerElementsGroup, ShimmerElementType, i18n, HandleError } from "impar-digital-workplace-core-library";
import { IInovacaoAcessosRapidosProps } from './IInovacaoAcessosRapidosProps';
import { StylingExtensionBusiness } from '../../../business/StylingExtension';
import { IInovacaoAcessosRapidos } from '../../../interfaces/lists/IInovacaoAcessosRapidos';

const ThemeColorsFromWindow: any = (window as any).__themeState__.theme;
const theme: ITheme = createTheme({ //pass this object to your components
  palette: ThemeColorsFromWindow
});

export default (props: IInovacaoAcessosRapidosProps) => {
    const bllhome = new StylingExtensionBusiness(props);
    const [links, setLinks] = useState<IInovacaoAcessosRapidos[]>(new Array(8).fill({}));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadFastLinks = async () => {
        try {
            setLoading(true);
            const fastLinks = await bllhome.getFastLinks();
            setLinks([
                ...fastLinks.filter((x) => x.order),
                ...fastLinks.filter((x) => !x.order)
            ]);
            setLoading(false);
        } catch (error) {
            setLoading(false);
			setError(HandleError(error));
        }
    };

    useEffect(() => {
        loadFastLinks();
    }, []);

    const handleLinkProps = (link:IFastLink) => ({
        href:   link.url ? link.url : "",
        target: link.newTab ? "_blank" : "_self"
    });

    let ret:JSX.Element;

    if (error) {
        ret = <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>;
    } else if (links.length === 0) {
        ret = <MessageBar>{i18n("LinksRapidosEmpty")}</MessageBar>;
    } else {
        ret = (
            <div className="DWContainer">
                {links.map((link) => {
                    return (
                        <div className="DWItem">
                            <Shimmer isDataLoaded={!loading} width="100%"
                            shimmerElements={shimmerElements}
                            >
                                <a className="DWContent" data-interception="off" {...handleLinkProps(link)} style={loading ? {pointerEvents: "none", backgroundColor: 'white'} : {}}>
                                    <div className="img"><img src={link.icon ? link.icon : ""} alt=""/></div>
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
        <div className="DWWrapper DWCustom DWInovacao">
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