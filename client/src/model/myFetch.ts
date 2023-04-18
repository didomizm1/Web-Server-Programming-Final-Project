const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/v1/';

// REST API fetch functionality
export function rest(url: string, data?: any, method?: string, headers?: any){
    return fetch(url, {
        method: method ?? (data ? 'POST' : 'GET'),
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: data ? JSON.stringify(data) : undefined,
    })
        .then(res => res.ok 
            ? res.json() 
            : res.json().then(x=> { throw({ ...x, message: x.error }) } )
        );
}

export function api(url: string, data?: any, method?: string, headers?: any){
    return rest(API_URL + url, data, method, headers);
}

// Data envelopes
export type DataEnvelope<T> = {
    data: T,
    isSuccess: boolean,
    error?: string,
}

export type DataListEnvelope<T> = DataEnvelope<T[]> & {
    total: number,
}