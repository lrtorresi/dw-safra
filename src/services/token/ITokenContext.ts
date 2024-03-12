import { AuthenticationResult } from "@azure/msal-browser";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ITokenContext{
    token: AuthenticationResult;
    refreshToken: () => void;
    clientContext: WebPartContext;
}