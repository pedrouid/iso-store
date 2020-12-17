import { IAsyncStorage } from '../react-native/asyncstorage';

export abstract class IBaseStore {
  public abstract length: number;
  public abstract init(): Promise<any>;
  public abstract set<T = any>(key: string, value: T): Promise<void>;
  public abstract get<T = any>(key: string): Promise<T | undefined>;
  public abstract del(key: string): Promise<void>;
}

export interface ReactNativeStoreOptions {
  asyncStorage: IAsyncStorage;
}

export interface NodeJSStoreOptions {
  uri: string;
}

export abstract class IStore<S = any> extends IBaseStore {
  public abstract storage: S;
  constructor(opts?: any) {
    super();
  }
}
