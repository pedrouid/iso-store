import Store from '../src';

export const TEST_NODE_JS_OPTIONS = {
  database: ':memory:',
};

describe('IsoStore', () => {
  it('set & get', async () => {
    const key = 'yolo';
    const value = { data: true };
    const store = new Store(TEST_NODE_JS_OPTIONS);
    await store.init();
    await store.set(key, value);
    const result = await store.get<typeof value>(key);
    if (typeof result === 'undefined') throw new Error('result is undefined');
    expect(result).toBeTruthy();
    expect(result.data).toEqual(value.data);
  });
});
