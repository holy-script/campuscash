<template>
  <q-page class="text-center bg-red-5 unbounded">
    <div class="text-h3 text-indigo-7 knewave q-py-md">Shopping Feed</div>
    <div class="column items-center">
      <q-card class="q-my-md my-card bg-grey-1 shadow-up-5">
        <q-card-section>
          <q-img src="https://cdn.quasar.dev/img/mountains.jpg" />
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">
              <div class="text-h6">Product Name</div>
              <div class="text-subtitle2">Posted By</div>
            </div>

            <div class="col-auto">
              <q-btn
                color="grey-9"
                round
                flat
                icon="more_vert"
              >
                <q-menu
                  cover
                  auto-close
                >
                  <q-list>
                    <q-item clickable>
                      <q-item-section>Discussion</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Private Chat</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Share</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </div>

          <div class="q-my-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions class="justify-evenly">
          <q-btn
            rounded
            push
            padding="sm"
            color="green"
            icon-right="add_shopping_cart"
            @click="cartCount++"
          >Add to Cart</q-btn>
          <q-btn
            rounded
            push
            padding="sm"
            color="blue"
            icon-right="visibility"
          >View</q-btn>
          <q-btn
            rounded
            push
            padding="sm"
            color="red"
            icon-right="favorite"
          >Wishlist</q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <q-page-sticky
      position="top-right"
      :offset="[18, 18]"
    >
      <q-btn
        id="logout"
        color="purple-14"
      >
        <q-icon
          :name="`img:${iconCart}`"
          size="md"
        />
        <q-badge color="orange-7">{{ cartCount }}</q-badge>
      </q-btn>
    </q-page-sticky>
    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn
        color="yellow-8"
        text-color="black"
        label="Add Listing"
        @click="showAdder = true"
        push
        rounded
      />
    </q-page-sticky>
    <q-dialog
      v-model="showAdder"
      persistent
      transition-show="slide-up"
      transition-hide="slide-down"
      class="unbounded"
    >
      <q-card class="bg-pink-6 text-white">
        <q-bar>
          <q-space />
          <q-btn
            dense
            flat
            icon="close"
            v-close-popup
          >
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">Add a Product</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import iconCart from "assets/icons/icons8-add-shopping-cart-100.png";

export default defineComponent({
  name: "DashboardPage",

  setup() {
    const cartCount = ref(0);
    const showAdder = ref(false);

    return {
      iconCart,
      cartCount,
      showAdder,
    };
  },
});
</script>

<style lang="sass">
.my-card
  width: 100%
  max-width: 800px
</style>
