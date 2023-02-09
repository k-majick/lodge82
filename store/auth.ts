import { defineStore } from 'pinia';

interface User {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
}

interface IAuthState {
  user: null | User;
  token: null | string;
}

export const useAuthStore = defineStore({
  id: 'auth-store',
  state: (): IAuthState => ({
    user: null,
    token: null,
  }),
  actions: {
    async registerUser(user: User) {
      try {
        const res = fetch('/.netlify/functions/users/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              this.setUser(data.token, data.user);
            }
            return data;
          });

        return res;
      } catch (e) {
        console.error(e);
      }
    },

    async authenticateUser(user: User) {
      try {
        const res = fetch('/.netlify/functions/users/authenticate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              this.setUser(data.token, data.user);
            }
            return data;
          });

        return res;
      } catch (e) {
        console.error(e);
      }
    },

    async getProfile() {
      try {
        const res = fetch('/.netlify/functions/users/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.token as string,
          },
        })
          .then(res => res.json())
          .then(data => data.user);

        return res;
      } catch (e) {
        console.error(e);
      }
    },

    setUser(token: string | null, user: User | null) {
      this.token = token;
      this.user = user;
    },
  },
  getters: {
    currentUser: state => state.user,
  },
});
