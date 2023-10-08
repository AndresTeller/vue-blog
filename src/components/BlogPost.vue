<script setup lang="ts">
import { ITag } from "@/interfaces";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight } from "lucide-vue-next";
import Tag from "./Tag.vue";
import dayjs from "dayjs";
import firebase from "firebase";

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
  date: {
    //TO DO: Change type String to Date
    type: [Date, firebase.firestore.Timestamp],
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
  <Card
    class="min-w-[300px] hover:cursor-pointer hover:scale-105 transition ease-in-out delay-150"
  >
    <CardHeader>
      <div class="flex items-center justify-center">
        <img
          :src="imgUrl"
          alt="Blog Post"
          class="rounded-md w-full h-64 object-cover"
        />
      </div>
      <span class="text-[#6941C6] font-semibold" v-if="date instanceof Date">
        {{ dayjs(date).format("DD MMMM YYYY") }}
      </span>
      <span class="text-[#6941C6] font-semibold" v-else>
        {{ dayjs(date.toDate()).format("DD MMMM YYYY") }}
      </span>
      <!-- TO DO: Add link with href -->
      <CardTitle class="flex justify-between items-center">
        {{ title }}
        <ArrowUpRight class="h-7 w-7" />
      </CardTitle>
      <CardDescription>{{ description }}</CardDescription>
    </CardHeader>
    <CardFooter class="flex gap-x-1 gap-y-2 flex-wrap">
      <Tag
        v-for="{ id, color, name } in tags"
        :color="color"
        :name="name"
        :key="id"
      />
    </CardFooter>
  </Card>
</template>
