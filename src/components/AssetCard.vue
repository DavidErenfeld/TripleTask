<template>
  <div
    class="border p-4 rounded shadow flex flex-col sm:flex-row gap-4 items-center justify-between"
  >
    <img
      :src="asset.image"
      alt="Asset image"
      class="w-32 h-32 object-cover rounded"
    />

    <div class="flex-1">
      <h3 class="text-lg font-semibold">{{ asset.name }}</h3>
      <p class="text-gray-600">Price: {{ asset.price.toLocaleString() }} ₪</p>
    </div>

    <div class="flex gap-2">
      <button
        class="bg-red-500 text-white px-3 py-1 rounded"
        @click="$emit('delete', asset.id)"
      >
        Delete
      </button>
      <button
        class="bg-blue-500 text-white px-3 py-1 rounded"
        @click="$emit('edit', asset)"
      >
        Edit
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({ asset: Object });
</script>
