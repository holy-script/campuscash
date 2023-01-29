<template>
  <q-page class="text-center bg-red-5 unbounded">
    <div class="text-h3 text-indigo-7 knewave q-py-md">Shopping Feed</div>
    <div class="column items-center">
      <q-card
        v-for="(prod, index) in products"
        :key="index"
        class="q-my-md my-card bg-grey-1 shadow-up-5"
      >
        <q-card-section>
          <q-img :src="prod.image" />
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">
              <div class="text-h6">{{ prod.name }}</div>
              <div class="text-subtitle2">Posted By <span
                  style="border-radius: 17px;"
                  class="bg-pink q-px-md"
                >{{ prod.creator }}</span></div>
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
            {{ prod.about }}
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

    const products = [
      {
        name: "Basics of Calculus 7th Edition (Good Condition)",
        creator: "bobbydoesmath@calc.edu",
        about:
          "In almost a brand new state, the Basics of Calculus Simplified (For Std 11th and 12th Science, Commerce and Arts) by Target Publications is an extensively compiled handbook. The prime objective here is to introduce the subject of Calculus among junior college students in the most lucid manner in order to impart fundamental knowledge and strengthen their concept base. The idea during the compilation process of this book was to offer students with a new and simplified perspective and dispel any apprehensions with regards to this subject. ",
        image: "https://m.media-amazon.com/images/I/71HeLjObsGL.jpg",
      },
      {
        name: "Lenovo V15 Intel Celeron (Old But Working)",
        creator: "dantheengineer@eng.edu",
        about:
          "This is a laptop I have used for 2 years, but still works just fine. Processor & Memory: Intel, Celeron_B830, Celeron N4020, 1.1 GHz, 4GB RAM, RAM Expandable up to 0GB. Lenovo’s story has always been about shaping computing intelligence to create a better world. With the world’s widest portfolio of technology products, we deliver our vision of Smarter Technology for All through products, solutions, software, and services that individuals, communities, businesses, and entire populations need to fulfill their potential.",
        image:
          "https://m.media-amazon.com/images/I/41f0zShABaL._SY300_SX300_QL70_FMwebp_.jpg",
      },
      {
        name: "(Used But Excellent Condition) LCD Display Digital Multi-meter Digital Multimeter",
        creator: "prof@robot.edu",
        about:
          "This is my own personal tool that I have maintained really well. Small multimeter for your day to day needs. If you have basic knowledge about multimeters you can try this small multimeter for basic continuity checks and voltage measurements. When testing the current more than 200ma, connect the red test lead to oadc jack and black test lead to com jack",
        image: "https://m.media-amazon.com/images/I/81y3KDvvgWL._SX466_.jpg",
      },
    ];

    return {
      iconCart,
      cartCount,
      showAdder,
      products,
    };
  },
});
</script>

<style lang="sass">
.my-card
  width: 100%
  max-width: 800px
</style>
