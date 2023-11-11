<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content ?? APP_TITLE }}</template>
  </metainfo>

  <div class="text-center">
    <h1 class="font-bold my-8 text-3xl text-black">{{ APP_TITLE }}</h1>

    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

import { APP_TITLE } from '@/constants/title'
</script>
