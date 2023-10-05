<script setup lang="ts">
import NavbarMobile from "@/components/NavbarMobile.vue";
import RecentBlogPosts from "./components/RecentBlogPosts.vue";
import AllBlogPosts from "./components/AllBlogPosts.vue";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <Navbar />
  <NavbarMobile />
  <RecentBlogPosts />
  <AllBlogPosts />
</template>

<style scoped></style>
