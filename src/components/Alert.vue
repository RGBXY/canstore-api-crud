<template>
  <div v-if="alert" class="fixed right-0 top-24 bg-green-200 shadow-lg p-3 flex items-center gap-2 text-green-800 rounded-l-xl">
    <button @click="alertBtn">
      <p class="bg-green-600 rounded-full px-2 text-green-200">X</p>
    </button>
    <p class="text-xl text-center font-semibold">Data Sukses di Upload</p>
  </div>
</template>

<script>
import { useProductStore } from "@/stores/productStore";
import { computed } from "vue";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const product = useProductStore();
    const { alert } = storeToRefs(product);
    
    const alertBtn = () => {
      product.closeBtn();
    };

    return {
      alert,
      alertBtn,
    };
  },
};
</script>
