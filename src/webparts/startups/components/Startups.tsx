import * as React from 'react';
import { useEffect, useState } from 'react';
import './Startups.scss';
import { IStartupsProps } from './IStartupsProps';
import { IStartups } from '../../../interfaces/lists/IStartups';
import { HandleError, CustomError, ComboBox, IComboBoxOption, Icon, MessageBar, MessageBarType, SearchBox, TextField, PanelType, Panel, Shimmer, ShimmerElementType, i18n } from "impar-digital-workplace-core-library";
import { StylingExtensionBusiness } from '../../../business/StylingExtension';

export default (props: IStartupsProps) => {

	const bllhome = new StylingExtensionBusiness(props);

	const [item, setItem] = useState<IStartups[]>(new Array(8).fill({}));
	const [benefitsItemSelected, setBenefitsItemSelected] = useState<IStartups>(null);
	const [error, setError] = useState<string>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [showPanel, setShowPanel] = useState<boolean>(false);

	const loadItems = async () => {
		try {
			const items: IStartups[] = await bllhome.getBenefits();
			setItem(items);
		} catch (error) {
            setError(HandleError(error));
		}
        setLoading(true);
	};

	const handlePanel = (item?: IStartups) => {
		setBenefitsItemSelected(item ? item : null);
		setShowPanel(!showPanel);
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
                        <a className="DWItem" onClick={(e) => {
                            e.preventDefault();
                            handlePanel(link);
                        }}>
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
                                        <div className="DWContent" style={loading ? { pointerEvents: "none", backgroundColor: 'white' } : {}}>
                                            <span className="DWIconSetaDireita"></span>
                                            <div className="circle">
                                                {
                                                    link && link.icon ? 
                                                        <img src={link && link.icon} />
                                                    :
                                                        // <span className="DWIconBeneficios"></span>
                                                        <img src={require('./imgDefault.png')} />
                                                }
                                            </div>
                                            <div className="texts">
                                                <h4>{link.title}</h4>
                                                <h5>{link.description}</h5>
                                            </div>
                                        </div>
                                }
                            </Shimmer>
                        </a>
                    );
                })}
            </div>
        );
    }

	return (
		<>
			<div className="DWWrapper DWCustom DWStartups">
				{ret}
			</div>
			<Panel isOpen={showPanel} onDismiss={() => handlePanel()} isLightDismiss={true} type={PanelType.medium}>
                <div className={"DWWrapper DWCustom DWStartupsPanel"}>
                    <div className="DWZoneTitle">
                        <div className="texts">
                            <h4>{benefitsItemSelected && benefitsItemSelected.title}</h4>
                        </div>
                    </div>
                    {benefitsItemSelected && <div className="dangerousText" dangerouslySetInnerHTML={{ __html: benefitsItemSelected.resume }}/>}
                </div>
			</Panel>
		</>
	);
};

const shimmerElements = [
	{ type: ShimmerElementType.line, height: 100, width: '100%' },
];

