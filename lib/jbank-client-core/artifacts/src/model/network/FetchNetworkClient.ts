import {StringMap} from "./Type"
import {NetworkClient, NetworkMethod, NetworkRequest, NetworkResponse} from "./NetworkClient";

export class FetchNetworkClient implements NetworkClient {

    get(request: NetworkRequest): Promise<NetworkResponse> {
        return this.process(request)
    }

    process(request: NetworkRequest): Promise<NetworkResponse> {
	    return new Promise((resolve, reject) => {
		    fetch(request.getComposedUrl(), {
                method: FetchNetworkClient.getMethodFor(request),
                headers: request.headers,
                body: request.body
            })
            .then((response) => {
                response.text().then((text) => {
                    FetchNetworkClient.responseReceived(response, text, resolve)
                })
            })
            .catch((error) => reject(error))
        })
    }

    private static getMethodFor(request: NetworkRequest) {
        switch (request.getMethod()) {
            case NetworkMethod.GET: return "GET";
            case NetworkMethod.POST: return "POST";
            case NetworkMethod.DELETE: return "DELETE";
            case NetworkMethod.PUT: return "PUT";
        }
    }

    static responseReceived(response: Response, responseText: string, resolve) {
        const headers: StringMap<string> = {};
        response.headers.forEach(((key, value) => { headers[key] = value }));
        resolve(new NetworkResponse(response.status, responseText, headers))
    }
}
