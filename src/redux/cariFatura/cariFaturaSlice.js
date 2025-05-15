// src/features/CariFatura/CariFaturaSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createCariFatura, deleteCariFatura, fetchCariFatura, updateCariFatura } from "./cariFaturaService";

// Thunks
export const getCariFaturaler = createAsyncThunk("cariFatura/getCariFaturaler", fetchCariFatura);

export const addCariFatura = createAsyncThunk("cariFatura/addCariFatura", async (data, thunkAPI) => {
  try {
    
    return await createCariFatura(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const editCariFatura = createAsyncThunk("cariFatura/editCariFatura", async ({ id, data }, thunkAPI) => {
  try {
    return await updateCariFatura(id, data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const removeCariFatura = createAsyncThunk("cariFatura/removeCariFatura", async (id, thunkAPI) => {
  try {
    await deleteCariFatura(id); // API'den direkt silme isteği
    return id; // Silinen id'yi geri dön
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// Slice
const CariFaturaSlice = createSlice({
  name: "cariFatura",
  initialState: {
    cariFaturalar: [],
    loading: false,
    error: null,
    editedCariFatura:null
  },
  reducers: {
   setEditCariFatura: (state, action) => {
    state.editedCariFatura = action.payload;
  }
  },
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getCariFaturaler.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCariFaturaler.fulfilled, (state, action) => {
        state.loading = false;
        state.cariFaturalar = action.payload;
      })
      .addCase(getCariFaturaler.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // ADD
      .addCase(addCariFatura.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCariFatura.fulfilled, (state, action) => {
        state.loading = false;
        state.cariFaturalar.push(action.payload);
      })
      .addCase(addCariFatura.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // UPDATE
      .addCase(editCariFatura.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCariFatura.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.cariFaturalar.findIndex((g) => g._id === action.payload._id);
        if (index !== -1) {
          state.cariFaturalar[index] = action.payload;
        }
      })
      .addCase(editCariFatura.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // DELETE
      .addCase(removeCariFatura.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCariFatura.fulfilled, (state, action) => {
        state.loading = false;
        state.cariFaturalar = state.cariFaturalar.filter((g) => g._id !== action.payload);
      })
      .addCase(removeCariFatura.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setEditCariFatura } = CariFaturaSlice.actions;
export default CariFaturaSlice.reducer;
