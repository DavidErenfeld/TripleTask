<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-10" @close="closeModal">
      <div class="fixed inset-0 bg-black bg-opacity-50" />

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            class="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md z-50 border border-gray-200"
          >
            <DialogTitle class="text-lg font-semibold mb-4 text-center">
              {{ isEdit ? "Edit Asset" : "Add New Asset" }}
            </DialogTitle>

            <form @submit.prevent="handleSubmit" class="space-y-4">
              <input
                v-model="form.image"
                type="text"
                placeholder="Image URL"
                class="w-full border rounded p-2"
                required
              />
              <input
                v-model="form.name"
                type="text"
                placeholder="Asset Name"
                class="w-full border rounded p-2"
                required
              />
              <input
                v-model.number="form.price"
                type="number"
                placeholder="Price"
                class="w-full border rounded p-2"
                required
              />

              <div class="flex justify-end gap-2">
                <button
                  type="button"
                  class="px-4 py-2 rounded bg-gray-300"
                  @click="closeModal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="px-4 py-2 rounded bg-green-500 text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, watch } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
} from "@headlessui/vue";

const props = defineProps({
  isOpen: Boolean,
  initialData: Object,
});
const emit = defineEmits(["close", "save"]);

const form = ref({ image: "", name: "", price: 0 });
const isEdit = ref(false);

watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      form.value = { ...newData };
      isEdit.value = true;
    } else {
      form.value = { image: "", name: "", price: 0 };
      isEdit.value = false;
    }
  },
  { immediate: true }
);

function closeModal() {
  emit("close");
}

function handleSubmit() {
  emit("save", { ...form.value });
  closeModal();
}
</script>
