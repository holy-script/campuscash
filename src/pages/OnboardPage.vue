<template>
  <q-page class="unbounded">
    <q-carousel
      v-model="slide"
      transition-prev="jump-right"
      transition-next="jump-left"
      swipeable
      animated
      control-color="indigo"
      control-type="push"
      navigation
      padding
      arrows
      height="100vh"
      class="bg-blue-5 text-white"
      @before-transition="dismiss"
    >
      <q-carousel-slide
        name="intro"
        class="column no-wrap flex-center"
      >
        <div class="q-pa-md q-ma-md text-center absolute-center">
          <div class="text-h5">
            Need to sell or buy stuff you'll need as a student?<br>
            <div class="q-mt-sm">Connect to others like you who are eager to trade, now!</div><br>
            Finish onboading to start browsing 😉
          </div>
        </div>
        <div class="wrapper">
          <p><span class="bg-pink-5"></span></p>
          <p><span class="bg-pink-5"></span></p>
        </div>
      </q-carousel-slide>
      <q-carousel-slide
        name="style"
        class="column no-wrap flex-center"
      >
        <div class="q-pa-md q-ma-md">
          <div class="text-center text-h6">Create Avatar</div>
          <div class="flex row">
            <q-avatar
              rounded
              size="8rem"
              color="grey"
              class="q-mt-lg q-mb-lg"
              id="avatar"
            >
              <img :src="svg">
            </q-avatar>
            <div class="q-pa-lg flex flex-center column">
              <q-btn
                no-caps
                push
                color="yellow"
                text-color="primary"
                label="Change Avatar"
                @click="designer"
              />
              <q-btn
                class="q-mt-lg"
                no-caps
                push
                color="teal-6"
                text-color="white"
                :label="acc == 100 ? 'Accessories On' : 'Accessories Off'"
                @click="toggler"
              />
            </div>
          </div>
        </div>
        <div class="q-pa-md q-ma-md">
          <div class="text-center text-h6">Email Verification</div>
          <div class="q-mb-lg text-center">
            <EmailVerifier />
          </div>
        </div>
        <div id="scroll-container">
          <div id="scroll-text">
            Here, you'll be able to create a profile and connect with other users within the community. They can follow each other, see each other's listings, and engage in conversations about the items they're buying or selling.
          </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide
        name="outro"
        class="column no-wrap flex-center"
      >
        <div class="q-pa-md q-ma-md text-center">
          <div class="q-mt-lg q-mb-lg text-h6">
            <span v-if="nameVal">Pleasure getting to know you, {{ nameVal }}!<br><span class="text-h4">✌</span></span>
            <span v-else>
              Hello there! Please fill up a few deets for us to setup your account. <span class="text-h4">✍</span>
            </span>
          </div>
          <q-btn
            v-if="nameVal"
            push
            color="positive"
            text-color="white"
            label="Open Dashboard"
            @click="finisher"
          />
          <q-btn
            v-else
            push
            color="orange"
            text-color="white"
            label="Press Here"
            @click="profileName"
          />
        </div>
      </q-carousel-slide>
    </q-carousel>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useStore } from "stores/app";
import { api } from "src/boot/axios";
import { createAvatar } from "@dicebear/core";
import { bigSmile } from "@dicebear/collection";
import EmailVerifier from "components/EmailVerifier.vue";

