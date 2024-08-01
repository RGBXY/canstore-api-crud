<!-- src/components/ProductForm.vue -->
<template>
  <form @submit.prevent="submitForm" class="h-screen text-center py-10">
    <input v-model="name" placeholder="Name" />
    <input v-model="description" placeholder="Description" />
    <input v-model="price" placeholder="Price" type="number" />
    <input v-model="image" placeholder="Image URL" />
    <button type="submit">Update Product</button>
  </form>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useProductStore } from "../stores/productStore";

const store = useProductStore();
const name = ref("");
const description = ref("");
const price = ref("");
const image = ref("");

const id = store.editId;

onMounted(() => {
  if (id !== null) {
    const product = store.products.find((product) => product.id === id);
    if (product) {
      name.value = product.name;
      description.value = product.description;
      price.value = product.price;
      image.value = product.image;
    }
  }
});

async function submitForm() {
  const productData = {
    name: name.value,
    description: description.value,
    price: price.value,
    image: image.value,
  };
  await store.updateProduct(id, productData);
}
</script>
