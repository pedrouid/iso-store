import { safeJsonParse, safeJsonStringify } from 'safe-json-utils';

import { IStore } from './types';

export class Store implements IStore {
  public storage: Storage | undefined;

  public async init(): Promise<any> {
    if (typeof window?.localStorage !== 'undefined') {
      this.storage = window.localStorage;
    }
    return;
  }

  public async set<T = any>(key: string, value: T): Promise<void> {
    if (typeof this.storage === 'undefined')
      throw new Error('localStorage is not available');
    const item = safeJsonStringify(value);
    if (typeof item !== 'string')
      throw new Error(`Couldn't stringify value for key: ${key}`);
    this.storage.setItem(key, item);
  }

  public async get<T = any>(key: string): Promise<T | undefined> {
    if (typeof this.storage === 'undefined')
      throw new Error('localStorage is not available');
    const item = this.storage.getItem(key);
    if (!item) throw new Error(`Couldn't get value for key: ${key}`);
    const value = safeJsonParse(item);
    return value;
  }

  public async delete(key: string): Promise<void> {
    if (typeof this.storage === 'undefined')
      throw new Error('localStorage is not available');
    this.storage.removeItem(key);
  }
}
