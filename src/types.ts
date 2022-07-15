export interface Response {
    data:       Data;
    status:     number;
    statusText: string;
    headers:    WelcomeHeaders;
    config:     Config;
    request:    Request;
}

export interface Config {
    transitional:      Transitional;
    transformRequest:  null[];
    transformResponse: null[];
    timeout:           number;
    xsrfCookieName:    string;
    xsrfHeaderName:    string;
    maxContentLength:  number;
    maxBodyLength:     number;
    env:               Env;
    headers:           ConfigHeaders;
    method:            string;
    url:               string;
}

export interface Env {
    FormData: null;
}

export interface ConfigHeaders {
    Accept: string;
}

export interface Transitional {
    silentJSONParsing:   boolean;
    forcedJSONParsing:   boolean;
    clarifyTimeoutError: boolean;
}

export interface Data {
    count:    number;
    next:     string;
    previous: null;
    results:  Result[];
}

export interface Result {
    name?: string;
    url?:  string;
}

export interface WelcomeHeaders {
    "cache-control": string;
    "content-type":  string;
}

export interface Request {
}

export interface SubmitData{
    searchTerm:string;
}
export interface Details {
    abilities?:AbilityElement[];
    img?: string;
    type?: Type[];
}

export interface AbilityElement {
    ability:   TypeClass;
    is_hidden: boolean;
    slot:      number;
}

export interface TypeClass {
    name: string;
    url:  string;
}

export interface Type {
    slot: number;
    type: TypeClass;
}


export interface MyProps{
    details: DisplayInfo;
    changeShown: () =>void;
}
export type DisplayInfo = Details & Result;