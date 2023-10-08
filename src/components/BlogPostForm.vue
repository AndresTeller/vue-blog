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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "./ui/card";
import { useUserStore } from "@/store/useUserStore";
import { Notyf } from "notyf";
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const notyf = new Notyf();
const isLoading = ref<boolean>(false);

const iTagSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.union([
    z.literal("blue"),
    z.literal("green"),
    z.literal("purple"),
    z.literal("red"),
  ]),
});

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(1).max(40),
    description: z.string().min(1),
    content: z.string().min(1),
    imgUrl: z.string().min(1),
    tags: z.array(iTagSchema).min(1),
  })
);

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    tags: [
      {
        id: uuidv4(),
        name: "",
        color: "blue",
      },
    ],
  },
});

const onSubmit = form.handleSubmit(
  async ({ title, content, description, imgUrl, tags }) => {
    try {
      isLoading.value = true;
      await userStore.createBlogPost({
        id: uuidv4(),
        date: new Date(),
        title,
        content,
        description,
        imgUrl,
        tags,
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

      <!-- TAGS -->
      <FormField v-slot="{ componentField }" name="tags[0].name">
        <FormItem>
          <FormLabel>Tag name</FormLabel>
          <FormControl>
            <Input
              class="focus-visible:ring-transparent"
              type="text"
              placeholder="Interface"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="tags[0].color">
        <FormItem>
          <FormLabel>Tag color</FormLabel>

          <Select
            v-bind="componentField"
            class="focus-visible:ring-transparent"
          >
            <FormControl>
              <SelectTrigger class="focus-visible:ring-transparent">
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
            </FormControl>
            <SelectContent class="focus-visible:ring-transparent">
              <SelectGroup class="focus-visible:ring-transparent">
                <SelectItem value="blue">
                  <div class="flex gap-x-1 items-center">
                    <div class="h-4 w-4 rounded-full bg-blue-500" />
                    <span class="text-blue-500 font-semibold">Blue</span>
                  </div>
                </SelectItem>
                <SelectItem value="purple">
                  <div class="flex gap-x-1 items-center">
                    <div class="h-4 w-4 rounded-full bg-purple-500" />
                    <span class="text-purple-500 font-semibold">Purple</span>
                  </div>
                </SelectItem>
                <SelectItem value="green">
                  <div class="flex gap-x-1 items-center">
                    <div class="h-4 w-4 rounded-full bg-green-500" />
                    <span class="text-green-500 font-semibold">Green</span>
                  </div>
                </SelectItem>
                <SelectItem value="red">
                  <div class="flex gap-x-1 items-center">
                    <div class="h-4 w-4 rounded-full bg-red-500" />
                    <span class="text-red-500 font-semibold">Red</span>
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button class="w-full" type="submit" :disabled="isLoading">
        Submit
      </Button>
    </form>
  </Card>
</template>
