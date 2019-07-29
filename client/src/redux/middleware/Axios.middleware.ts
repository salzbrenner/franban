import { instance } from 'services/api';

const tokenInPath = () => {
  const pathname = window.location.pathname;
  if (pathname.includes('/reset-password/')) {
    return pathname.split('/').pop();
  }
  return null;
};

export function createAxiosAuthMiddleware() {
  return ({ getState }: { getState: Function }) => (
    next: Function
  ) => (action: any) => {
    const { jwt } = getState().auth;
    let token = jwt;

    if (!token && tokenInPath()) {
      token = tokenInPath();
    }

    instance.defaults.headers.common.Authorization = token
      ? `Bearer ${token}`
      : null;

    return next(action);
  };
}

export const axiosMiddleware = createAxiosAuthMiddleware();
