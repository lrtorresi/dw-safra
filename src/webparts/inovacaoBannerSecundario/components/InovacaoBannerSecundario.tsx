import * as React from "react";
import { useState, useEffect } from "react";
import './InovacaoBannerSecundario.scss';
import { IInovacaoBannerSecundario } from '../../../interfaces/libraries/IInovacaoBannerSecundario';
import { MessageBar, MessageBarType, HandleError } from "impar-digital-workplace-core-library";
import { IInovacaoBannerSecundarioProps } from "./IInovacaoBannerSecundarioProps";
import { StylingExtensionBusiness } from "../../../business/StylingExtension";


export default (props: IInovacaoBannerSecundarioProps) => {
	const bllhome = new StylingExtensionBusiness(props);

	const [banner, setBanner] = useState<IInovacaoBannerSecundario[]>([]);
	const [error, setError] = useState<string>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const loadBanner = async () => {
		try {
			const banners: IInovacaoBannerSecundario[] = await bllhome.getSecondaryBanner(props.hasSegmentation);

			setError(null);
			setBanner(banners);
			setLoading(false);

		} catch (error) {
            setLoading(false);
            setError(HandleError(error));
        }
	};

	useEffect(() => {
		loadBanner();
	}, []);

    let ret: JSX.Element;

    if (error) {
        ret = <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>;
    } else {
        ret = <>
            {
                !loading && banner && banner.length > 0 &&
                banner.map((item: IInovacaoBannerSecundario) =>
                    <a className={`DWItems ${!item.redirectUrl && 'dwNoClick'}`} data-interception="off" title={item.title} href={item.redirectUrl ? item.redirectUrl : 'javascript:void(0);'} target={item.openNewTab ? '_blank' : '_self'}>
                        <img src={item.filePath} alt={item.title} />
                        {
                            (item && item.title || item.description) &&
                            <div className={"text"}>
                                {item.title && <h2>{item.title}</h2>}
                            </div>
                        }
                    </a>
                )
            }
        </>;
    }

	return (
		<div className={"DWWrapper DWCustom DWBannerSecundarioInovacao"}>
            {ret}
		</div>
	);
};
