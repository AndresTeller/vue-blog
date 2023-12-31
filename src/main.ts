import { createApp } from "vue";
import "./assets/index.css";
import router from "./router";
import { createPinia } from "pinia";
import App from "./App.vue";
import "notyf/notyf.min.css";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount("#app");
