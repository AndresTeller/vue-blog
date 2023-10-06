<script setup lang="ts">
import { computed, onMounted } from "vue";
import BlogPost from "./BlogPost.vue";
import { useRouter } from "vue-router";
import { IBlogPost } from "@/interfaces";
import { useBlogPostStore } from "@/store/useBlogPostStore";

const router = useRouter();
const blogPostsStore = useBlogPostStore();
const blogPosts = computed(() => blogPostsStore.recentBlogPosts);

defineProps({
  recentBlogPosts: {
    type: Array<IBlogPost>,
    required: true,
  },
});

const redirectToBlogPost = (id: string) => {
  router.push({
    name: "Blog",
    params: { id },
  });
};

onMounted(() => {
  blogPostsStore.seedBlogPosts();
});
</script>

<template>
  <section>
    <h1 class="text-5xl font-bold col-span-full text-center mt-12">
      Recent Blog Posts
    </h1>
    <div
      class="p-10 gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center container mx-auto"
    >
      <BlogPost
        v-for="{
          id,
          title,
          description,
          imgUrl,
          date,
          href,
          tags,
        } in blogPosts"
        :key="id"
        :date="date"
        :tags="tags"
        :href="href"
        :title="title"
        :img-url="imgUrl"
        :description="description"
        class="max-w-md md:first:w-full md:first:max-w-none md:first:col-span-full min-h-[500px] lg:first:col-span-2 lg:last:col-span-2 lg:last:w-full lg:last:max-w-none md:last:col-span-full md:last:w-full md:last:max-w-none"
        @click="() => redirectToBlogPost(id)"
      />
    </div>
  </section>
</template>
