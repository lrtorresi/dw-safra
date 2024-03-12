import * as React from 'react';
import './InovacaoBanner.scss';
import { useState, useEffect } from "react";
import { IInovacaoBannerProps } from './IInovacaoBannerProps';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HandleError, CustomError, createTheme, Icon, ITheme, MessageBar, MessageBarType, Shimmer, ShimmerElementType, Spinner, SpinnerSize, i18n } from "impar-digital-workplace-core-library";
import { IInovacaoBanner } from '../../../interfaces/libraries/IInovacaoBanner';
import { StylingExtensionBusiness } from '../../../business/StylingExtension';

function SampleNextArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style }}
			onClick={onClick}
		><span className="DWIconSetaDireita"></span></div>
	);
}

function SamplePrevArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style }}
			onClick={onClick}
		><span className="DWIconSetaEsquerda"></span></div>
	);
}

export default (props: IInovacaoBannerProps) => {
	const bllhome = new StylingExtensionBusiness(props);

	const [banner, setBanner] = useState<IInovacaoBanner[]>([]);
	const [error, setError] = useState<string>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const loadBanner = async () => {
		try {
			const banners: IInovacaoBanner[] = await bllhome.getPrincipalBanner(props.hasSegmentation);
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

	const settings = {
		dots: true,
		infinite: true,
		speed: props.bannerSpeed,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: props.bannerTime,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
		arrows: true,
        adaptativeHeight: true,
	};

	return (
		<div className={"DWWrapper DWCustom DWBannerPrincipalInovacao"}>
			{
				loading &&
				<Shimmer shimmerElements={[
					{ type: ShimmerElementType.line, height: 270 }
				]}></Shimmer>
			}
			{
				!loading && !error && (!banner || banner.length == 0) &&
				<MessageBar>{i18n("BannerPrincipalEmpty")}</MessageBar>
			}
			{
				!loading && error &&
				<MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>
			}
			{
				!loading && banner && banner.length > 0 &&
				<Slider {...settings}>
					{
						banner.map((item: IInovacaoBanner) =>
							<div className={`DWItems ${!item.redirectUrl && 'dwNoClick'}`}>
								<div className="imgWrapper">
									<img src={item.filePath} alt={item.title} />
								</div>
								{
									item && (item.title || item.description) &&
									<div className={"textWrapper"}>
                                        <div className="text">
                                            {item.title && <h2 title={item.title} className={item.description ? "clamp2" : "clamp3"}>{item.title}</h2>}
                                            {item.description && <h5 title={item.description} className={"clamp2"}>{item.description}</h5>}
											{item.chamada && <h6 title={item.chamada} className={"clamp3"}>{item.chamada}</h6>}
											{item.redirectUrl && <div className="linkZone"><a data-interception="off" href={item.redirectUrl ? item.redirectUrl : 'javascript:void(0);'} target={item.openNewTab ? '_blank' : '_self'}>Saiba mais</a></div>}
										</div>
									</div>
								}
								
							</div>
						)
					}
				</Slider>
			}
		</div>
	);
};

