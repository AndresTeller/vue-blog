<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import NavbarMobile from "@/components/NavbarMobile.vue";
</script>

<template>
  <Navbar />
  <NavbarMobile />
  <slot />
</template>
