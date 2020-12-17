import { safeJsonParse, safeJsonStringify } from 'safe-json-utils';

import { IStore, ReactNativeStoreOptions } from '../shared';
import { IAsyncStorage } from './asyncstorage';

// React-Native Store
export class Store implements IStore<IAsyncStorage> {
  public storage: IAsyncStorage;
  constructor(opts: ReactNativeStoreOptions) {
    this.storage = opts.asyncStorage;
  }

  get length(): number {
    return this.storage.size();
  }

  public async init(): Promise<void> {}

  public async set<T = any>(key: string, value: T): Promise<void> {
    const item = safeJsonStringify(value);
    await this.storage.setItem(key, item);
  }

  public async get<T = any>(key: string): Promise<T | undefined> {
    const item = await this.storage.getItem(key);
    if (item === null) return undefined;
    const value = safeJsonParse(item);
    return value;
  }

  public async del(key: string): Promise<void> {
    await this.storage.removeItem(key);
  }
}

export default Store;