<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useUserStore } from "@/store/useUserStore";
import { LogOut } from "lucide-vue-next";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const handleClick = () => {
  userStore.logOut();
  router.push({name: "Login"});
};

</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger class="text-slate-900 hover:text-slate-900/75"
      >Sign out</DropdownMenuTrigger
    >
    <DropdownMenuContent>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem class="cursor-pointer" @click="handleClick">
        <LogOut class="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
