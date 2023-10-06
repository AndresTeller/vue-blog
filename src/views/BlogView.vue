<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useBlogPostStore } from "@/store/useBlogPostStore";
import { IBlogPost } from "@/interfaces";
const route = useRoute();
const blogPost = ref<IBlogPost | undefined>(undefined);
const blogPostStore = useBlogPostStore();

onMounted(() => {
  blogPost.value = blogPostStore.getBlogPost(route.params.id as string);
  console.log(blogPost.value);
});
</script>

<template>
  <h1>BLOG</h1>
</template>
