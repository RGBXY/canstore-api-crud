<template>
  <div @click="closeBtnCreate" :class="['flex fixed h-screen w-full justify-center items-center bg-black bg-opacity-40', { hidden: !modalCreatestatus }]">
    <div @click.stop class="bg-white p-4 rounded-xl w-[300px]">
      <div class="flex justify-between items-center mb-3">
        <h1 class="text-lg font-semibold">Tambah Produk</h1>
        <button @click="closeBtnCreate">X</button>
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
        <button @click="closeBtn" class="w-full bg-[#273c99] p-2 rounded-xl text-white" type="submit" :disabled="loading">Tambah Produk</button>
      </form>
      <p v-if="error">{{ error }}</p>
      <p v-if="loading">Loading...</p>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useProductStore } from "@/stores/productStore";
import { useToggleStore } from "@/stores/modal";
import { storeToRefs } from "pinia";

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

    const submitForm = async () => {
      await productStore.addProduct(product.value);
      product.value = {
        name: "",
        description: "",
        price: "",
        image: "",
      };
    };

    const toggleBtnCreate = () => {
      buttonToggle.toggleBtnCreate();
    };

    const closeBtnCreate = () => {
      buttonToggle.closeBtnCreate();
    };

    const { modalCreatestatus } = storeToRefs(buttonToggle);

    return {
      submitForm,
      toggleBtnCreate,
      closeBtnCreate,
      product,
      modalCreatestatus,
      loading: productStore.loading,
      error: productStore.error,
    };
  },
};
</script>
