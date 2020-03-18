import { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';

export const SET = 'SET';
export const SET_ERROR = 'SET_ERROR';
export const CALL = 'CALL';
export const DELETE = 'DELETE';

export interface dataAction {
  type: 'SET' | 'SET_ERROR' | 'CALL';
  payload?: any;
}

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export interface responseTypes extends AxiosResponse {
  data: Array<User>;
}

export interface dataState {
  response: responseTypes;
  error: AxiosError;
  loading: boolean;
}

export const initData = { response: null, error: null, loading: false };

export default (state: dataState = initData, action: dataAction): dataState => {
  switch (action.type) {
    case CALL:
      return { ...state, loading: true, error: null, response: null };
    case SET:
      const response: AxiosResponse = action.payload;
      return { ...state, response, error: null, loading: false };
    case SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        response: null
      };
    default:
      return state;
  }
};
