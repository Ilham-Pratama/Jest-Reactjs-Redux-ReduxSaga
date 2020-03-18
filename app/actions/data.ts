import { dataAction } from '../reducers/data';
import { AxiosResponse, AxiosError } from 'axios';

export const SET = (payload: AxiosResponse): dataAction => ({
  type: 'SET',
  payload
});

export const CALL = (): dataAction => ({
  type: 'CALL'
});

export const SET_ERROR = (payload: AxiosError): dataAction => ({
  type: 'SET_ERROR',
  payload
});
