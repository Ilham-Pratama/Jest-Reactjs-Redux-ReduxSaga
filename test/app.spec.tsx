import React from 'react';
import { mount } from 'enzyme';
import {
  SET_ERROR as SET_ERROR_ACTION,
  SET as SET_ACTION
} from '../app/actions/data';
import { fetchSource, actionWatcher, axiosGet } from '../app/sagas';
import { Info, ErrorMessage, Item } from '../app/components/Info';
import { takeLatest, put } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import {
  thisButton as Button,
  ConfiguredButton,
  LoadingFeedback
} from '../app/components/Button';
import data, {
  initData,
  SET,
  CALL,
  SET_ERROR,
  User
} from '../app/reducers/data';
import { AxiosResponse } from 'axios';
const axios = require('axios');

const response = {
  data: [],
  config: {},
  headers: {},
  request: {},
  statusText: 'OK',
  status: 200
};

const items: User[] = [
  {
    id: 0,
    name: 'Simulated User',
    username: 'Simulated Username',
    email: 'Simulated Email',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: ''
      }
    },
    phone: '',
    website: '',
    company: { name: '', catchPhrase: '', bs: '' }
  }
];

const errorResponse = {
  config: {},
  isAxiosError: false,
  toJSON: () => ({}),
  name: 'Simulated Error',
  message: 'Simulated Error'
};

const buttonProps = {
  loading: false,
  CALL: () => {},
  data: initData
};

describe('Button Component', () => {
  it('Tests initial props', () => {
    const component = mount(<Button {...buttonProps} />);
    const button = component.find(ConfiguredButton);
    const loadingFeedback = component.find(LoadingFeedback);
    expect(button.prop('disabled')).toBeFalsy();
    expect(loadingFeedback.exists()).toBeFalsy();
  });
  it('Tests wheter the button is disabled when response is not set', () => {
    const data = { ...initData, response };
    const component = mount(<Button {...buttonProps} data={data} />);
    const button = component.find(ConfiguredButton);
    expect(button.prop('disabled')).toBeTruthy();
  });
  it('Tests wheter the feedack is returned when loading', () => {
    const component = mount(<Button {...buttonProps} loading={true} />);
    const loadingFeedback = component.find(LoadingFeedback);
    expect(loadingFeedback.exists()).toBeTruthy();
  });
});

describe('Info Component', () => {
  it('Tests initial component state', () => {
    const component = mount(<Info data={{ ...initData }} />);
    const item = component.find(Item);
    const errorMessage = component.find(ErrorMessage);
    expect(errorMessage.exists()).toBeFalsy();
    expect(item.exists()).toBeFalsy();
  });
  it('Tests wheter the error message appears when an error occurs', () => {
    const component = mount(
      <Info data={{ ...initData, error: errorResponse }} />
    );
    const item = component.find(Item);
    const errorMessage = component.find(ErrorMessage);
    expect(errorMessage.exists()).toBeTruthy();
    expect(item.exists()).toBeFalsy();
  });
  it('Tests wheter the items appears when the items are available', () => {
    const component = mount(
      <Info data={{ ...initData, response: { ...response, data: items } }} />
    );
    const item = component.find(Item);
    const errorMessage = component.find(ErrorMessage);
    expect(errorMessage.exists()).toBeFalsy();
    expect(item.exists()).toBeTruthy();
  });
});

describe('Data Reducer', () => {
  it('Sets SET', () => {
    const initialState = data(initData, { type: SET, payload: response });
    expect(initialState).toEqual({ ...initData, response });
  });
  it('Sets CALL', () => {
    const initialState = data(initData, { type: CALL });
    expect(initialState).toEqual({ ...initData, loading: true });
  });
  it('Sets SET_ERROR', () => {
    const initialState = data(initData, {
      type: SET_ERROR,
      payload: errorResponse
    });
    expect(initialState).toEqual({ ...initData, error: errorResponse });
  });
});

describe('Saga Reducer', () => {
  const fakeResult: AxiosResponse = {
    status: 1,
    data: [],
    statusText: '1',
    headers: '',
    config: {}
  };
  const genActionWatcher = cloneableGenerator(actionWatcher)();
  const genFetchSource_SUCCEED = cloneableGenerator(fetchSource)(fakeResult);
  const genFetchSource_FAIL = cloneableGenerator(fetchSource)(undefined);
  it('Tests function actionWatcher', () => {
    const actionWatcherClone = genActionWatcher.clone();
    expect(actionWatcherClone.next().value).toEqual(
      takeLatest('CALL', axiosGet)
    );
    expect(actionWatcherClone.next().done).toBeTruthy();
  });
  it('Tests function fetchSource succeed', () => {
    const fetchSourceClone = genFetchSource_SUCCEED.clone();
    expect(fetchSourceClone.next().value).toEqual(put(SET_ACTION(fakeResult)));
    expect(fetchSourceClone.next().done).toBeTruthy();
  });
  it('Tests function fetchSource fail', () => {
    const fetchSourceClone = genFetchSource_FAIL.clone();
    expect(fetchSourceClone.next().value).toEqual(
      put(SET_ERROR_ACTION(undefined))
    );
    expect(fetchSourceClone.next().done).toBeTruthy();
  });
});
