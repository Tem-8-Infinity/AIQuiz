import create from 'zustand';
import zukeeper from 'zukeeper';
import { getUserData } from '../services/user.services';

const useUserStore = create(zukeeper((set) => ({
  user: null,
  userData: null,
  setUser: (user) => set({ user }),
  fetchUserData: async (uid) => {
    try {
      const userData = await getUserData(uid);
      set({ userData });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
})));

window.store = useUserStore;
export default useUserStore;
