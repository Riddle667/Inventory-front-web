export interface ResponseAPI {
    success?: boolean;
    message?: string;
    data?: unknown;
    errors?: Error[];
    error?: string;
}

export interface Error {
    type: string;
    value: string;
    msg: string;
    path: string;
    location: string;
}

