<template>
  <div class="p-4 max-w-3xl mx-auto">
    <header class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Asset List</h1>
      <button
        class="bg-green-500 text-white px-4 py-2 rounded"
        @click="openAddModal"
      >
        Add Asset
      </button>
    </header>

    <AssetList :assets="assets" @delete="deleteAsset" @edit="openEditModal" />

    <AddAssetModal
      :isOpen="isModalOpen"
      :initialData="assetToEdit"
      @close="closeModal"
      @save="saveAsset"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import AssetList from "./components/AssetList.vue";
import AddAssetModal from "./components/AddAssetModal.vue";
import useAssets from "./composables/useAssets.js";

const { assets, addAsset, updateAsset, deleteAsset } = useAssets();

const isModalOpen = ref(false);
const assetToEdit = ref(null);

function openAddModal() {
  assetToEdit.value = null;
  isModalOpen.value = true;
}

function openEditModal(asset) {
  assetToEdit.value = asset;
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}

function saveAsset(asset) {
  if (asset.id) {
    updateAsset(asset);
  } else {
    addAsset(asset);
  }
}
</script>
