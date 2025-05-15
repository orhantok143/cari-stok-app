// src/features/Stock/StockSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createStock, deleteStock, fetchStock, updateStock } from "./StockService";

// Thunks
export const getStockler = createAsyncThunk("stock/getStockler", fetchStock);

export const addStock = createAsyncThunk("stock/addStock", async (data, thunkAPI) => {
  try {
    return await createStock(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const editStock = createAsyncThunk("stock/editStock", async ({ id, values }, thunkAPI) => {
  try {
    return await updateStock(id, values);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const removeStock = createAsyncThunk("stock/removeStock", async (id, thunkAPI) => {
  try {
    await deleteStock(id); // API'den direkt silme isteği
    return id; // Silinen id'yi geri dön
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// Slice
const StockSlice = createSlice({
  name: "stock",
  initialState: {
    stockler: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getStockler.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStockler.fulfilled, (state, action) => {
        state.loading = false;
        state.Stockler = action.payload;
      })
      .addCase(getStockler.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // ADD
      .addCase(addStock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addStock.fulfilled, (state, action) => {
        state.loading = false;
        state.Stockler.push(action.payload);
      })
      .addCase(addStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // UPDATE
      .addCase(editStock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editStock.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.Stockler.findIndex((g) => g._id === action.payload._id);
        if (index !== -1) {
          state.Stockler[index] = action.payload;
        }
      })
      .addCase(editStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // DELETE
      .addCase(removeStock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeStock.fulfilled, (state, action) => {
        state.loading = false;
        state.Stockler = state.Stockler.filter((g) => g._id !== action.payload);
      })
      .addCase(removeStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default StockSlice.reducer;
