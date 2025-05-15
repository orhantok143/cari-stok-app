// src/features/gelir/gelirSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createGelir,
  deleteGelir,
  fetchGelirler,
  updateGelir,
} from "./gelirService";

export const getGelirler = createAsyncThunk("gelir/getGelirler", fetchGelirler);
export const addGelir = createAsyncThunk("gelir/addGelir", createGelir);
export const editGelir = createAsyncThunk(
  "gelir/editGelir",
  async (data ) => {
    return await updateGelir(data._id, data);
  }
);
export const removeGelir = createAsyncThunk("gelir/removeGelir", deleteGelir);

const gelirSlice = createSlice({
  name: "gelir",
  initialState: {
    gelirler: [],
    loading: false,
    error: null,
    editedGelir:null
  },
  reducers: {
     setEditGelir: (state, action) => {
    state.editedGelir = action.payload;
  }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGelirler.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGelirler.fulfilled, (state, action) => {
        state.loading = false;
        state.gelirler = action.payload;
      })
      .addCase(getGelirler.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addGelir.pending, (state) => {
        state.loading = true;
      })
      .addCase(addGelir.fulfilled, (state, action) => {
        state.loading= false
        state.gelirler.push(action.payload);
      })
      .addCase(addGelir.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(editGelir.pending, (state) => {
        state.loading = true;
      })
      .addCase(editGelir.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.gelirler.findIndex(
          (g) => g._id === action.payload._id
        );
        if (index !== -1) state.gelirler[index] = action.payload;
      })
      .addCase(editGelir.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeGelir.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeGelir.fulfilled, (state, action) => {
        state.loading = false;
        state.gelirler = state.gelirler.filter(
          (g) => g._id !== action.payload._id
        );
      })
      .addCase(removeGelir.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


export const { setEditGelir } = gelirSlice.actions;
export default gelirSlice.reducer;
