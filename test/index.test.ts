import Store from '../src';

describe('IsoStore', () => {
  it('init', async () => {
    const store = new Store();
    await store.init();
    expect(store).toBeTruthy();
  });
});
