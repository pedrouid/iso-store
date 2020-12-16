import Store from '../src';
import MockAsyncStorage from './mock/asyncstorage';

describe('IsoStore', () => {
  it('init', async () => {
    const store = new Store();
    await store.init();
    expect(store).toBeTruthy();
  });
  it('browser', async () => {
    const key = 'yolo';
    const value = { data: true };
    const store = new Store();
    await store.init();
    await store.set(key, value);
    const result = await store.get<typeof value>(key);
    if (typeof result === 'undefined') throw new Error('result is undefined');
    expect(result).toBeTruthy();
    expect(result.data).toEqual(value.data);
  });
  it('react-native', async () => {
    const key = 'yolo';
    const value = { data: true };
    const store = new Store('react-native', {
      asyncStorage: new MockAsyncStorage(),
    });
    await store.init();
    await store.set(key, value);
    const result = await store.get<typeof value>(key);
    if (typeof result === 'undefined') throw new Error('result is undefined');
    expect(result).toBeTruthy();
    expect(result.data).toEqual(value.data);
  });
});
