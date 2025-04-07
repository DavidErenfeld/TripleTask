import { ref, watch } from "vue";

const STORAGE_KEY = "assets-list";

export default function useAssets() {
  const assets = ref([]);

  function loadFromStorage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      assets.value = JSON.parse(saved);
    }
  }

  function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(assets.value));
  }

  function addAsset(asset) {
    asset.id = Date.now();
    assets.value.push(asset);
  }

  function updateAsset(updated) {
    const index = assets.value.findIndex((a) => a.id === updated.id);
    if (index !== -1) {
      assets.value[index] = updated;
    }
  }

  function deleteAsset(id) {
    assets.value = assets.value.filter((a) => a.id !== id);
  }

  loadFromStorage();

  watch(assets, saveToStorage, { deep: true });

  return {
    assets,
    addAsset,
    updateAsset,
    deleteAsset,
  };
}
