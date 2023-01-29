<template>
  <q-page>
    <div class="full-height full-height">
      <div class="row">
        <div class="hero-section col-12 col-md-4 bg-black text-white unbounded relative-position">
          <div
            id="heroText"
            class="text-h3"
          >
            Connect with like-minded individuals in your community
            <div class="text-h6 q-mt-md">The perfect platform for university students to connect, meet up and trade!</div>
            <AuthHandler />
          </div>
        </div>
        <div class="hero-section col-12 col-md-8 lemon-bg q-py-xl text-center">
          <div
            id="yellowBubble"
            class="inset-shadow-down"
          ></div>
          <q-img
            :src="heroImg"
            alt="Dancing Man"
            width="256px"
          />
        </div>
      </div>
      <div class="row">
        <div class="feature-section col-12 col-md-5 bg-white relative-position unbounded">
          <div id="subText">
            <div class="text-h6 text-purple-4 relative-position">
              BROWSE NEW OFFERS!
              <div
                class="absolute-center full-width text-purple-10"
                id="shadeText"
              >
                BROWSE NEW OFFERS!
              </div>
            </div>
            <div class="text-h5 text-grey-8">
              Join groups, and make new friends today!
            </div>
            <div class="text-brown q-mt-md">We are the social commerce platform for university students</div>
          </div>
        </div>
        <div class="feature-section col-12 col-md-2 pink-bg">
          <div class="column">
            <div class="col-12 text-center q-pa-md unbounded relative-position">
              <q-img
                :src="imgWoman"
                alt="Purple Shirt Wearing Woman"
                width="143px"
                height="25vh"
              />
              <div id="review">
                <div class="text-white">
                  Amy Sawyer
                </div>
                <div class="text-pink">
                  <span class="bg-purple-10">
                    "Really handy app!"
                  </span>
                </div>
              </div>
            </div>
            <div
              id="bordering"
              class="col-12 text-center q-pa-lg"
            >
              <q-img
                :src="imgMan"
                alt="Yellow Shirt Wearing Man"
                width="15vw"
                height="25vh"
              />
            </div>
          </div>
        </div>
        <div class="feature-section col-12 col-md-2">
          <div class="column">
            <div class="col-12 bg-white text-center q-pa-lg">
              <q-img
                :src="imgHoodie"
                alt="Yellow Hoodie"
                width="50%"
                height="25vh"
              />
            </div>
            <div class="col-12 lemon-bg text-center q-pa-md">
              <q-img
                :src="imgPants"
                alt="White Trousers"
                width="40%"
                height="25vh"
              />
            </div>
          </div>
        </div>
        <div class="feature-section col-12 col-md-3 pink-bg relative-position">
          <div
            id="featureText"
            class="text-white unbounded absolute-center"
          >
            <div class="text-center text-h6 q-mb-md">HELP OTHERS <br>&amp;<br> MAKE MONEY</div>
            This platform offers incentives for students who list items, such as being featured on the homepage or receiving a discount on their next purchase.
            <div class="q-mt-md text-h2">
              🤑
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import AuthHandler from "components/AuthHandler.vue";
import heroImg from "assets/images/juicy-man-dancing.png";
import imgWoman from "assets/images/martina-woman-showing-something-with-her-hands.png";
import imgMan from "assets/images/juicy-man-with-a-camera-in-his-hands.png";
import imgHoodie from "assets/images/yellow-hoodie-hanger.png";
import imgPants from "assets/images/blank-white-sport-pants.png";

export default defineComponent({
  name: "IndexPage",

  components: {
    AuthHandler,
  },

  setup() {
    return {
      heroImg,
      imgWoman,
      imgMan,
      imgHoodie,
      imgPants,
    };
  },
});
</script>

<style lang="sass">
.lemon-bg
  background: #f0c608
  position: relative
.pink-bg
  background: #e00f51
.purple-fill
  background: #370075
#yellowBubble
  position: absolute
  width: 20vw
  height: 20vw
  background: yellow
  top: 50%
  left: 50%
  transform: translate(-30%, -50%)
  border-radius: 50%
#heroText
  position: absolute
  width: 55vw
  z-index: 10
  top: 50%
  left: 50%
  transform: translate(-20%, -50%)
  div
    width: 20vw
#subText
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  width: 30vw
#review
  position: absolute
  bottom: 0%
  left: 50%
  width: 100%
  transform: translate(-50%, 30%)
#bordering
  border: 1px solid black
#shadeText
  top: 40%
#featureText
  text-align: center
  div
    width: 100%
</style>
