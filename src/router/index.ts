import RootViewVue from "@/views/RootView.vue";
import LoginViewVue from "@/views/LoginView.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", name: "Root", component: RootViewVue },
  { path: "/login", name: "Login", component: LoginViewVue },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _) => {
  const isAuthenticated = true;

  if (!isAuthenticated && to.name !== "Login") return { name: "Login" };
});

export default router;
