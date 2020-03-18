import './style.css';
import React, { ReactElement } from 'react';
import ReactDom from 'react-dom';
import createSagaMiddleware from '@redux-saga/core';
import promiseMiddleware from 'redux-promise-middleware';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './app';
import sagas from './sagas';
import reducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(promiseMiddleware, sagaMiddleware)
);

sagaMiddleware.run(sagas);

ReactDom.render<{ component: ReactElement; target: any }>(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// "allowJs": true,
// "skipLibCheck": true,
// "esModuleInterop": true,
// "allowSyntheticDefaultImports": true,
// "strict": true,
// "forceConsistentCasingInFileNames": true,
// "module": "esnext",
// "moduleResolution": "node",
// "resolveJsonModule": true,
// "isolatedModules": true,
// "noEmit": true
