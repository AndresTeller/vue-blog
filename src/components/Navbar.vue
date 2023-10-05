<script setup lang="ts">
import { navLinks } from "@/constants";
</script>

<template>
  <nav
    class="hidden md:flex justify-between items-center container mx-auto pt-5"
  >
    <a href="/">
      <span class="text-2xl font-bold">AndrésTeller</span>
    </a>
    <div class="flex gap-x-10">
      <a
        class="text-slate-900 hover:text-slate-900/75"
        v-for="navlink in navLinks"
        :href="navlink.href"
        :key="navlink.id"
      >
        {{ navlink.label }}
      </a>
    </div>
  </nav>
</template>
