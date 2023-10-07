<script setup lang="ts">
import { Badge } from "./ui/badge";
const { color, name } = defineProps(["color", "name"]);
</script>

<template>
  <Badge
    :class="[
      color === 'blue' && 'bg-blue-300 text-blue-600 hover:bg-blue-300/75',
      color === 'purple' &&
        'bg-purple-300 text-purple-600 hover:bg-purple-300/75',
      color === 'red' && 'bg-red-300 text-red-600 hover:bg-red-300/75',
      color === 'green' && 'bg-green-300 text-green-600 hover:bg-green-300/75',
    ]"
  >
    {{ name }}
  </Badge>
</template>
