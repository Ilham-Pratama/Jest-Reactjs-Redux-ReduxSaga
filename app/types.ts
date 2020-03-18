import { dataAction, dataState } from './reducers/data';

export interface mapStateToPropsType {
  data: dataState;
}

export interface mapDispatchToPropsType {
  CALL?(): dataAction;
  SET?(): dataAction;
}
