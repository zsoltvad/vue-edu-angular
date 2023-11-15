<script setup lang="ts">
import { useServiceStatusStoreStore } from '@/stores/service-status.store'
import LoadingComponent from '@/components/LoadingComponent.vue'
import ServiceStatusTableComponent from '@/components/service-status/ServiceStatusTableComponent.vue'

const serviceStatusStore = useServiceStatusStoreStore()

serviceStatusStore.fetchStatus()
</script>

<template>
  <div class="flex justify-center my-16">
    <LoadingComponent v-if="serviceStatusStore.state.status === 'loading'" />
    <ServiceStatusTableComponent
      v-else-if="serviceStatusStore.state.status === 'result'"
      :services="serviceStatusStore.state.services"
    />
  </div>
</template>
