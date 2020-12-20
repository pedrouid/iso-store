import { IKeyValueStorage } from 'keyvaluestorage';

export abstract class IStore {
  public abstract storage: IKeyValueStorage;
  public abstract init(): Promise<any>;
  public abstract set<T = any>(key: string, value: T): Promise<void>;
  public abstract get<T = any>(key: string): Promise<T | undefined>;
  public abstract del(key: string): Promise<void>;
}
