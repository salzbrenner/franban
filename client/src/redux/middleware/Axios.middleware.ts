import { instance } from 'services/api';

export function createAxiosAuthMiddleware() {
  return ({ getState }: { getState: Function }) => (
    next: Function
  ) => (action: any) => {
    const { jwt } = getState().auth;
    instance.defaults.headers.common.Authorization = jwt
      ? `Bearer ${jwt}`
      : null;
    return next(action);
  };
}

export const axiosMiddleware = createAxiosAuthMiddleware();
