<template>
  <nav class="h-20 flex items-center justify-between border-b border-white fixed top-0 left-0 right-0 px-20 bg-[#273c99] text-white">
    <h1 class="text-2xl font-bold w-[50%]">CAN <span class="text-[#f8bb08]"> STORE</span></h1>
    <div class="flex items-center w-[50%] gap-5 ">
      <div class="flex flex-row gap-5">
        <a href="/">HOME</a>
        <a href="/product">PRODUCT</a>
      </div>
      <button @click="toggleBtnNav" class="flex relative items-center gap-2">
        <!-- <img class="rounded-full w-5" src="https://cdn.icon-icons.com/icons2/1769/PNG/512/4115237-add-plus_114047.png" alt="" />
      <p>Tambah Produk</p> -->
        <img class="w-10 object-cover rounded-full border-2 border-white shado" src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" alt="" />
        <div v-if="modalNavStatus === true" class="absolute right-0 -bottom-[100px] text-sm border-slate-50 bg-white p-2 rounded-lg text-black w-[150px] shadow-xl">
          <RouterLink to="/dashboard" class=""><button class="w-full py-2 hover:bg-slate-50 rounded-lg">Dashboard</button></RouterLink>
          <button @click="toggleBtnCreate" class="w-full py-2 hover:bg-slate-50 rounded-lg">Tambah Barang</button>
        </div>
      </button>
    </div>
  </nav>
</template>

<script>
import { useToggleStore } from "@/stores/modal";
import { storeToRefs } from "pinia";
import { RouterLink } from "vue-router";

export default {
  setup() {
    const buttonToggle = useToggleStore();

    const toggleBtnCreate = () => {
      buttonToggle.toggleBtnCreate();
    };

    const toggleBtnNav = () => {
      buttonToggle.toggleBtnNav();
    };

    const { modalCreatestatus } = storeToRefs(buttonToggle);
    const { modalNavStatus } = storeToRefs(buttonToggle);

    return {
      toggleBtnNav,
      toggleBtnCreate,
      modalNavStatus,
      modalCreatestatus,
    };
  },
};
</script>
