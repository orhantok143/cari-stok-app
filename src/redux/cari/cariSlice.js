// src/features/cari/cariSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createCari, deleteCari, fetchCariler, updateCari } from "./cariService";

// Thunks
export const getCariler = createAsyncThunk("cari/getCariler", fetchCariler);

export const addCari = createAsyncThunk("cari/addCari", async (data, thunkAPI) => {
  try {
    return await createCari(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const editCari = createAsyncThunk("cari/editCari", async ({ id, data }, thunkAPI) => {
  try {
    return await updateCari(id, data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const removeCari = createAsyncThunk("cari/removeCari", async (id, thunkAPI) => {
  try {
    await deleteCari(id); // API'den direkt silme isteği
    return id; // Silinen id'yi geri dön
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// Slice
const CariSlice = createSlice({
  name: "cari",
  initialState: {
    cariler: [],
    loading: false,
    error: null,
    editedCari:null
  },
  reducers: {
   setEditCari: (state, action) => {
    state.editedCari = action.payload;
  }
  },
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getCariler.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCariler.fulfilled, (state, action) => {
        state.loading = false;
        state.cariler = action.payload;
      })
      .addCase(getCariler.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // ADD
      .addCase(addCari.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCari.fulfilled, (state, action) => {
        state.loading = false;
        state.cariler.push(action.payload);
      })
      .addCase(addCari.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // UPDATE
      .addCase(editCari.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCari.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.cariler.findIndex((g) => g._id === action.payload._id);
        if (index !== -1) {
          state.cariler[index] = action.payload;
        }
      })
      .addCase(editCari.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // DELETE
      .addCase(removeCari.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCari.fulfilled, (state, action) => {
        state.loading = false;
        state.cariler = state.cariler.filter((g) => g._id !== action.payload);
      })
      .addCase(removeCari.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setEditCari } = CariSlice.actions;
export default CariSlice.reducer;
