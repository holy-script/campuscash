<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "boot/axios";

export default defineComponent({
  name: "IndexPage",

  setup() {
    api
      .get("/")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  },
});
</script>
