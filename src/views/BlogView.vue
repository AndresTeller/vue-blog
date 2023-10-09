<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/store/useUserStore";
import { IBlogPost } from "@/interfaces";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dayjs from "dayjs";
import firebase from "firebase";
import { Notyf } from "notyf";
import { X } from "lucide-vue-next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import router from "@/router";
import Tag from "@/components/Tag.vue";

const route = useRoute();
const notyf = new Notyf();
const blogPost = ref<IBlogPost | undefined>(undefined);
const userStore = useUserStore();
const isOpen = ref<boolean>(false);

if (typeof route.params.id === "string") {
  blogPost.value = userStore.getBlogPost(route.params.id);
}

const onOpenChange = (value: boolean) => {
  isOpen.value = value;
};

const handleDelete = () => {
  try {
    if (typeof route.params.id === "string") {
      userStore.deleteBlogPost(route.params.id);
      notyf.success("Delete blog post succesfully");
      router.push({ name: "Root" });
    }
  } catch (error) {
    notyf.error("Something went wrong!");
  }
};
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

      <div class="relative">
        <X
          class="text-rose-500 absolute right-0 h-7 w-7 hover:text-rose-500/75 cursor-pointer"
          @click="() => onOpenChange(true)"
        />
        <img
          :src="blogPost.imgUrl"
          alt="blog post"
          class="rounded-md object-cover max-h-96 max-w-2xl"
        />
      </div>
      <div class="flex flex-wrap items-center gap-x-2 gap-y-2 py-4">
        <Tag
          v-for="{ id, color, name } in blogPost.tags"
          :key="id"
          :color="color"
          :name="name"
        />
      </div>
      <p>
        {{ blogPost.description }}
      </p>
      <p>
        {{ blogPost.content }}
      </p>
    </div>

    <Dialog :open="isOpen" @update:open="onOpenChange">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete blog post</DialogTitle>
          <DialogDescription>
            Are you sure to delete this blog post? This action is irreversible.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="ghost" @click="() => onOpenChange(false)"
            >Cancel</Button
          >
          <Button variant="destructive" class="" @click="handleDelete"
            >Delete</Button
          >
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </section>
</template>
