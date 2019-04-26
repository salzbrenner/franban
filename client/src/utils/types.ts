import { AnyAction, Dispatch } from 'redux';

const standardAction: any = () => {};

type StandardAction = {
  [s: string]: (
    args: any
  ) => (
    dispatch: Dispatch<AnyAction>,
    getState: Function
  ) => any;
};
