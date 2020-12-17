import { IStore, NodeJSStoreOptions } from '../shared';

// NodeJS Store
export class Store implements IStore<any> {
  public storage: any;

  constructor(opts?: NodeJSStoreOptions) {
    const uri = opts?.uri || 'DEFAULT URI';
    this.storage = { uri };
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
}

export default Store;
