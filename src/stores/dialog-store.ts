import { create } from "zustand";

export type DialogConfig = {
  open: boolean;
  title: string;
  description: string;
  content: React.ReactNode;
};

interface DialogConfigState {
  dialogConfig: DialogConfig | undefined;
  setDialogConfig: (dialogConfig: DialogConfig | undefined) => void;
}

const useDialogConfigStore = create<DialogConfigState>()((set) => ({
  dialogConfig: undefined,
  setDialogConfig: (dialogConfig) => set(() => ({ dialogConfig })),
}));

export default useDialogConfigStore;
