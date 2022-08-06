import { createApp } from "vue";
import { createPinia } from "pinia";
import { io } from "socket.io-client";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faArrowRightFromBracket,
  faSun,
  faMoon,
  faArrowRight,
  faHeart,
  faSquareFull,
  faMessage,
  faLocationDot,
  faAngleRight,
  faMagnifyingGlass,
  faFaceFrown,
  faUserPlus,
  faUserMinus,
} from "@fortawesome/free-solid-svg-icons";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

library.add(
  faMoon,
  faSun,
  faArrowRightFromBracket,
  faArrowRight,
  faHeart,
  faSquareFull,
  faMessage,
  faLocationDot,
  faAngleRight,
  faMagnifyingGlass,
  faFaceFrown,
  faUserPlus,
  faUserMinus,
  faArrowRightFromBracket
);

const socket = io("http://localhost:3000", {
  autoConnect: false,
  extraHeaders: {
    "Access-Control-Allow-Origin": "*",
  },
});

app.component("font-awesome-icon", FontAwesomeIcon);

app.provide("socket", socket);
app.use(createPinia());
app.use(router);

app.mount("#app");
