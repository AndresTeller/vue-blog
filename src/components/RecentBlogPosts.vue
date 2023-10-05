<script setup lang="ts">
import { blogPosts } from "@/constants";
import BlogPost from "./BlogPost.vue";
</script>

<template>
  <section
    class="relative flex flex-col items-center justify-center p-10 gap-y-4"
  >
    <h1 class="text-2xl font-bold">Recent Blog Posts</h1>
    <BlogPost
      v-for="{ id, title, description, imgUrl, date, href, tags } in blogPosts"
      :key="id"
      :date="date"
      :tags="tags"
      :href="href"
      :title="title"
      :img-url="imgUrl"
      :description="description"
      class="max-w-sm"
    />
  </section>
</template>
