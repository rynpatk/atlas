import create from 'zustand';

import createCoreSlice from './createCoreSlice';

const useStore = create((set, get) => ({
  ...createCoreSlice(set, get),
}));

export default useStore;