export default defineComponent({
  name: "OnboardPage",
  components: {
    EmailVerifier,
  },
  setup() {
    const slide = ref("intro");
    const nameVal = ref("");
    const ageVal = ref("");
    const acc = ref(100);
    const $q = useQuasar();
    const store = useStore();
    let styling;
    let notifOpen = false;
    const props = {
      skinColor: [
        "8c5a2b",
        "643d19",
        "a47539",
        "c99c62",
        "e2ba87",
        "efcc9f",
        "f5d7b1",
        "ffe4c0",
      ],
      hair: [
        "shortHair",
        "mohawk",
        "wavyBob",
        "bowlCutHair",
        "curlyBob",
        "straightHair",
        "braids",
        "shavedHead",
        "bunHair",
        "froBun",
        "bangs",
        "halfShavedHead",
        "curlyShortHair",
      ],
      hairColor: [
        "3a1a00",
        "220f00",
        "238d80",
        "605de4",
        "71472d",
        "d56c0c",
        "e2ba87",
        "e9b729",
      ],
      eyes: [
        "cheery",
        "normal",
        "confused",
        "starstruck",
        "winking",
        "sleepy",
        "sad",
        "angry",
      ],
      mouth: [
        "openedSmile",
        "unimpressed",
        "gapSmile",
        "openSad",
        "teethSmile",
        "awkwardSmile",
        "braces",
        "kawaii",
      ],
      accessories: [
        "catEars",
        "glasses",
        "sailormoonCrown",
        "clownNose",
        "sleepMask",
        "sunglasses",
        "faceMask",
        "mustache",
      ],
    };
    const router = useRouter();

    onMounted(() => {
      if (store.onboarded) {
        $q.notify({
          message: "Already completed this step, moving to dashboard...",
          timeout: 1500,
          progress: true,
          color: "dark",
        });
        router.push({
          name: "Dashboard",
        });
      }
    });

    const createOptions = (optArr, cur) => {
      let options = {
        accessoriesProbability: acc.value,
        backgroundColor: ["6d28d9", "c026d3"],
        backgroundType: ["gradientLinear"],
      };
      for (let key in optArr) {
        if (cur == key) {
          optArr[key].push(optArr[key].shift());
        }
        if (optArr["hair"][0] == "froBun" || optArr["hair"][0] == "bunHair") {
          options["translateY"] = 10;
        } else {
          options["translateY"] = 0;
        }
        options[key] = [optArr[key][0]];
      }
      return options;
    };
    const svg = ref(
      createAvatar(bigSmile, createOptions(props)).toDataUriSync()
    );

    const styleAvatar = (notifs) => {
      let shifted = notifs[0];
      styling = $q.notify({
        multiLine: true,
        message: `Choose your ${notifs
          .shift()
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase())}:`,
        timeout: 0,
        position: "bottom",
        color: "dark",
        group: false,
        classes: ["unbounded center"],
        onDismiss: () => {
          notifOpen = false;
        },
        actions: [
          {
            label: "MORE",
            noDismiss: true,
            handler: () => {
              shifted = notifs[0];
              notifs.length > 1
                ? styling({
                    message: `Choose your ${notifs
                      .shift()
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}:`,
                  })
                : styling({
                    message: `Choose your ${notifs
                      .shift()
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}:`,
                    actions: [
                      {
                        label: "DONE",
                        noDismiss: false,
                      },
                      {
                        label: "NEXT",
                        noDismiss: true,
                        handler: () => {
                          svg.value = createAvatar(
                            bigSmile,
                            createOptions(props, shifted)
                          ).toDataUriSync();
                        },
                      },
                    ],
                  });
            },
          },
          {
            label: "NEXT",
            noDismiss: true,
            handler: () => {
              svg.value = createAvatar(
                bigSmile,
                createOptions(props, shifted)
              ).toDataUriSync();
            },
          },
        ],
      });
    };

    const designer = () => {
      if (!notifOpen) {
        styleAvatar(Object.keys(props));
      }
      notifOpen = true;
    };

    const dismiss = (newPane, oldPane) => {
      if (oldPane == "style" && styling) {
        styling({
          actions: [],
          message: "Come back if you need any changes!",
          progress: true,
          timeout: 1000,
        });
      }
    };

    const toggler = () => {
      if (acc.value == 100) {
        acc.value = 0;
        svg.value = createAvatar(
          bigSmile,
          createOptions(props)
        ).toDataUriSync();
      } else {
        acc.value = 100;
        svg.value = createAvatar(
          bigSmile,
          createOptions(props)
        ).toDataUriSync();
      }
    };

    const profileName = () => {
      let aboutName = $q.notify({
        message: "Feel free to use your first name, full name or a nickname!",
        timeout: 0,
        color: "dark",
        position: "bottom",
        classes: ["unbounded"],
      });
      $q.dialog({
        dark: true,
        title: "Create Profile",
        message: "What can we call ya?",
        class: "unbounded",
        prompt: {
          filled: true,
          model: nameVal,
          maxLength: 15,
          type: "text",
          isValid: (val) =>
            /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g.test(val),
        },
        cancel: true,
        persistent: true,
      })
        .onOk((data) => {
          console.log("Name:", data);
          profileAge();
        })
        .onDismiss(() => {
          aboutName();
        });
    };

    const profileAge = () => {
      let aboutAge = $q.notify({
        message: "For demographic purposes only :)",
        timeout: 0,
        color: "dark",
        position: "bottom",
        classes: ["unbounded"],
      });
      $q.dialog({
        dark: true,
        title: "Create Profile",
        message: "What is your age?",
        class: "unbounded",
        prompt: {
          filled: true,
          model: ageVal,
          maxLength: 3,
          type: "number",
          isValid: (val) => val > 0 && val < 100,
        },
        persistent: true,
      })
        .onOk((data) => {
          console.log("Age:", data);
        })
        .onDismiss(() => {
          aboutAge();
        });
    };

    const finisher = () => {
      if (nameVal.value && ageVal.value) {
        api
          .post("/api/onboard", {
            name: nameVal.value,
            age: parseInt(ageVal.value),
            profile: createOptions(props),
          })
          .then((res) => {
            store.onboard();
            $q.notify({
              message: res.data.message,
              timeout: 1500,
              progress: true,
              color: "dark",
            });
            router.push({
              name: "Dashboard",
            });
          })
          .catch(
            (err) =>
              $q.notify(err.response.data.message) &&
              console.log(err.response.status)
          );
      } else {
        $q.notify({
          message: "Please finish setting up your profile first...",
          timeout: 1500,
          progress: true,
          color: "dark",
        });
      }
    };

    return {
      slide,
      svg,
      designer,
      dismiss,
      toggler,
      acc,
      profileName,
      nameVal,
      finisher,
    };
  },
});
</script>

