export type THeaders = {
  [key: string]: string;
}

export type TRequest = {
  address: string;
  path: string;
  options: RequestInit;
}

export type TErrorResponse = {
  status: number;
  statusText: string;
  body?: any;
}

export type TRefreshData = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}
