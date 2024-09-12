import { configureStore, createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items:[],
        totalAmount: 0,
        totalPrice: 0,
        changeItemCount: 1,
        contactValues: {},
        shipmentValues: {},
    },
    reducers: {
        addItem(state, action) {
            const item = action.payload;
            const existingItem = state.items.find(i => i.id === item.id);

            if (existingItem) {
                existingItem.quantity += 1; 
            } else {
                state.items.push({ ...item, quantity: 1 }); 
            }

            state.totalAmount += 1;
            state.totalPrice += item.price;
        },
        removeItem(state, action) {
            const itemIdToRemove = action.payload;
            const itemToRemove = state.items.find(item => item.id === itemIdToRemove);

            if (itemToRemove) {
                state.items = state.items.filter(item => item.id !== itemIdToRemove);

                state.totalAmount -= itemToRemove.quantity;
                state.totalPrice -= itemToRemove.price * itemToRemove.quantity;
            }
        },
        changeItemCount(state, action) {
            const { itemId, newQuantity } = action.payload;
            const item = state.items.find(i => i.id === itemId);

            if (item) {
                const difference = newQuantity - item.quantity;
                item.quantity = newQuantity;
                state.totalAmount += difference;
                state.totalPrice += difference * item.price;
            }
        },
        setFormContactValues(state, action) {
            state.contactValues = action.payload;
        },
        setFormShipmentValue(state, action) {
            state.shipmentValues = action.payload;
        },
        clearCart(state) {
            state.items = [];
            state.totalAmount = 0;
            state.totalPrice = 0;
        },

    },
});

export const { addItem, removeItem, changeItemCount, setFormContactValues, setFormShipmentValue, clearCart } = cartSlice.actions;

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
    },
});

export default store;
