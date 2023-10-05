<script setup lang="ts">
import { ITag } from "@/interfaces";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-vue-next";

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
  date: {
    //TO DO: Change type String to Date
    type: String,
    required: true,
  },
  tags: {
    type: Array<ITag>,
    validator: (tags: Array<ITag>) => {
      return tags.every((tag) => tag.name && tag.color);
    },
  },
});
</script>

<template>
  <Card class="min-w-[300px]">
    <CardHeader>
      <div class="flex items-center justify-center">
        <img
          :src="imgUrl"
          alt="Blog Post"
          class="rounded-md w-full h-64 object-cover"
        />
      </div>
      <span class="text-[#6941C6] font-semibold">{{ date }}</span>
      <!-- TO DO: Add link with href -->
      <CardTitle class="flex justify-between items-center">
        {{ title }}
        <ArrowUpRight class="h-7 w-7" />
      </CardTitle>
      <CardDescription>{{ description }}</CardDescription>
    </CardHeader>
    <CardFooter class="flex gap-x-1 gap-y-2 flex-wrap">
      <Badge
        v-for="{ id, color, name } in tags"
        :key="id"
        :class="[
          color === 'blue' && 'bg-blue-300 text-blue-600 hover:bg-blue-300/75',
          color === 'purple' &&
            'bg-purple-300 text-purple-600 hover:bg-purple-300/75',
          color === 'red' && 'bg-red-300 text-red-600 hover:bg-red-300/75',
          color === 'green' &&
            'bg-green-300 text-green-600 hover:bg-green-300/75',
        ]"
      >
        {{ name }}
      </Badge>
    </CardFooter>
  </Card>
</template>
