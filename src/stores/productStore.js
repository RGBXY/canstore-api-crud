// src/stores/productStore.js
import { defineStore } from "pinia";
import axios from "axios";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
    detail: null,
    editId: null,
    loading: false,
    alert: false,
    error: null,
  }),
  actions: {
    closeBtn() {
      this.alert = false;
    },

    async fetchProducts() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get("http://localhost:2000/products/");
        this.products = response.data;
      } catch (err) {
        this.error = err.message || "Error fetching products";
      } finally {
        this.loading = false;
      }
    },

    async detailProduct(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`http://localhost:2000/products/${id}`);
        this.detail = response.data;
      } catch (err) {
        this.error = err.message || "Error fetching products";
      } finally {
        this.loading = false;
      }
    },

    async addProduct(product) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post("http://localhost:2000/products/", product);
        this.products.push(response.data);
      } catch (err) {
        this.error = err.message || "Error adding product";
      } finally {
        this.loading = false;
        this.alert = true;
      }
    },

    async deleteProduct(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.delete(`http://localhost:2000/products/${id}`);
        this.products = this.products.filter((product) => product.id !== id);
      } catch (error) {
        this.error = "Ada kesalahan nihc";
        console.error("ada kesalahan:", error);
      } finally {
        this.loading = false;
      }
    },

    async editProduct(id, product) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.put(`http://localhost:2000/products/${id}`, product);
        this.products.push(response.data);
      } catch {}
    },

    async updateProduct(id, productData) {
      try {
        const response = await axios.put(`http://localhost:2000/products/${id}`, productData);
        // Update produk di state jika diperlukan
        const index = this.products.findIndex((product) => product.id === id);
        if (index !== -1) {
          this.products[index] = response.data;
        }
      } catch (error) {
        console.error("Error updating product:", error);
      }
    },

    setEditingProductId(id) {
      this.editId = id;
    },
  },
});
