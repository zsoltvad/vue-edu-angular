<script setup lang="ts">
import { APP_TITLE } from '@/constants/title'
</script>

<template>
  <div class="text-center">
    <h1 class="font-bold my-8 text-3xl text-black">{{ APP_TITLE }}</h1>

    <router-view></router-view>
  </div>
</template>
