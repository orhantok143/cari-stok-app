// src/features/Gider/GiderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createGider,
  deleteGider,
  fetchGiderler,
  updateGider,
} from "./giderService";

export const getGiderler = createAsyncThunk("gider/getGiderler", fetchGiderler);
export const addGider = createAsyncThunk("gider/addGider", createGider);
export const editGider = createAsyncThunk(
  "gider/editGider",
  async (data ) => {
    return await updateGider(data._id, data);
  }
);
export const removeGider = createAsyncThunk("gider/removeGider", deleteGider);

const GiderSlice = createSlice({
  name: "gider",
  initialState: {
    giderler: [],
    loading: false,
    error: null,
    editedGider:null
  },
  reducers: {
     setEditGider: (state, action) => {
    state.editedGider = action.payload;
  }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGiderler.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGiderler.fulfilled, (state, action) => {
        state.loading = false;
        state.giderler = action.payload;
      })
      .addCase(getGiderler.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addGider.pending, (state) => {
        state.loading = true;
      })
      .addCase(addGider.fulfilled, (state, action) => {
        state.loading= false
        state.giderler.push(action.payload);
      })
      .addCase(addGider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(editGider.pending, (state) => {
        state.loading = true;
      })
      .addCase(editGider.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.giderler.findIndex(
          (g) => g._id === action.payload._id
        );
        if (index !== -1) state.giderler[index] = action.payload;
      })
      .addCase(editGider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeGider.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeGider.fulfilled, (state, action) => {
        state.loading = false;
        state.giderler = state.giderler.filter(
          (g) => g._id !== action.payload._id
        );
      })
      .addCase(removeGider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


export const { setEditGider } = GiderSlice.actions;
export default GiderSlice.reducer;
