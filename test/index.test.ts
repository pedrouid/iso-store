import BrowserStore from '../src/browser';
import ReactNativeStore from '../src/react-native';
import MockAsyncStorage from './mock/asyncstorage';

describe('IsoStore', () => {
  it('browser', async () => {
    const key = 'yolo';
    const value = { data: true };
    const store = new BrowserStore();
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
    const store = new ReactNativeStore({
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
