import { defineStore } from "pinia";

export const useToggleStore = defineStore("toggle", {
  state: () => ({
    modalCreatestatus: false,
    modalNavStatus: false,
    modalEditStatus: false,
  }),
  actions: {
    toggleBtnCreate() {
      this.modalCreatestatus = !this.modalCreatestatus;
    },
    toggleBtnNav() {
      this.modalNavStatus = !this.modalNavStatus;
    },
    toggleBtnEdit() {
      this.modalEditStatus = !this.modalEditStatus;
    },
    closeBtnCreate() {
      this.modalCreatestatus = false;
    },
    closeBtnEdit() {
      this.modalEditStatus = false;
    },
  },
});
