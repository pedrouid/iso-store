import localStorage from 'localStorage';
import { safeJsonParse, safeJsonStringify } from 'safe-json-utils';

import { IStorage } from '../types';

export class BrowserStorage implements IStorage<Storage> {
  public store = localStorage;

  get length(): number {
    return this.store.length;
  }

  public async init(): Promise<void> {}

  public async set<T = any>(key: string, value: T): Promise<void> {
    const item = safeJsonStringify(value);
    this.store.setItem(key, item);
  }

  public async get<T = any>(key: string): Promise<T | undefined> {
    const item = this.store.getItem(key);
    if (item === null) return undefined;
    const value = safeJsonParse(item);
    return value;
  }

  public async del(key: string): Promise<void> {
    this.store.removeItem(key);
  }
}
