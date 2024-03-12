import * as React from 'react';
import './CasesSucesso.scss';
import { useState, useEffect } from "react";
import { ICasesSucessoProps } from './ICasesSucessoProps';
import { HandleError, CustomError, ComboBox, IComboBoxOption, Icon, MessageBar, MessageBarType, SearchBox, TextField, PanelType, Panel, Shimmer, ShimmerElementType, i18n } from "impar-digital-workplace-core-library";
import { StylingExtensionBusiness } from '../../../business/StylingExtension';
import { ICasesSucesso } from '../../../interfaces/lists/ICasesSucesso';

export default (props: ICasesSucessoProps) => {

	const bllhome = new StylingExtensionBusiness(props);

	const [item, setItem] = useState<ICasesSucesso[]>([null, null, null, null]);
	const [error, setError] = useState<string>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const loadItems = async () => {
		try {
			const items: ICasesSucesso[] = await bllhome.getCases();
			setItem(items);
		} catch (error) {
            setError(HandleError(error));
		}
        setLoading(true);
	};

	useEffect(() => {
		loadItems();
	}, []);

    let ret:JSX.Element;

    if (error) {
        ret = <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>;
    } else if (item.length === 0) {
        ret = <MessageBar>{i18n('BeneficiosEmpty')}</MessageBar>;
    } else {
        ret = (
            <div className="DWContainer">
                {item.map((link) => {
                    return (
                        <div className="DWItem">
                            <Shimmer isDataLoaded={link !== null} width="100%" shimmerElements={shimmerElements} styles={{
                                root: {
                                    height: "100%"
                                },
                                dataWrapper: {
                                    height: "100%"
                                }
                            }}>
                                {
                                    link &&
                                        <div className="DWContent" style={loading ? { pointerEvents: "none"} : {}}>
                                            
                                                {
                                                    link && link.icon &&
                                                        <img src={link && link.icon} />
                                                }
                                           
                                            <div className="texts">
                                                <h2>{link.title}</h2>
                                                <h3>{link.description}</h3>
                                            </div>
                                        </div>
                                }
                            </Shimmer>
                        </div>
                    );
                })}
            </div>
        );
    }

	return (
		<>
			<div className="DWWrapper DWCustom DWCasesSucesso">
				{ret}
			</div>
		</>
	);
};

const shimmerElements = [
	{ type: ShimmerElementType.line, height: 100, width: '100%' },
];


