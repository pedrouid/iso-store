import { IAsyncStorage } from '../react-native/types';

export interface KeyValueStorage {
  init(): Promise<void>;
  close(): Promise<void>;
  getKey(...args: string[]): string; // generates a key for related subject strings
  getKeys(): Promise<string[]>;
  getEntries(): Promise<[string, any][]>;
  getItem<T = any>(key: string): Promise<T | undefined>;
  setItem<T = any>(key: string, value: T): Promise<void>;
  removeItem(key: string): Promise<void>;
}

export interface ReactNativeStoreOptions {
  asyncStorage: IAsyncStorage;
}

export interface NodeJSStoreOptions {
  uri: string;
}

export abstract class IStore {
  public abstract storage: KeyValueStorage;
  public abstract length: number;
  public abstract init(): Promise<any>;
  public abstract set<T = any>(key: string, value: T): Promise<void>;
  public abstract get<T = any>(key: string): Promise<T | undefined>;
  public abstract del(key: string): Promise<void>;
}
