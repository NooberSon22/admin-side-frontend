import { create } from "zustand";

const folderStore = create((set) => ({
  selectedFolder: {},
  setSelectedFolder: (folder) => set({ selectedFolder: folder }),
  resetSelectedFolder: () => set({ selectedFolder: {} }),
}));

export default folderStore;
