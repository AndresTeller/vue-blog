<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/store/useUserStore";
import { IBlogPost } from "@/interfaces";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dayjs from "dayjs";
import firebase from "firebase";

const route = useRoute();
const blogPost = ref<IBlogPost | undefined>(undefined);
const userStore = useUserStore();

if (typeof route.params.id === "string") {
  blogPost.value = userStore.getBlogPost(route.params.id);
}
</script>

<template>
  <section v-if="blogPost === undefined" class="container mx-auto">
    <h1>An error has ocurred, please try again later.</h1>
  </section>

  <section v-else class="container py-10 mx-auto">
    <div class="mx-auto flex justify-between items-center max-w-2xl">
      <div class="flex items-center gap-x-2">
        <Avatar>
          <AvatarImage
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80"
            alt="avatar"
          />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <p class="max-[370px]:hidden font-semibold">
          {{ `${userStore.user.name} ${userStore.user.lastname}` }}
        </p>
      </div>
      <p
        class="font-semibold text-[#6941C6]"
        v-if="blogPost.date instanceof firebase.firestore.Timestamp"
      >
        {{ dayjs(blogPost.date.toDate()).format("DD MMMM YYYY") }}
      </p>
      <p class="font-semibold text-[#6941C6]" v-else>
        {{ dayjs(blogPost.date).format("DD MMMM YYYY") }}
      </p>
    </div>

    <div class="flex flex-col gap-y-4 justify-center md:items-center">
      <h1 class="text-2xl font-bold text-center">{{ blogPost.title }}</h1>
      <img
        :src="blogPost.imgUrl"
        alt="blog post"
        class="rounded-md object-cover max-h-96 max-w-2xl"
      />
      <p>
        {{ blogPost.description }}
      </p>
      <div class="flex flex-wrap items-center gap-x-2 gap-y-2 py-4">
        <Badge
          v-for="{ id, color, name } in blogPost.tags"
          :key="id"
          :class="[
            color === 'blue' &&
              'bg-blue-300 text-blue-600 hover:bg-blue-300/75',
            color === 'purple' &&
              'bg-purple-300 text-purple-600 hover:bg-purple-300/75',
            color === 'red' && 'bg-red-300 text-red-600 hover:bg-red-300/75',
            color === 'green' &&
              'bg-green-300 text-green-600 hover:bg-green-300/75',
          ]"
        >
          {{ name }}
        </Badge>
      </div>
    </div>
  </section>
</template>