<style lang="sass">
.center
  text-align: center
  div
    div
      justify-content: space-around !important
#avatar
  border: 1px solid black

.wrapper
  --size: 250px
  position: absolute
  width: var(--size)
  height: var(--size)
  top: 30%
  left: 50%
  margin: calc(var(--size) / -2)

  span
    position: absolute
    border-radius: 50%
    display: inline-block

  p
    position: absolute
    top: 50%
    left: 50%

  p:nth-child(1)
    position: absolute
    animation: skewing-child .2s ease-in-out infinite alternate

    span
      width: calc(var(--size) / 10)
      height: calc(var(--size) / 10)
      margin: calc(var(--size) / -20)
      animation: moving 2s cubic-bezier(.97,.01,.12,.99) infinite alternate

  p:nth-child(2)
    position: absolute
    animation: squishing 1s ease-in-out infinite alternate

    span
      width: calc(var(--size) / 4)
      height: calc(var(--size) / 4)
      top: 50%
      left: 50%
      margin: calc(var(--size) / -8)
      animation: skewing 2s 1.5s ease-in-out infinite

@keyframes skewing
  0%
    transform: skewX(6deg)
  10%
    transform: skewX(-6deg)
  20%
    transform: skewX(4deg)
  30%
    transform: skewX(-4deg)
  40%
    transform: skewX(2deg)
  50%
    transform: skewX(-6deg)
  55%
    transform: skewX(6deg)
  60%
    transform: skewX(-5deg)
  65%
    transform: skewX(5deg)
  70%
    transform: skewX(-4deg)
  75%
    transform: skewX(4deg)
  80%
    transform: skewX(-3deg)
  85%
    transform: skewX(3deg)
  90%
    transform: skewX(-2deg)
  95%
    transform: skewX(2deg)
  100%
    transform: skewX(1deg)

@keyframes skewing-child
  0%
    transform: skewX(-10deg)
  100%
    transform: skewX(10deg)

@keyframes moving
  0%
    transform: translate(calc(var(--size) / -2.5))
  30%
    transform: translate(calc(var(--size) / -10))
  70%
    transform: translate(calc(var(--size) / 10))
  100%
    transform: translate(calc(var(--size) / 2.5))

@keyframes squishing
  10%, 40%, 80%
    transform: scale(1, .9)
  0%, 30%, 60%, 100%
    transform: scale(.9, 1)

#scroll-container
  border: 3px solid black
  overflow: hidden
  width: 100%
  background: yellow
  display: flex

#scroll-text
  flex-shrink: 0
  text-align: right
  color: black

  /* animation properties */
  -moz-transform: translateX(-100%)
  -webkit-transform: translateX(-100%)
  transform: translateX(-100%)

  -moz-animation: scroller 15s linear infinite reverse
  -webkit-animation: scroller 15s linear infinite reverse
  animation: scroller 15s linear infinite reverse

/* for Firefox */
@-moz-keyframes scroller
  from
  -moz-transform: translateX(-100%)
  to
  -moz-transform: translateX(100%)

/* for Chrome */
@-webkit-keyframes scroller
  from
  -webkit-transform: translateX(-100%)
  to
  -webkit-transform: translateX(100%)

@keyframes scroller
  from
    -moz-transform: translateX(-100%)
    -webkit-transform: translateX(-100%)
    transform: translateX(-100%)

  to
    -moz-transform: translateX(100%)
    -webkit-transform: translateX(100%)
    transform: translateX(100%)
</style>
