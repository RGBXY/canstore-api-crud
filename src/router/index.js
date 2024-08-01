import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DashboardView from "@/views/DashboardView.vue";
import DetailView from "@/views/DetailView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/dashboard",
      name: "dahsboard",
      component: DashboardView,
    },
    {
      path: "/detail/:id",
      name: "ProductDetail",  
      component: DetailView,
    },
  ],
});

export default router;
