import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice(
  {
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      
      console.log('removeItem is coming');
      console.log('state.items is ' + state.items);
      console.log('action.payload is ', action.payload);

      return {
        ...state,  // Keep other states
        items: state.items.filter(item => item.name !== action.payload.name)
      };
        },

    updateQuantity: (state, action) => {
      console.log('updateQuantity is coming');
      console.log('state.items is ' + state.items.id);
      console.log('action.payload is ', action.payload);
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
