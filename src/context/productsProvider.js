import { createContext, useContext, useReducer } from "react";

const ProductsContext = createContext();

export const useProductsContext = () => useContext(ProductsContext);

export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const DELETE_PRODUCT = "DELETE_PRODUCT"

const initialState = {
  products: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCTS:
      return {...state , products: [...state.products, ...payload] };
    case ADD_PRODUCT:
      return {...state, products: [...state.products, payload]}
    case DELETE_PRODUCT:
      return {...state, products: state.products.filter((product) => product.key !== payload.key)}
    default:
      return state;
  }
};

const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = (product) => {
    dispatch({
      type: GET_PRODUCTS,
      payload: product,
    });
  };

  const addProduct = (product) => {
    dispatch({
      type: ADD_PRODUCT,
      payload: product,
    });
  };

  const deleteProduct = (product) => {
    dispatch({
      type: DELETE_PRODUCT,
      payload: product
    })
  }

  return (
    <ProductsContext.Provider
      value={{ addProduct, products: state.products, getProducts, deleteProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
