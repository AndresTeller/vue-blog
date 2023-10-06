<script setup lang="ts">
import AllBlogPosts from "@/components/AllBlogPosts.vue";
import Navbar from "@/components/Navbar.vue"
import NavbarMobile from "@/components/NavbarMobile.vue";
import RecentBlogPosts from "@/components/RecentBlogPosts.vue";
</script>

<template>
  <Navbar />
  <NavbarMobile />
  <RecentBlogPosts />
  <AllBlogPosts />
</template>

<style scoped></style>
