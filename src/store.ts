import localStorage from 'localStorage';
import { safeJsonParse, safeJsonStringify } from 'safe-json-utils';

import { IStore } from './types';

export class Store implements IStore {
  private storage: Storage = localStorage;

  public async init(): Promise<void> {
    return;
  }

  public async set<T = any>(key: string, value: T): Promise<void> {
    const item = safeJsonStringify(value);
    if (typeof item !== 'string')
      throw new Error(`Couldn't stringify value for key: ${key}`);
    this.storage.setItem(key, item);
  }

  public async get<T = any>(key: string): Promise<T | undefined> {
    const item = this.storage.getItem(key);
    if (!item) throw new Error(`Couldn't get value for key: ${key}`);
    const value = safeJsonParse(item);
    return value;
  }

  public async delete(key: string): Promise<void> {
    this.storage.removeItem(key);
  }
}
