import { publicRoutes } from "@/constants";
import RootViewVue from "@/views/RootView.vue";
import BlogViewVue from "@/views/BlogView.vue";
import LoginViewVue from "@/views/LoginView.vue";
import SignupViewVue from "@/views/SignupView.vue";
import { useUserStore } from "@/store/useUserStore";
import CreateBlogViewVue from "@/views/CreateBlogView.vue";
import UpdateBlogViewVue from "@/views/UpdateBlogView.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", name: "Root", component: RootViewVue },
  { path: "/login", name: "Login", component: LoginViewVue },
  { path: "/blogs/:id", name: "Blog", component: BlogViewVue },
  { path: "/sign-up", name: "SignUp", component: SignupViewVue },
  { path: "/create-blog", name: "CreateBlog", component: CreateBlogViewVue },
  {
    path: "/update-blog/:id",
    name: "UpdateBlog",
    component: UpdateBlogViewVue,
  },
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
