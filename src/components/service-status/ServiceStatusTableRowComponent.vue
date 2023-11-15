<script setup lang="ts">
import type { HealthStatus } from '@/interfaces/service-status-item.interface'

defineProps<{
  serviceName: string
  healthStatus: HealthStatus
}>()
</script>

<template>
  <tr class="bg-white divide-x divide-cold-gray">
    <td class="italic px-6 py-3 text-left">{{ serviceName }}</td>
    <td class="px-6 py-3 text-center">
      {{ healthStatus === 'UP' ? '✅' : '❌' }}
    </td>
  </tr>
</template>
