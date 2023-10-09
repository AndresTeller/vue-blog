<script setup lang="ts">
import { navLinks } from "@/constants";
import SignOut from "@/components/SignOut.vue";
import { useUserStore } from "@/store/useUserStore";

const userStore = useUserStore();
</script>

<template>
  <nav
    class="hidden md:flex justify-between items-center container mx-auto pt-5"
  >
    <router-link :to="{ name: 'Root' }">
      <span class="text-2xl font-bold">AndrésTeller</span>
    </router-link>
    <div class="flex gap-x-10">
      <div v-for="navlink in navLinks">
        <SignOut v-if="userStore.isAuthenticated && navlink.name === 'Login'" />
        <router-link
          class="text-slate-900 hover:text-slate-900/75"
          :to="{ name: navlink.name }"
          v-else="userStore.isAuthenticated && navlink.name === 'Login'"
        >
          {{ navlink.label }}
        </router-link>
      </div>
    </div>
  </nav>
</template>
