<template>
  <q-layout>
    <q-header class="bg-yellow-5 shadow-6 q-py-sm">
      <q-toolbar>
        <q-avatar>
          <img
            src="~assets/campuscash-logo.png"
            alt="CampusCash Logo"
          >
        </q-avatar>

        <q-toolbar-title class="knewave">Campus Cash</q-toolbar-title>

        <q-btn
          class="unbounded"
          label="Semester Sale 💣"
          color="purple-10"
          rounded
          @click="notifySale"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition
          enter-active-class="control animated slideInRight"
          leave-active-class="control animated slideOutLeft"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>

    <LogoutHandler />
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import LogoutHandler from "components/LogoutHandler.vue";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "MainLayout",

  components: {
    LogoutHandler,
  },

  setup() {
    const $q = useQuasar();

    const notifySale = () => {
      $q.notify({
        message: "Log In and check out all the back to school offers now!",
        progress: true,
        classes: ["unbounded"],
      });
    };

    return {
      notifySale,
    };
  },
});
</script>

<style lang="sass">
.knewave
  font-family: 'Unbounded', sans-serif
  font-weight: bold
  color: #f93366
.unbounded
  font-family: Unbounded, sans-serif
body::-webkit-scrollbar-track
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3)
  background-color: #F5F5F5
body::-webkit-scrollbar
  width: 10px
  background-color: #F5F5F5
body::-webkit-scrollbar-thumb
  background-color: #000000
  border: 2px solid #555555
.control
  animation-duration: 1s
  border: 3px solid #001D3D
body
  background: #e29d30
</style>
