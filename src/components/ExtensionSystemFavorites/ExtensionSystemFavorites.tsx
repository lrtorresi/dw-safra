import * as React from 'react';
import { Icon, MessageBar, MessageBarType, Shimmer, ShimmerElementsGroup, ShimmerElementType, i18n, getFavIcon } from "impar-digital-workplace-core-library";
import './ExtensionSystemFavorites.scss';
import { IFavorite, IFavoriteItem } from '../../interfaces/lists/IFavorite';

export default ({ data, loading = false, boxTitle = "", error = "", showCallToAction = false, customClass = "" }: IGraphComponentProps) => {

    let ret: JSX.Element;

    let dataMock = [
        {
            title: "item1",
        },
        {

            title: "item2",
        },
        {

            title: "item3",
        },
        {

            title: "item4",
        }
    ];

    if (error) {
        ret = <MessageBar messageBarType={MessageBarType.error} className="hubItemMessageBar">{error}</MessageBar>;
    } else if (data.length === 0) {
        ret = <MessageBar className="hubItemMessageBar">{i18n('FavoritesEmpty')}</MessageBar>;
    } else {
        ret = (
            <div className="systemFavoritesContainer">
                {!error && dataMock.map(({ title }) => {
                    return (
                        <div className="systemFavoriteItem">
                            <div className="icon">
                                icon
                            </div>
                            <h3 className="title">{title}</h3>
                            <div className="arrowRight">
                                &gt;
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    return (
        <div className="DWSystemFavoritesComponent">
            <div className="header">
                {boxTitle && <h4>{boxTitle}</h4>}
                <div className="penIcon">
                    lápis
                </div>
            </div>
            {ret}
        </div>
    );
};