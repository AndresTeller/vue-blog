<script setup lang="ts">
import { AlignRight } from "lucide-vue-next";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navLinks } from "@/constants";
import { useUserStore } from "@/store/useUserStore";
import SignOutMobile from "./SignOutMobile.vue";

const userStore = useUserStore();
</script>

<template>
  <div class="flex justify-between items-center p-5 md:hidden">
    <router-link :to="{ name: 'Root' }">
      <span class="text-2xl font-bold">AndrésTeller</span>
    </router-link>

    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="link">
          <AlignRight />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="md:hidden">
        <DropdownMenuLabel>Personal Blog</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div v-for="navLink in navLinks" :key="navLink.id">
          <router-link
            :to="{ name: 'Login' }"
            v-if="userStore.isAuthenticated && navLink.name === 'Login'"
          >
            <DropdownMenuItem>
              <SignOutMobile />
            </DropdownMenuItem>
          </router-link>
          <router-link :to="{ name: navLink.name }" v-else>
            <DropdownMenuItem>
              {{ navLink.label }}
            </DropdownMenuItem>
          </router-link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
