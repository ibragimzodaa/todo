import axios from "axios";
import { create } from "zustand";
import { url } from "../config/config";

export const useList = create((set, get) => ({
  data: [],
  getUsers: async () => {
    try {
      let { data } = await axios.get(`${url}/api/to-dos`);
      set({ data: data.data });
    } catch (error) {
      console.error(error);
    }
  },
  addTodo: async (obj) => {
    try {
      await axios.post(`${url}/api/to-dos`, obj);
      get().getUsers();
    } catch (error) {
      console.error(error);
    }
  },
  deletUser: async (id) => {
    try {
      const { data } = await axios.delete(`${url}/api/to-dos?id=${id}`);
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
      await axios.put(`${url}/api/to-dos`, obj);
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
      await axios.delete(`${url}/api/to-dos/images?imageId=${id}`);
      get().getUsers();
    } catch (error) {
      console.error(error);
    }
  },
  complete: async (el) => {
    try {
      await axios.put(`${url}/completed?id=${el.id}`, {
        name: el.name,
        id: el.id,
        description: el.description,
        isCompleted: !el.isCompleted
      })
      get().getUsers();
    } catch (error) {
      console.error(error);
    }
}
}));
