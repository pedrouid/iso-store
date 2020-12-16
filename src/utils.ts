import {
  NodeJSStoreOptions,
  ReactNativeStoreOptions,
  StoreOptions,
} from './types';

export function isReactNativeStorageOptions(
  opts: StoreOptions
): opts is ReactNativeStoreOptions {
  return 'asyncStorage' in opts;
}

export function isNodeJSStoreOptions(
  opts: StoreOptions
): opts is NodeJSStoreOptions {
  return 'uri' in opts;
}
