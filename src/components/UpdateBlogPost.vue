<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "./ui/card";
import { useUserStore } from "@/store/useUserStore";
import { Notyf } from "notyf";
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import { useRouter, useRoute } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const notyf = new Notyf();
const isLoading = ref<boolean>(false);

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(1).max(60),
    description: z.string().min(1),
    content: z.string().min(1),
    imgUrl: z.string().min(1),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(
  async ({ title, content, description, imgUrl }) => {
    try {
      isLoading.value = true;

      if (typeof route.params.id !== "string") return;

      userStore.updateBlogPost({
        id: route.params.id,
        date: new Date(),
        title,
        content,
        description,
        imgUrl,
        tags: [],
      });
      
      notyf.success("The blog was created successfully!");
      router.push({ name: "Root" });
    } catch (error) {
      notyf.error("Something went wrong, please try again!");
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }
);
</script>

<template>
  <Card class="flex flex-col w-full gap-y-5 max-w-md px-10 py-5 max-h-fit">
    <span class="text-3xl font-bold">Create your blog post</span>
    <form @submit="onSubmit" class="flex flex-col gap-y-5">
      <FormField v-slot="{ componentField }" name="imgUrl">
        <FormItem>
          <FormLabel>Image url</FormLabel>
          <FormControl>
            <Input
              class="focus-visible:ring-transparent"
              type="text"
              placeholder="https://yourimage.com"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="title">
        <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <Input
              class="focus-visible:ring-transparent"
              type="text"
              placeholder="UX review presentations"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="description">
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Input
              class="focus-visible:ring-transparent"
              type="text"
              placeholder="How do you create compelling presentations?"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="content">
        <FormItem>
          <FormLabel>Content</FormLabel>
          <FormControl>
            <Textarea
              class="focus-visible:ring-transparent resize-none"
              type="text"
              placeholder="How do you create compelling presentations that wow your colleagues and impress your managers?"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button class="w-full" type="submit" :disabled="isLoading">
        Submit
      </Button>
    </form>
  </Card>
</template>
