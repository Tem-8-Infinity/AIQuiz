import { create } from 'zustand';
import zukeeper from 'zukeeper';
import { getUserData } from '../services/user.services';

const useUserStore = create(((set) => ({
  user: null,
  setUser: (user) => set({ user }),
})));

window.store = useUserStore;
export default useUserStore;
