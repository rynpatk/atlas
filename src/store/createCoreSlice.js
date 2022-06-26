const createCoreSlice = (set) => ({
  activeTool: 'open',
  setActiveTool: (tool) => {
    set((prev) => ({ activeTool: prev.activeTool === tool ? null : tool }));
  },
});

export default createCoreSlice;
