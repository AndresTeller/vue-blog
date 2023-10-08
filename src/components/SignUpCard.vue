<script setup lang="ts">
import * as z from "zod";
import { Notyf } from "notyf";
import { useRouter } from "vue-router";
import { useForm } from "vee-validate";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toTypedSchema } from "@vee-validate/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { useUserStore } from "@/store/useUserStore";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ref } from "vue";

const userStore = useUserStore();
const notyf = new Notyf();
const router = useRouter();
const isLoading = ref<boolean>(false);

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(3).max(20),
    lastname: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(5),
    confirmPassword: z.string().min(5),
    isConfirmedTermsAndConditions: z.boolean(),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(
  async ({ name, lastname, email, confirmPassword, password }) => {
    try {
      isLoading.value = true;
      const isPasswordsMatch = confirmPassword === password;

      if (!isPasswordsMatch) {
        notyf.error("Passwords dont match, please try again!");
        return;
      }

      await userStore.createUser({
        id: "",
        name,
        email,
        lastname,
        password,
        blogposts: [],
      });

      notyf.success("Your account has been created successfully!");
      router.push({ name: "Root" });
    } catch (error) {
      notyf.error("Something went wrong, please try again!");
    } finally {
      isLoading.value = false;
    }
  }
);
</script>

<template>
  <Card class="flex flex-col w-full gap-y-5 max-w-md px-10 py-5">
    <span class="text-3xl font-bold">Create an account</span>
    <form @submit="onSubmit" class="flex flex-col gap-y-5">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input
              class="focus-visible:ring-transparent"
              type="text"
              placeholder="John"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="lastname">
        <FormItem>
          <FormLabel>Lastname</FormLabel>
          <FormControl>
            <Input
              class="focus-visible:ring-transparent"
              type="text"
              placeholder="Doe"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              class="focus-visible:ring-transparent"
              type="text"
              placeholder="johndoe@email.com"
              v-bind="componentField"
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
              class="focus-visible:ring-transparent"
              type="password"
              placeholder="password"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="confirmPassword">
        <FormItem>
          <FormLabel>Confirm Password</FormLabel>
          <FormControl>
            <Input
              class="focus-visible:ring-transparent"
              type="password"
              placeholder="password"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ value, handleChange }"
        name="isConfirmedTermsAndConditions"
      >
        <FormItem
          class="flex flex-row items-start gap-x-3 space-y-0 rounded-md p-4"
        >
          <FormControl>
            <Checkbox :checked="value" @update:checked="handleChange" />
          </FormControl>
          <div class="space-y-1 leading-none">
            <FormLabel>Accept Terms and Conditions</FormLabel>
            <FormMessage />
          </div>
        </FormItem>
      </FormField>

      <Button type="submit" class="w-full" :disabled="isLoading">
        Create an account
      </Button>
    </form>
    <p>
      Already have an account?
      <router-link
        :to="{ name: 'Login' }"
        class="text-blue-800 hover:text-blue-800/75"
        >Login here</router-link
      >
    </p>
  </Card>
</template>
