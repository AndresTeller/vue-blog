<script lang="ts" setup>
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const handleClick = () => {
  userStore.logOut();
  router.push({ name: "Login" });
};
</script>

<template>
  <button @click="handleClick">Logout</button>
</template>
