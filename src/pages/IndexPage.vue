<template>
  <q-page>
    <AuthHandler />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "boot/axios";
import AuthHandler from "components/AuthHandler.vue";

export default defineComponent({
  name: "IndexPage",

  components: {
    AuthHandler,
  },

  setup() {
    api
      .get("/")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  },
});
</script>
