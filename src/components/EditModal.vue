<!-- src/components/EditModal.vue -->
<template>
  <div @click="closeBtnEdit" :class="['flex fixed h-screen top-0 w-full justify-center items-center bg-black bg-opacity-40', { hidden: !modalEditStatus }]">
    <div @click.stop class="bg-white p-4 rounded-xl w-[300px]">
      <div class="flex justify-between items-center mb-3">
        <h1 class="text-lg font-semibold">Update Produk</h1>
        <button @click="closeBtnEdit">X</button>
      </div>
      <form @submit.prevent="submitForm">
        <div class="flex flex-col mb-2">
          <label for="name">Nama:</label>
          <input class="border border-slate-500 rounded-lg p-2 text-sm" type="text" v-model="product.name" id="name" required />
        </div>
        <div class="flex flex-col mb-2">
          <label for="description">Deskripsi:</label>
          <input class="border border-slate-500 rounded-lg p-2 text-sm" type="text" v-model="product.description" id="description" required />
        </div>
        <div class="flex flex-col mb-2">
          <label for="price">Harga:</label>
          <input class="border border-slate-500 rounded-lg p-2 text-sm" type="number" v-model="product.price" id="price" required />
        </div>
        <div class="flex flex-col mb-3">
          <label for="image">Gambar URL:</label>
          <input class="border border-slate-500 rounded-lg p-2 text-sm" type="text" v-model="product.image" id="image" />
        </div>
        <button class="w-full bg-[#273c99] p-2 rounded-xl text-white" type="submit" :disabled="loading">Update Produk</button>
      </form>
      <p v-if="error">{{ error }}</p>
      <p v-if="loading">Loading...</p>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted, watch } from "vue";
import { useProductStore } from "@/stores/productStore";
import { useToggleStore } from "@/stores/modal";

export default {
  setup() {
    const productStore = useProductStore();
    const buttonToggle = useToggleStore();
    const product = ref({
      name: "",
      description: "",
      price: "",
      image: "",
    });

    const modalEditStatus = computed(() => buttonToggle.modalEditStatus);

    const loadProduct = () => {
      const id = productStore.editId;
      if (id !== null) {
        const prod = productStore.products.find((product) => product.id === id);
        if (prod) {
          product.value = { ...prod };
        }
      }
    };

    watch(modalEditStatus, (newStatus) => {
      if (newStatus) {
        loadProduct();
      }
    });

    const submitForm = async () => {
      await productStore.updateProduct(productStore.editId, product.value);
      buttonToggle.closeBtnEdit();
    };

    const closeBtnEdit = () => {
      buttonToggle.closeBtnEdit();
    };

    return {
      product,
      submitForm,
      closeBtnEdit,
      modalEditStatus,
      loading: productStore.loading,
      error: productStore.error,
    };
  },
};
</script>
