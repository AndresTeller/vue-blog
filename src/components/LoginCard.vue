<script setup lang="ts">
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Notyf } from "notyf";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "vue-router";
import { ref } from "vue";

const notyf = new Notyf();
const userStore = useUserStore();
const router = useRouter();
const isLoading = ref<boolean>(false);

const formSchema = toTypedSchema(
  z.object({
    email: z.string().min(2).max(50).email(),
    password: z.string().min(1),
    rememberMe: z.boolean().default(false).optional(),
  })
);

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    rememberMe: false,
  },
});

const onSubmit = form.handleSubmit(async ({ email, password }) => {
  try {
    isLoading.value = true;
    await userStore.auth(email, password);

    if (!userStore.isAuthenticated) {
      throw new Error();
    }

    notyf.success("Login successfully!");
    router.push({ name: "Root" });
  } catch (error) {
    notyf.error("Wrong credentials, please try again!");
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <Card class="flex flex-col w-full gap-y-5 max-w-md px-10 py-5">
    <span class="text-3xl font-bold">Sign in to your account</span>
    <form @submit="onSubmit" class="flex flex-col gap-y-5">
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Your email</FormLabel>
          <FormControl>
            <Input
              type="email"
              placeholder="johndoe@email.com"
              v-bind="componentField"
              class="p-6 focus-visible:ring-transparent"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input
              type="password"
              placeholder="Password"
              v-bind="componentField"
              class="p-6 focus-visible:ring-transparent"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ value, handleChange }" name="rememberMe">
        <FormItem
          class="flex flex-row items-start gap-x-3 space-y-0 rounded-md p-4"
        >
          <FormControl>
            <Checkbox :checked="value" @update:checked="handleChange" />
          </FormControl>
          <div
            class="w-full flex items-center justify-between space-y-1 leading-none"
          >
            <FormLabel>Remember me</FormLabel>
            <router-link
              :to="{ name: 'Root' }"
              class="text-blue-800 hover:text-blue-800/75"
            >
              Forgot password?
            </router-link>
            <FormMessage />
          </div>
        </FormItem>
      </FormField>

      <Button type="submit" class="w-full" :disabled="isLoading">
        Submit
      </Button>
    </form>
    <p>
      Don't have an account yet?
      <router-link
        :to="{ name: 'SignUp' }"
        class="text-blue-800 hover:text-blue-800/75"
        >Sign up</router-link
      >
    </p>
  </Card>
</template>
