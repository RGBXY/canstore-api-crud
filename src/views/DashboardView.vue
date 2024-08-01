<!-- src/components/ProductList.vue -->
<template>
  <div class="pt-20 flex justify-center">
    <div class="rounded-t-xl overflow-hidden p-10 w-[80%]">
      <button @click="toggleBtnCreate" class="bg-[#273c99] p-2 rounded-xl mb-2 text-white">Tambah Barang</button>
      <table class="table-auto rounded-2xl border-2 overflow-scroll lg:overflow-hidden">
        <thead class="">
          <tr class="bg-slate-100 text-slate-500 text-sm">
            <th class="px-10 py-4">Name</th>
            <th class="px-10 py-4">Image</th>
            <th class="px-10 py-4">Description</th>
            <th class="px-10 py-4">Price</th>
            <th class="px-10 py-4">Aksi</th>
          </tr>
        </thead>
        <tbody class="border-2 border-slate-200">
          <tr class="border-b-2 border-slate-200 text-slate-500 text-sm" v-for="product in products" :key="product.id">
            <td class="px-4 py-2 border-2 font-medium">{{ product.name }}</td>
            <td class="px-4 py-2 border-2 font-medium"><img class="w-40" :src="product.image" alt="" /></td>
            <td class="px-4 py-2 border-2 font-medium">{{ product.description }}</td>
            <td class="px-4 py-2 border-2 font-medium">Rp.{{ product.price }}</td>
            <td class="px-4 py-2 border-2 font-medium">
              <button @click="editBtn(product.id)" class="bg-blue-500 text-white rounded-lg py-2 px-4 mb-1">Edit</button>
              <button @click="deleteProduct(product.id)" class="bg-red-500 text-white rounded-lg py-2 px-4">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <EditAlert />
</template>

<script>
import { onMounted } from "vue";
import { useProductStore } from "@/stores/productStore";
import EditAlert from "../components/EditModal.vue";
import { storeToRefs } from "pinia";
import { useToggleStore } from "@/stores/modal";

export default {
  components: {
    EditAlert,
  },
  setup() {
    const productStore = useProductStore();
    const buttonToggle = useToggleStore();
    const { products, loading, error } = storeToRefs(productStore);

    const toggleBtnCreate = () => {
      buttonToggle.toggleBtnCreate();
    };

    const deleteProduct = (id) => {
      productStore.deleteProduct(id);
    };

    const editBtn = (productId) => {
      productStore.setEditingProductId(productId);
      buttonToggle.toggleBtnEdit();
    };

    const { modalCreatestatus } = storeToRefs(buttonToggle);

    onMounted(() => {
      productStore.fetchProducts();
    });

    return {
      deleteProduct,
      editBtn,
      toggleBtnCreate,
      modalCreatestatus,
      products,
      loading,
      error,
    };
  },
};
</script>
