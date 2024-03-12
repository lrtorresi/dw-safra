export default class SessionStorageSupport {
    public getStoredData (storageId): any {
        return JSON.parse(sessionStorage.getItem(storageId));
    }

    public setStoredData (storageId, data): void {
        sessionStorage.setItem(storageId, JSON.stringify(data));
    }
}