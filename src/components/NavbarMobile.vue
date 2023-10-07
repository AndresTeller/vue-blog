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
</script>

<template>
  <div class="flex justify-between items-center p-5 md:hidden">
    <router-link :to="{name: 'Root'}">
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
        <router-link
          v-for="navLink in navLinks"
          :key="navLink.id"
          :to="{ name: navLink.name }"
        >
          <DropdownMenuItem>
            {{ navLink.label }}
          </DropdownMenuItem>
        </router-link>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
