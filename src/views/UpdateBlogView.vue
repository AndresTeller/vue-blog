<script lang="ts" setup>
import { useRoute } from "vue-router";
import UpdateBlogPost from "@/components/UpdateBlogPost.vue";
const route = useRoute();
</script>

<template>
  <section class="h-screen w-screen flex items-center justify-center">
    <UpdateBlogPost />
  </section>
</template>
