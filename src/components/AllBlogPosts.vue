<script setup lang="ts">
import BlogPost from "./BlogPost.vue";
import { computed } from "vue";
import { useUserStore } from "@/store/useUserStore";

const userStore = useUserStore();
const blogPosts = computed(() => userStore.user.blogPosts);

</script>

<template>
  <section
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center container mx-auto gap-8"
  >
    <h1 class="text-5xl font-bold col-span-full">All Blog Posts</h1>
    <router-link
      v-for="{ id, title, description, imgUrl, date, tags } in blogPosts"
      :to="{ name: 'Blog', params: { id } }"
    >
      <BlogPost
        :key="id"
        :date="date"
        :tags="tags"
        :title="title"
        :img-url="imgUrl"
        :description="description"
        class="max-w-md col-span-1 min-h-[500px]"
      />
    </router-link>
    <!-- TO DO: Pagination component -->
  </section>
</template>
