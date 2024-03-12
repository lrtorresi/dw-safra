import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp } from "@pnp/sp";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import axios from "axios";
import { format } from "date-fns";
import pt from "date-fns/locale/pt-BR";

export const sortArrayObject = (arr, itemArray) => {
	return arr.sort((a, b) => {
		if (a[itemArray] > b[itemArray]) {
			return 1;
		}
		if (a[itemArray] < b[itemArray]) {
			return -1;
		}
		return 0;
	});
};

export const removeDuplicateArrayObj = (
	array: any[],
	itemFilter: string
): any => {
	const result = array.reduce((acc, current) => {
		const x = acc.find((item) => item[itemFilter] === current[itemFilter]);
		if (!x) {
			return acc.concat([current]);
		} else {
			return acc;
		}
	}, []);
	return result;
};

export const formatDate = (str): string => {
	return format(new Date(str), "dd/MM/yyyy", {
		locale: pt,
	});
};

export const formatDateCustom = (str: string, date: string): string => {
	return format(new Date(str), date, {
		locale: pt,
	});
};

export const formatDateTime = (str): string => {
	return format(new Date(str), "dd/MM/yyyy hh:mm", {
		locale: pt,
	});
};

export const getIdFromUrlParam = (propertyId: string): number | null => {
	let Id: number = null;
	if (propertyId) {
		Id = Number(propertyId);
		if (isNaN(Id)) {
			const urlParams = new URLSearchParams(window.location.search);
			Id = Number(urlParams.get(propertyId));
		}
	}
	return Id;
};

export const getUrlParameter = (sParam) => {
	var sPageURL = window.location.search.substring(1),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
		}
	}
	return false;
};

export const capitalize = (s) => {
	if (typeof s !== 'string') return '';
	return s.charAt(0).toUpperCase() + s.slice(1);
};

export const getFavIcon = (baseUrl): string => {
	return 'http://s2.googleusercontent.com/s2/favicons?domain_url=' + baseUrl.substring(baseUrl.indexOf('//') + 2);
};

export const getFileExtension = (fileName: string): string => {
	if (!fileName)
		return '';
	let arrName = fileName.trim().split('.');
	if (arrName.length > 1)
		return arrName[arrName.length - 1];
	else
		return '';
};

export const getHubUrl = async (context: WebPartContext | ApplicationCustomizerContext, onlyPath: boolean = false): Promise<string> => {
    const key = `DWHubUrl_${context.pageContext.legacyPageContext.hubSiteId}`;
	const storedUrl = sessionStorage.getItem(key);
	if (storedUrl) {
		console.log("Getting HUB URL from storage if exists", context.pageContext);
		return storedUrl;
	}

	const hubSite = await axios.get(`/_api/HubSites/GetById?hubSiteId=${encodeURIComponent("'" + context.pageContext.legacyPageContext.hubSiteId + "'")}`);

	sessionStorage.setItem(key, hubSite.data.SiteUrl);
	return hubSite.data.SiteUrl;
};

export function isOnAdminGroup(spfxContext: WebPartContext | ApplicationCustomizerContext, listId?: number): Promise<boolean> {
	return new Promise((resolve, reject) => {
		sp.web.siteGroups.getById(listId).users.filter(`Id eq ${spfxContext.pageContext.legacyPageContext.userId}`).get()
			.then((users) => {
				resolve(users && !!users.length);
			}).catch(() => reject(false));
	});
}

export function stripAndTrim(str)
{
   let tmp = document.createElement("DIV");
   tmp.innerHTML = str;
   return tmp.textContent || tmp.innerText || "";
}

export async function validateAdmin(spfxContext: WebPartContext | ApplicationCustomizerContext) {
	try {
		sp.setup({ spfxContext });
		let admin = false;
		const ownersGroupId = (await sp.web.associatedOwnerGroup()).Id;
		const membersGroupId = (await sp.web.associatedMemberGroup()).Id;
		const res1 = await isOnAdminGroup(spfxContext, ownersGroupId);
		const res2 = await isOnAdminGroup(spfxContext, membersGroupId);
		admin = res1 || res2;
		return admin;
	} catch (error) {
		console.log("validateAdmin ERROR:", error.message);
	}
}

export function getGraphThumbnail(url: string) {
	let base64 = btoa(url);
	let paddedString = base64.replace(/=/g, '').replace('/', '_').replace('+', '-');
	let docId = "u!" + paddedString;
	return "/shares/" + docId + "/driveitem/thumbnails";
}

export function SPGetBlob(url: string, context: WebPartContext): Promise<any> {
	try {
		return new Promise((resolve, reject) => {
			context.spHttpClient.get(url, SPHttpClient.configurations.v1)
				.then((response: SPHttpClientResponse) => {
					response.blob()
						.then((blob: Blob) => {
							resolve(blob);
						})
						.catch(err => {
							reject(err);
						});

				})
				.catch(err => {
					reject(err);
				});
		});
	}
	catch {

	}
}

export function GetHtmlContentFromFile(url: string, context: WebPartContext): Promise<any> {
	return new Promise((resolve, reject) => {
		SPGetBlob(url, context)
			.then((blob: Blob) => {
				var reader = new FileReader();

				reader.onload = (x) => {
					resolve(reader.result);
				};

				reader.onerror = (err) => {
					reject(err);
				};

				reader.readAsText(blob);
			});
	});
}