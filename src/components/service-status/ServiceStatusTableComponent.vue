<script setup lang="ts">
import type { ServiceStatusItem } from '@/interfaces/service-status-item.interface'
import type { ServiceStatusType } from '@/types/service-status-item.type'
import ServiceStatusTableRowComponent from '@/components/service-status/ServiceStatusTableRowComponent.vue'

defineProps<{ services: Record<ServiceStatusType, ServiceStatusItem> }>()
</script>

<template>
  <table class="shadow-2xl" data-id="result">
    <thead>
      <tr class="bg-green divide-x divide-cold-gray text-white uppercase">
        <th scope="col" class="px-6 py-3">Microservice</th>
        <th scope="col" class="px-6 py-3">Status</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-cold-gray">
      <ServiceStatusTableRowComponent
        v-for="[key, { healthStatus }] in Object.entries(services)"
        :key="key"
        :service-name="key"
        :healthStatus="healthStatus"
      />
    </tbody>
  </table>
</template>
