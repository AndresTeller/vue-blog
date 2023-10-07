import BlogViewVue from "@/views/BlogView.vue";
import RootViewVue from "@/views/RootView.vue";
import LoginViewVue from "@/views/LoginView.vue";
import SignupViewVue from "@/views/SignupView.vue";
import CreateBlogViewVue from "@/views/CreateBlogView.vue"
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", name: "Root", component: RootViewVue },
  { path: "/login", name: "Login", component: LoginViewVue },
  { path: "/blogs/:id", name: "Blog", component: BlogViewVue },
  { path: "/sign-up", name: "SignUp", component: SignupViewVue },
  { path: "/create-blog", name: "CreateBlog",  component: CreateBlogViewVue }
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
