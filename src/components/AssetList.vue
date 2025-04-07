<template>
  <div class="p-4 space-y-4">
    <AssetCard
      v-for="asset in assets"
      :key="asset.id"
      :asset="asset"
      @delete="$emit('delete', asset.id)"
      @edit="$emit('edit', asset)"
    />
  </div>
</template>

<script setup>
import AssetCard from "./AssetCard.vue";

defineProps({ assets: Array });
defineEmits(["delete", "edit"]);
</script>
