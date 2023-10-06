<script setup lang="ts">
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
</script>

<template>
  <Card class="flex flex-col w-full gap-y-5 max-w-md px-10 py-5">
    <span class="text-3xl font-bold">Sign in to your account</span>

    <div>
      <Label for="email">Your email</Label>
      <Input
        type="email"
        placeholder="Email"
        id="email"
        class="p-6 focus-visible:ring-transparent"
      />
    </div>
    <div>
      <Label for="password">Password</Label>
      <Input
        type="password"
        placeholder="password"
        id="password"
        class="p-6 focus-visible:ring-transparent"
      />
    </div>

    <div class="flex justify-between">
      <div class="flex items-center space-x-2">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Remember me
        </label>
      </div>
      <router-link to="/" class="text-blue-800 hover:text-blue-800/75">
        Forgot password?
      </router-link>
    </div>
    <Button class="">Sign in</Button>
    <p>
      Don't have an account yet?
      <router-link to="/" class="text-blue-800 hover:text-blue-800/75"
        >Sign up</router-link
      >
    </p>
  </Card>
</template>
