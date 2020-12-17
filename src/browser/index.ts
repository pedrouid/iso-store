import localStorage from 'localStorage';
import { safeJsonParse, safeJsonStringify } from 'safe-json-utils';

import { IStore } from '../shared';

// Browser Store
export class Store implements IStore<Storage> {
  public storage = localStorage;

  get length(): number {
    return this.storage.length;
  }

  public async init(): Promise<void> {}

  public async set<T = any>(key: string, value: T): Promise<void> {
    const item = safeJsonStringify(value);
    this.storage.setItem(key, item);
  }

  public async get<T = any>(key: string): Promise<T | undefined> {
    const item = this.storage.getItem(key);
    if (item === null) return undefined;
    const value = safeJsonParse(item);
    return value;
  }

  public async del(key: string): Promise<void> {
    this.storage.removeItem(key);
  }
}

export default Store;
