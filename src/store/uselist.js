import axios from "axios";
import { create } from "zustand";
import { url } from "../config/config";

export const useList = create((set, get) => ({
  data: [],
  getUsers: async () => {
    try {
      let { data } = await axios.get(`${url}/ToDo/get-to-dos`);
      set({ data: data.data });
    } catch (error) {
      console.error(error);
    }
  },
  addTodo: async (obj) => {
    try {
      await axios.post(`${url}/ToDo/add-to-do`, obj);
      get().getUsers();
    } catch (error) {
      console.error(error);
    }
  },
  deletUser: async (id) => {
    try {
      const { data } = await axios.delete(`${url}/ToDo/delete-to-do?id=${id}`);
      await get().getUsers();
    } catch (error) {
      console.error(error);
    }
  },
  modalEdit: false,
  setModalEdit: (status) => {set(state => ({modalEdit: status}))},
  modalInfo: false,
  setModalInfo: (status) => {set(state => ({modalInfo: status}))},
  idx: null,
  setIdx: (value) => set(state => ({idx:value})),
  name: "",
  setName: (value) => set(state => ({name:value})),
  desc: "",
  setDesc: (value) => set(state => ({desc:value})), 
  putUser: async (obj) => {
    try {
      await axios.put(`${url}/ToDo/update-to-do`, obj);
      get().getUsers();
    } catch (error) {
      console.error(error);
    }
  },
  inpEditName: "",
  setInpEditName: (value) => set({ inpEditName: value }),

  inpEditDesc: "",
  setInpEditDesc: (value) => set({ inpEditDesc: value }),
  idx: null,
  setIdx: (value) => set((state) => ({ idx: value })),

  deleteImage: async (id) => {
    try {
      await axios.delete(`${url}/ToDo/delete-to-do-image?imageId=${id}`);
      get().getUsers();
    } catch (error) {
      console.error(error);
    }
  },
}));
