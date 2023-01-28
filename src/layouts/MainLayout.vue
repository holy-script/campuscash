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
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <LogoutHandler />
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import LogoutHandler from "components/LogoutHandler.vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    LogoutHandler,
  },
});
</script>

<style lang="sass">
.knewave
  font-family: 'Knewave', sans-serif
  color: #f93366
</style>
