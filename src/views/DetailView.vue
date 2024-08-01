<template>
  <div class="pt-20">
    <div v-if="loading">Memuat...</div>
    <div v-if="error">{{ error }}</div>
    <div v-if="detail">
      {{ detail.name }}
      <br>
      {{ detail.description }}
      <br>
      <img :src="detail.image" alt="">
      <br>
      {{ detail.price }}
    </div>
  </div>
</template>

<script>
import { useProductStore } from "@/stores/productStore";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const productId = route.params.id;

    const productsStore = useProductStore();
    const { detail, loading, error } = storeToRefs(productsStore);

    onMounted(() => {
      if (productId) {
        productsStore.detailProduct(productId);
      }
    });

    console.log();

    return {
      detail,
      loading,
      error,
    };
  },
};
</script>
