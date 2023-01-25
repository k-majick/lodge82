import { defineStore } from 'pinia';

interface User {
  id?: string,
  name?: string,
  username?: string,
  email?: string,
  password?: string,
}

interface IAuthState {
  user: null | User,
  token: null | string
}

export const useAuthStore = defineStore({
  id: 'auth-store',
  state: (): IAuthState => ({
    user: null,
    token: null,
  }),
  actions: {
    async authenticateUser(user: User) {
      try {
        const res = fetch("/.netlify/functions/users/authenticate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              this.setUser(data.token, data.user);
            }
            return data.msg;
          });

        return res;
      } catch (e) {
        console.error(e);
      }
    },

    setUser(token: string, user: User) {
      this.token = token;
      this.user = user;
    },

    getters: {
      currentUser: state => state.user,
    },    
  },
});