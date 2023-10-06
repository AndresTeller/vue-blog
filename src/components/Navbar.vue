<script setup lang="ts">
import { navLinks } from "@/constants";
</script>

<template>
  <nav
    class="hidden md:flex justify-between items-center container mx-auto pt-5"
  >
    <router-link to="/">
      <span class="text-2xl font-bold">AndrésTeller</span>
    </router-link>
    <div class="flex gap-x-10">
      <router-link
        class="text-slate-900 hover:text-slate-900/75"
        v-for="navlink in navLinks"
        :to="navlink.href"
        :key="navlink.id"
      >
        {{ navlink.label }}
      </router-link>
    </div>
  </nav>
</template>
