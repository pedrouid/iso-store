import { safeJsonParse, safeJsonStringify } from 'safe-json-utils';

import { IAsyncStorage, IStorage } from '../types';

export class ReactNativeStorage implements IStorage<IAsyncStorage> {
  constructor(public store: IAsyncStorage) {}

  get length(): number {
    return this.store.size();
  }

  public async init(): Promise<void> {}

  public async set<T = any>(key: string, value: T): Promise<void> {
    const item = safeJsonStringify(value);
    await this.store.setItem(key, item);
  }

  public async get<T = any>(key: string): Promise<T | undefined> {
    const item = await this.store.getItem(key);
    if (item === null) return undefined;
    const value = safeJsonParse(item);
    return value;
  }

  public async del(key: string): Promise<void> {
    await this.store.removeItem(key);
  }
}
