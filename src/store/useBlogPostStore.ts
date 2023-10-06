import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { IBlogPost } from "@/interfaces";
import { blogPosts as blogPostsMock } from "@/constants";

export const useBlogPostStore = defineStore("use-blog-post", () => {
  const blogPosts = ref<IBlogPost[]>([]);

  const recentBlogPosts = computed(() => blogPosts.value.slice(0, 4));

  function seedBlogPosts() {
    blogPosts.value = blogPostsMock;
    console.log(recentBlogPosts.value);
  }

  return { blogPosts, recentBlogPosts, seedBlogPosts };
});
