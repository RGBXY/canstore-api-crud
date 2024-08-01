<template>
  <div class="pt-24 flex w-full flex-col justify-center items-center">
    <h1 class="text-2xl font-semibold text-center border-b-2 w-[25%] pb-2 mb-4 border-[#f8bb08]">Daftar Produk</h1>
    <div v-if="loading">Memuat...</div>
    <div class="flex flex-row gap-3 w-full justify-center flex-wrap" v-else>
      <div class="bg-[#273c99] border-4 shadow-xl border-[#273c99] text-white min-h-[200px] w-[280px] rounded-xl overflow-hidden" v-for="product in products" :key="product.id">
        <img class="w-full h-52 object-cover bg-slate-600" :src="product.image" alt="" />
        <div class="p-2">
          <div class="flex justify-between">
            <RouterLink :to="{ name: 'ProductDetail', params: { id: product.id } }" class="text-lg mb-1 font-semibold">
              {{ product.name }}
            </RouterLink>
            <h1 class="text-lg font-semibold">Rp.{{ product.price }}</h1>
          </div>
          <p class="text-sm mb-3 border-t-2 border-[#f8bb08] pt-2">{{ product.description }}</p>
        </div>
      </div>
    </div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useProductStore } from "@/stores/productStore";
import { storeToRefs } from "pinia";
import { RouterLink } from "vue-router";

export default {
  setup() {
    const productStore = useProductStore();
    const { products, loading, error } = storeToRefs(productStore);

    const deleteProduct = (id) => {
      productStore.deleteProduct(id);
    };

    // const setDetailProductId = (id) => {
    //   productStore.setDetailProductId(id);
    // };

    const detailProduct = (id) => {
      productStore.detailProduct(id);
    };

    onMounted(() => {
      productStore.fetchProducts();
    });

    return {
      deleteProduct,
      detailProduct,
      products,
      loading,
      error,
    };
  },
};
</script>
