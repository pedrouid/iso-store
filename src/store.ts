import { IStorage, IStore, StoreOptions } from './types';
import { isNodeJSStoreOptions, isReactNativeStorageOptions } from './utils';
import { BrowserStorage, ReactNativeStorage, NodeJSStorage } from './storage';

export class Store implements IStore {
  public storage: IStorage;

  constructor(type?: string, opts?: StoreOptions) {
    this.storage = this.setStorage(type, opts);
  }

  get length(): number {
    return this.storage.length;
  }

  public async init(): Promise<void> {
    this.storage.init();
  }

  public async set<T = any>(key: string, value: T): Promise<void> {
    return this.storage.set(key, value);
  }

  public async get<T = any>(key: string): Promise<T | undefined> {
    return this.storage.get(key);
  }

  public async del(key: string): Promise<void> {
    return this.storage.del(key);
  }

  // ----- Private ------------------------------------------ //

  private setStorage(type?: string, opts?: StoreOptions): IStorage {
    if (typeof type === 'undefined') {
      return new BrowserStorage();
    }
    switch (type) {
      case 'browser':
        return new BrowserStorage();
      case 'react-native':
        if (typeof opts === 'undefined') {
          throw new Error('Store options required for React-Native');
        }
        if (!isReactNativeStorageOptions(opts)) {
          throw new Error('Invalid store optiosn for React-Native');
        }
        return new ReactNativeStorage(opts.asyncStorage);
      case 'node-js':
        if (typeof opts === 'undefined') {
          throw new Error('Store options required for NodeJS');
        }
        if (!isNodeJSStoreOptions(opts)) {
          throw new Error('Invalid store optiosn for NodeJS');
        }
        return new NodeJSStorage(opts.uri);
      default:
        throw new Error(`Unsupported store type: ${type}`);
    }
  }
}
