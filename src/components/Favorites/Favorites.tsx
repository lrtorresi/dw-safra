import * as React from "react";
import { useState, useEffect, useCallback, ReactNode } from "react";
import { FavoriteBusiness } from "../../business/FavoriteBusiness";
import { IFavorite, IFavoriteItem, favoriteModes } from "../../interfaces/lists/IFavorite";
import "./Favorites.scss";
import {
    Callout,
    Stack,
    TextField,
    ITextFieldStyles,
    DirectionalHint,
    MessageBar,
    MessageBarType,
    CustomError,
    getFavIcon,
    getHubUrl,
    HandleError,
    Icon,
    i18n
} from "impar-digital-workplace-core-library";

interface IFavoritesProps {
    title: string;
    mode: favoriteModes;
    props: any;
    id?: string;
}

enum CalloutModes {
    hover = "HOVER",
    click = "CLICK",
    closed = "CLOSED"
}

const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: "100%", borderRadius: 5, borderColor: "#E9E9E9", color: "#605D5D", outline: "none" } };
const narrowTextFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: "100%", borderRadius: 5, borderColor: "#E9E9E9", color: "#605D5D", outline: "none" } };
const stackTokens = { childrenGap: 15 };

export default (props: IFavoritesProps) => {
    const [favorites, setFavorites] = useState<IFavoriteItem[]>([]);
    const [calloutMode, setCalloutMode] = useState<CalloutModes>(CalloutModes.closed);
    const [error, setError] = useState<string>('');
    const [userError, setUserError] = useState<string>('');
    const [newFavoriteName, setNewFavoriteName] = useState<string>('');
    const [newFavoriteUrl, setNewFavoriteUrl] = useState<string>('');
    const [favoriteItemIndex, setFavoriteItemIndex] = useState<number>(null);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [closeTimeout, setCloseTimeout] = useState<number>(null);
    const [bllFavorites, setBllFavorites] = useState(null);

    const onChangeFirstTextFieldValue = useCallback((event, newValue?: string) => { setNewFavoriteName(newValue || ''); }, []);
    const onChangeSecondTextFieldValue = useCallback((event, newValue?: string) => { setNewFavoriteUrl(newValue || ''); }, []);
    
    const loadFavorites = async () => {
        let bllFavoritesAux = bllFavorites;
        if (!bllFavoritesAux) {
            const siteHub = await getHubUrl(props.props.context);
            bllFavoritesAux = new FavoriteBusiness(props.props, siteHub);
            setBllFavorites(bllFavoritesAux);
        }
        
        try {
            const userFavorite : IFavorite = await bllFavoritesAux.getFavoriteFromCurrentUser();
            setFavorites(bllFavoritesAux.getParsedJsonFavorites(userFavorite));
            setCalloutMode(CalloutModes.closed);
            setNewFavoriteUrl("");
            setNewFavoriteName("");
            setError("");
            setLoading(false);
        } catch (error) {
            setError(HandleError(error));
        }
    };

    useEffect(() => {
        loadFavorites();
    }, []);

    const handleUserErrors = () => {
        if (!newFavoriteName || !newFavoriteUrl) {
            setUserError(i18n("FavoritesEmptyError"));
            return false;
        }

        if (!bllFavorites.validateUrl(newFavoriteUrl)) {
            setUserError(i18n("FavoritesInvalidUrlError") + newFavoriteUrl);
            return false;
        }

        return true;
    };

    const createFavorite = async (e: any, ) => {        
        e.preventDefault();

        try {
            if (!handleUserErrors())
                return false;
            setLoading(true);
            setCalloutMode(CalloutModes.closed);
            setFavorites([...favorites, {url:"", name:"", dummy: true} as IFavoriteItem]);
            await bllFavorites.addFavoriteToCurrentUser({
                name: newFavoriteName,
                url: newFavoriteUrl
            });
            loadFavorites();
        } catch (error) {
            setError(HandleError(error));
        }
    };

    const editFavorite = async (e: any, favoriteIndex: number) => {
        e.preventDefault();

        try {
            if (!handleUserErrors())
                return false;
            setLoading(true);
            setCalloutMode(CalloutModes.closed);
            await bllFavorites.editFavoriteFromCurrentUser({
                name: newFavoriteName,
                url: newFavoriteUrl
            }, favoriteIndex);
            loadFavorites();
        } catch (error) {
            setError(HandleError(error));
        }
    };

    const removeFavorite = async (e:any, favoriteIndex: number) => {
        const item = e.target.parentElement;
        item.className += " loadingOpacityAnimation";
        e.preventDefault();
        e.stopPropagation();
        setLoading(true);

        try {
            await bllFavorites.removeFavoriteFromCurrentUserById(favoriteIndex);
            item.className = "DWItemWrapper";
            loadFavorites();
        } catch (error) {
            setError(HandleError(error));
        }
    };

    const startCallout = (e, favoriteItem: IFavoriteItem = null, favoriteIndex: number = null, hover:boolean = false) => {
        e.preventDefault();
        clearTimeout(closeTimeout);
        setCloseTimeout(null);

        // Stop hovering callouts when a click callout is open.
        if (hover && calloutMode === CalloutModes.click)
            return;

        // If editing else creating
        if (favoriteItem && favoriteIndex !== null) {
            setFavoriteItemIndex(favoriteIndex);
            setNewFavoriteName(favoriteItem.name);
            setNewFavoriteUrl(favoriteItem.url);
            setError(favoriteItemIndex !== null ? error : "");
        } else {
            setFavoriteItemIndex(null);
            setNewFavoriteName(favoriteItemIndex !== null ? "" : newFavoriteName);
            setNewFavoriteUrl(favoriteItemIndex !== null ? "" : newFavoriteUrl);
            setError(favoriteItemIndex !== null ? "" : error);
        }

        setCalloutMode(hover ? CalloutModes.hover : CalloutModes.click);
    };

    const dismissCallout = () => {
        setCalloutMode(CalloutModes.closed);
        setUserError("");
    };

    const handleMouseLeave = () => {
        if (calloutMode === CalloutModes.hover)
            dismissCallout();
    };

    const _getCalloutTemplate = () : ReactNode => {
        const item:IFavoriteItem = favorites[favoriteItemIndex];
        const name:string = item ? item.name : "";
        const url:string = item ? item.url : "";

        switch (calloutMode) {
            case CalloutModes.hover:
                if (editMode)
                    return (
                        <div className="editText">
                            <span>{name}</span>
                            <Icon iconName="Edit"/>
                        </div>
                    );
                else
                    return (
                        <div className="viewText">
                            <span>{name}</span>
                            <Icon iconName="Link"/>
                        </div>
                    );
            case CalloutModes.click:
                return (
                    <Stack tokens={stackTokens} styles={{root:{width:200}}}>
                        <form onSubmit={(e) => favoriteItemIndex !== null ? editFavorite(e, favoriteItemIndex) : createFavorite(e)}>
                            <TextField
                                autoFocus
                                label={i18n("FavoritesNameLabel")}
                                value={newFavoriteName}
                                onChange={onChangeFirstTextFieldValue}
                                styles={textFieldStyles}
                                maxLength={100}
                            />
                            <TextField
                                label={i18n("FavoritesUrlLabel")}
                                value={newFavoriteUrl}
                                onChange={onChangeSecondTextFieldValue}
                                styles={narrowTextFieldStyles}
                            />

                            {userError ? 
                            <>
                                <hr/>
                                <MessageBar
                                    messageBarType={MessageBarType.error}
                                    isMultiline={true}
                                >
                                    {userError}
                                </MessageBar>
                            </> : ""}

                            <hr></hr>

                            <button type="submit" className="saveButton">
                                {i18n("FavoritesConfirm")}
                            </button>
                        </form>
                    </Stack>
                );
        }
    };

    return (
        <>
            <div className="DWFavorites">
                <div className="DWContainer">
                    {
                        error &&
                            <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>
                    }

                    {
                        favorites.length === 0 && !editMode && !loading &&
                            <MessageBar>{i18n("FavoritesEmpty")}</MessageBar>
                    }
                    <div className={`DWSubContainer ${editMode ? "edit" : ""}`}>
                        {!error && favorites.map((fav, i) => {
                            return (
                                <div className="DWItemWrapper">
                                    <a
                                        className={`DWItem ${fav.dummy ? " loadingOpacityAnimation" : ""}`}
                                        data-index={i}
                                        onClick={(e) => editMode ? startCallout(e, fav, i) : null}
                                        onMouseOver={(e) => startCallout(e, fav, i, true)}
                                        onMouseLeave={() => handleMouseLeave()}
                                        data-interception="off"
                                        href={editMode ? "#" : fav.url}
                                        target="_blank"
                                        title={editMode ? i18n("FavoritesEdit") : ""}
                                    >
                                        <img src={fav.dummy ? "" : getFavIcon(fav.url)}></img>
                                        {
                                            props.mode == favoriteModes.Workspace &&
                                                <h6>{fav.name}</h6>
                                        }
                                    </a>
                                    {
                                        editMode &&
                                            <Icon iconName="ErrorBadge" className="closeButton" onClick={(e) => removeFavorite(e, i)} title={i18n("FavoritesRemove")}/>
                                    }
                                </div>
                            );
                        })}

                        {!error && editMode && 
                            <div className={"addButton" + (loading ? " loadingOpacityAnimation" : "")} onClick={(e) => startCallout(e)} title={i18n("FavoritesAdd")}>
                                <Icon iconName="Add" />
                                {
                                    props.mode == favoriteModes.Workspace &&
                                    <h6>{i18n("FavoritesAdd")}</h6>  
                                }
                            </div>
                        }
                    </div>

                    {
                        !error &&
                            <div className="editButton" onClick={() => editMode ? setEditMode(false) : setEditMode(true)} title={i18n("FavoritesAllowEdit")}>
                                { editMode ? <Icon iconName="CalculatorMultiply" /> : <Icon iconName="Edit" /> }
                            </div>
                    }
                    
                </div>
            </div>
            {
                calloutMode !==  CalloutModes.closed &&
                    <Callout
                        className="FavoritesCallout"
                        id={props.id}
                        ariaLabelledBy={"label"}
                        ariaDescribedBy={"desc"}
                        role="alertdialog"
                        gapSpace={3}
                        target={favoriteItemIndex !== null ? `a[data-index="${favoriteItemIndex}"]` : `.addButton`}
                        onDismiss={() => dismissCallout()}
                        preventDismissOnResize={true}
                        directionalHint={DirectionalHint.bottomCenter}
                        onMouseEnter={() => {
                            clearTimeout(closeTimeout);
                            setCloseTimeout(null);
                        }}
                        onMouseLeave={() => handleMouseLeave()}
                    >
                        <div>
                            {_getCalloutTemplate()}
                        </div>
                    </Callout>
            }
        </>
    );
};