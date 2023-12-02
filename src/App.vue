<template>
  <div class="text-center">
    <h1 class="font-bold my-8 text-3xl text-black">{{ TITLE }}</h1>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { TITLE } from '@/constants/title'

</script>