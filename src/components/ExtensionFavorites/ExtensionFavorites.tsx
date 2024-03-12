import * as React from 'react';
import {  Icon, MessageBar, MessageBarType, Shimmer, ShimmerElementsGroup, ShimmerElementType, i18n, getFavIcon } from "impar-digital-workplace-core-library";
import './ExtensionFavorites.scss';
import { favoriteModes, IFavorite, IFavoriteItem } from '../../interfaces/lists/IFavorite';
import Favorites from '../Favorites/Favorites';

export default ({data, loading = false, boxTitle = "", error = "", showCallToAction = false, customClass = "", context}: IGraphComponentProps) => {

    let ret: JSX.Element;

    if (error) {
        ret = <MessageBar messageBarType={MessageBarType.error} className="hubItemMessageBar">{error}</MessageBar>;
    } else if (data.length === 0) {
        ret = <MessageBar className="hubItemMessageBar">{i18n('FavoritesEmpty')}</MessageBar>;
    } else {
        ret = (
            <div className="favoritesContainer">
                {!error && data.map(({name, url, dummy}:IFavoriteItem) => {
                    return (
                         <a className="favoriteItem" href={url} target="_blank" data-interception="off" style={loading ? {pointerEvents: "none"} : {}} title={name}>
                             {url && <img src={getFavIcon(url)} title={name} />}
                        </a>
                    );
                })}
            </div>
        );
    }

    return (
        <div className={`${customClass} DWFavoritesComponent`}>
            {boxTitle && <h4>{boxTitle}</h4>}
            <Favorites props={context} title="Favoritos" mode={favoriteModes.Home} id={'CalloutBarra'} />
        </div>
    );
};