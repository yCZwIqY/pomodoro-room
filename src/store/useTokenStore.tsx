import { create } from 'zustand';

const useTokenStore = create((set) => ({
  token: 0,
  initToken: () =>
    set(() => {
      const token = parseInt(localStorage.getItem('token')?.toString() ?? '');
      return { token: isNaN(token) ? 0 : token };
    }),
  addToken: (num) =>
    set((state) => {
      const totalToken = state.token + num;
      localStorage.setItem('token', totalToken.toString());
      return { token: totalToken };
    }),
  useToken: (num) =>
    set((state) => {
      const totalToken = state.token - num;
      localStorage.setItem('token', totalToken.toString());
      return { token: totalToken };
    })
}));

export default useTokenStore;
