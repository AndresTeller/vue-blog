import BlogViewVue from "@/views/BlogView.vue";
import RootViewVue from "@/views/RootView.vue";
import LoginViewVue from "@/views/LoginView.vue";
import SignupViewVue from "@/views/SignupView.vue";
import CreateBlogViewVue from "@/views/CreateBlogView.vue";
import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/store/useUserStore";
import { publicRoutes } from "@/constants";

const routes = [
  { path: "/", name: "Root", component: RootViewVue },
  { path: "/login", name: "Login", component: LoginViewVue },
  { path: "/blogs/:id", name: "Blog", component: BlogViewVue },
  { path: "/sign-up", name: "SignUp", component: SignupViewVue },
  { path: "/create-blog", name: "CreateBlog", component: CreateBlogViewVue },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const userStore = useUserStore();

  const routeName: string = to.name?.toString() || "Login";

  if (!userStore.isAuthenticated && !publicRoutes.includes(routeName))
    next({ name: "Login" });
  else next();
});

export default router;
