import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  productsAmount: 0,
  products: [],
};

const AppContext = createContext();

const appReducer = (state, action) => {
  switch(action.type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        productsAmount: state.productsAmount + 1,
        products: [...state.products, action.payload]
      };
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

