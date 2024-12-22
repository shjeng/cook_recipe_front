import User from "../types/interface/user.interface";
import {create} from "zustand/react";

interface LoginStore {
    loginUser: User | null,
    setLoginUser: (loginUser: User) => void,
    resetLoginUser: () => void
}

const useLoginStore = create<LoginStore>((set) => ({
    loginUser: null,
    setLoginUser: (loginUser: User) => set((state) => ({ ...state, loginUser })),
    resetLoginUser: () => set((state) => ({ ...state, loginUser: null })),
}));

export default useLoginStore;