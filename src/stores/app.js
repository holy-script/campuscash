import { defineStore } from "pinia";

export const useStore = defineStore("main", {
  state: () => ({
    loggedIn: false,
    verified: false,
    onboarded: false,
  }),
  getters: {},
  actions: {
    logIn(user) {
      this.loggedIn = true;
      this.verified = user.verified;
      this.onboarded = user.onboarded;
    },
    logOut() {
      this.loggedIn = false;
      this.verified = false;
      this.onboarded = false;
    },
    verify() {
      this.verified = true;
    },
    onboard() {
      this.onboarded = true;
    },
  },
});
