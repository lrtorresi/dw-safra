import * as React from 'react';
import { createContext, useState, useEffect } from 'react';
import { AuthenticationResult, InteractionRequiredAuthError, PublicClientApplication } from '@azure/msal-browser';
import { ITokenContext } from './ITokenContext';
import { sp, Spinner, SpinnerSize } from 'impar-digital-workplace-core-library';
// import { Loading } from '@components';
export const TokenContext = createContext<ITokenContext>({} as ITokenContext);

export function TokenContextApi(props) {

    const logPost = async (title: string, error: string) => {
        await sp.web.lists.getByTitle("Log").items.add({
            Title: title,
            Log: error
          })
            .then((response) => console.log("response: ", response))
            .catch((error) => console.log("error: ", error))
    }
    
    const  config  = props.props;

    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState<AuthenticationResult>({
        authority: '',
        uniqueId: '',
        tenantId: '',
        scopes: [],
        account: null,
        idToken: '',
        idTokenClaims: {},
        accessToken: '',
        fromCache: false,
        expiresOn: null,
        tokenType: '',
        correlationId: '',
        extExpiresOn: new Date(),
        state: '',
        familyId: '',
        cloudGraphHostName: '',
        msGraphHost: ''
    });
    async function requestAccessToken() {
        
      
        console.warn('<<< SharePoint Request Access Token >>> ');
        const msalConfig = {
            auth: {
                authority: `https://login.microsoftonline.com/${props.tenantId}`,
                clientId: props.clientId,
                redirectUri: props.portalirhPage,
                navigateToLoginRequestUrl: true,
                postLogoutRedirectUri: "/"
            },
            system: {
                iframeHashTimeout: 10000,
            },
            cache: {
                cacheLocation: "sessionStorage", // This configures where your cache will be stored
                storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
            },
        };
        const myMSALObj = new PublicClientApplication(msalConfig);
        //const msalInstance = new UserAgentApplication(msalConfig);
        const silentRequest = {
            scopes: [`api://${props.clientId}/user_impersonation`],
            loginHint: config.pageContext.user.loginName
        };
        try{
    
            const accessTokenRequest  = {
                scopes: [`api://${props.clientId}/user_impersonation`],
                account: myMSALObj.getAllAccounts()[0]
            };
    
            logPost('Account: ', JSON.stringify(myMSALObj.getAllAccounts()[0]));
            logPost('LoginHint: ', JSON.stringify(config.pageContext.user.loginName));
    
            try {
                myMSALObj
                .handleRedirectPromise()
                .then(async (response) => {
                    console.warn('<<< myMSALObj.handleRedirectPromise >>>');
                    logPost('myMSALObj: ', JSON.stringify(myMSALObj.handleRedirectPromise()));
    
                    if (response !== null) {
                        setToken(response);
                        setLoading(false);
                        return;
                    }
        
                    const _token = await myMSALObj.ssoSilent(silentRequest);
    
                    if (_token){
                        console.warn('<<< myMSALObj.ssoSilent >>>');
                        setToken(_token);
                        logPost('TOKEN: ', JSON.stringify(_token));
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    console.error('handleRedirectPromise Error >>>>>>', error);
                    logPost('ERROR 01: ', JSON.stringify(error));
                    logPost('myMSALObj ERROR: ', JSON.stringify(myMSALObj.handleRedirectPromise()));
    
                    // Request for Access Token
                    myMSALObj
                    .acquireTokenSilent(accessTokenRequest)
                    .then((accessTokenResponse) => {
                        console.warn('<<< myMSALObj.acquireTokenSilent >>>');
                        if (accessTokenResponse !== null) {
                            setToken(accessTokenResponse);
                            setLoading(false);
                            return;
                        }
                    })
                    .catch((error) => {
                        // call acquireTokenPopup in case of acquireTokenSilent failure
                        // due to consent or interaction required
        
                        console.warn('<<< acquireTokenPopup in case of acquireTokenSilent failure >>> Error >>>>>>', error);
                        logPost('ERROR 02: ', JSON.stringify(accessTokenRequest) + " - " + JSON.stringify(error));
        
                        // if (error.errorCode === "consent_required"
                        // || error.errorCode === "interaction_required"
                        // || error.errorCode === "login_required") {
    
                        myMSALObj
                        .acquireTokenPopup(accessTokenRequest)
                        .then((accessTokenResponse) => {
                            console.warn('<<< acquireTokenPopup response >>>');
                            
                            if (accessTokenResponse !== null) {
                                setToken(accessTokenResponse);
                                setLoading(false);
                                return;
                            }
        
                        })
                        .catch((error) => {
                            console.error('acquireTokenPopup Error >>>>>>> ', error);
                            logPost('ERROR 03: ', JSON.stringify(accessTokenRequest) + " - " + JSON.stringify(error));
                            const request = {
                                scopes: ["User.Read"]
                            }
                            myMSALObj.loginRedirect(request);
                        });
                    });
                });
            } 
            catch (silentError) {
                console.error('Request Access Token ERROR >>>>>>>>>> ', silentError);
                logPost('ERROR 04: ', JSON.stringify(silentError));
                setLoading(false);
            }
        }
        catch(e){
            logPost('Error exc!', JSON.stringify(e));
        }
    }

    const value: ITokenContext = {
        token,
        refreshToken,
        clientContext: config
    };

    function refreshToken() {
        requestAccessToken();
    }

    useEffect(() => {
        requestAccessToken();
    }, []);

    // useEffect(() => {
    //     if(token.accessToken){
    //         const teamsfx = new TeamsFx();
    //         logPost('accessToken: ', JSON.stringify(token.accessToken));
    //         teamsfx.setSsoToken(token.accessToken);
    //     }
        
    // }, [token]);

    return (
        <>
            {
                loading ? (
                    <div style={{padding: '50px'}}>
                        <Spinner size={SpinnerSize.large} />
                    </div>
                ) : (
                    <TokenContext.Provider value={value} >
                        <>
                            {props.children}
                        </>
                    </TokenContext.Provider>
                )
            }
        </>
    );
}