import { create } from 'zustand';


interface TokenStore {
    token: number;
    initToken: () => void;
    addToken: (num: number) => void;
    useToken: (num: number) => void;
}


const useTokenStore = create<TokenStore>((set) => ({
  token: 0,
  initToken: () =>
    set(() => {
      const token = parseInt(localStorage.getItem('token')?.toString() ?? '');
      return { token: isNaN(token) ? 0 : token };
    }),
  addToken: (num: number) =>
    set((state) => {
      const totalToken = state.token + num;
      localStorage.setItem('token', totalToken.toString());
      return { token: totalToken };
    }),
  useToken: (num: number) =>
    set((state) => {
      const totalToken = state.token - num;
      localStorage.setItem('token', totalToken.toString());
      return { token: totalToken };
    })
}));

export default useTokenStore;
