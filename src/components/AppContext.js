import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  productsAmount: 0,
  products: [],
};

const AppContext = createContext();

const appReducer = (state, action) => {
  switch(action.type) {
    case 'ADD_PRODUCT':

      const isAnyDouble = state.products.find(item => (item.id === action.payload.id) && (item.size === action.payload.size));
      
      if(isAnyDouble){
        const updatedProducts = state.products.map((item) => {
          if(item.id === action.payload.id && item.size === action.payload.size){
            return {
              ...item,
              amount: item.amount + action.payload.amount,
              total: item.total + action.payload.total
            }
          }
          return item;
        });

        const newState = {
          ...state,
          products: updatedProducts
        };

        localStorage.setItem('cartState', JSON.stringify(newState));
        return newState;
      } else{
        const updatedState = {
          ...state,
          productsAmount: state.productsAmount + 1,
          products: [...state.products, action.payload]
        };

        localStorage.setItem('cartState', JSON.stringify(updatedState));
        return updatedState;
      };







    case 'LOAD_CART_DATA':
      return action.payload;    

    case 'DELETE_PRODUCT':

    const updatedProducts = state.products.filter(item => item.id !== action.payload.id);

      const updatedDeletedState = {
        ...state,
        productsAmount: state.productsAmount - 1,
        products: updatedProducts,
      };

      localStorage.setItem('cartState', JSON.stringify(updatedDeletedState));

      return updatedDeletedState;

    default: return state;  
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return(
    <AppContext.Provider value={{ state, dispatch }}>
        {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

