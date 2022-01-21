import { NetworkRequest } from './NetworkClient';

export interface RequestFactory {
  make(params?: any): Promise<NetworkRequest>;
}
