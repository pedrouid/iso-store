import KeyValueStorage, {
  IKeyValueStorage,
  KeyValueStorageOptions,
} from 'keyvaluestorage';

import { IStore } from './types';

export class Store implements IStore {
  public storage: IKeyValueStorage;

  constructor(opts?: KeyValueStorageOptions) {
    this.storage = new KeyValueStorage(opts);
  }

  public async init(): Promise<void> {
    await this.storage.init();
  }

  public async set<T = any>(key: string, value: T): Promise<void> {
    this.storage.setItem(key, value);
  }

  public async get<T = any>(key: string): Promise<T | undefined> {
    return this.storage.getItem(key);
  }

  public async del(key: string): Promise<void> {
    this.storage.removeItem(key);
  }
}

export default Store;
