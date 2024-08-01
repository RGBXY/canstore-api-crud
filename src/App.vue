<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navigation from "./components/Navigation.vue";
import Create from "@/components/Create.vue";
import Alert from "@/components/Alert.vue";
</script>

<template>
  <Navigation />
  <Create />
  <Alert />
  <RouterView />
</template>
