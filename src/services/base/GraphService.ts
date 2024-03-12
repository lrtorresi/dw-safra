import { MSGraphClient, MSGraphClientFactory } from "@microsoft/sp-http";

export default class GraphService {
    public static GetGraphData(url: string, msGraphClientFactory: MSGraphClientFactory){
        return new Promise<any>((resolve, reject) => {
            msGraphClientFactory.getClient()
            .then((client: MSGraphClient) => {
                client
                .api(url)
                .header('Prefer','outlook.timezone="E. South America Standard Time"')
                .get()
                .then(results => {
                    resolve(results);
                })
                .catch(error => {
                    reject(error);
                });
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    public static PostGraphData(url: string, body: any, msGraphClientFactory: MSGraphClientFactory){
        return new Promise<any>((resolve, reject) => {
            msGraphClientFactory.getClient()
            .then((client: MSGraphClient) => {
                client
                .api(url)
                .header('Prefer','outlook.timezone="E. South America Standard Time"')
                .post(body)
                .then(results => {
                    resolve(results);
                })
                .catch(error => {
                    reject(error);
                });
            })
            .catch(error => {
                reject(error);
            });
        });
    }
    
    public static GetGraphParallelData(urls: string[], msGraphClientFactory: MSGraphClientFactory){
        return new Promise((resolve, reject) => {
            const body = { requests: urls.map((url, index) => {
                return {
                    id: index,
                    method: "GET",
                    url: url,
                    headers: {
                      'Prefer': 'outlook.timezone="E. South America Standard Time"'
                    }
                };
            }) };
    
            msGraphClientFactory.getClient()
            .then((client: MSGraphClient) => {
                client
                .api('/$batch')
                .header('Prefer', 'outlook.timezone="E. South America Standard Time"')
                .post(body)
                .then(results => {
                    resolve(results);
                })
                .catch(error => {
                    reject(error);
                });
            })
            .catch(error => {
                reject(error);
            });
        });
    }
    
    public static GetBETAGraphParallelData(urls: string[], msGraphClientFactory: MSGraphClientFactory){
      return new Promise((resolve, reject) => {
          const body = { requests: urls.map((url, index) => {
              return {
                  id: index,
                  method: "GET",
                  url: url,
                  headers: {
                    'Prefer': 'outlook.timezone="E. South America Standard Time"'
                  }
              };
          }) };
    
          msGraphClientFactory.getClient()
          .then((client: MSGraphClient) => {
              client
              .api('/$batch')
              .version('beta')
              .header('Prefer', 'outlook.timezone="E. South America Standard Time"')
              .post(body)
              .then(results => {
                  resolve(results);
              })
              .catch(error => {
                  reject(error);
              });
          })
          .catch(error => {
              reject(error);
          });
      });
    }
    
    public static getGraphThumbnail(url: string){
        let base64 = btoa(url);
        let paddedString = base64.replace(/=/g, '').replace('/', '_').replace('+', '-');
        let docId = "u!" + paddedString;
        return "/shares/" + docId + "/driveitem/thumbnails";
    }
}

