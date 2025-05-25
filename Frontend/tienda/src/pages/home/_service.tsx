import { jsonAsync } from "../../components/helpers/utils";


export const getProducts = async () => {

  const res = await jsonAsync(import.meta.env.VITE_PRODUCTS, "GET", '');
  if (res.ok) {
    return res;
  }
  return res.body

};


type ProducToCart = {
  productId: number;
  quantity: number;
};

export const addProductToCart = async (data: ProducToCart, token: any) => {
  const url = `${import.meta.env.VITE_ADDPRODUCTCART}?productId=${data.productId}&quantity=${data.quantity}`;
  const res = await jsonAsync(url, "POST", {}, {
    Authorization: 'Bearer ' + token,
  });

  if (res.ok) {
    return res;
  }
  return res.body

};

export const removeProductToCart = async (productId:number, token: any) => {
  const url = `${import.meta.env.VITE_REMOVEPRODUCTCART}${productId}`;
  const res = await jsonAsync(url, "DELETE", {}, {
    Authorization: 'Bearer ' + token,
  });

  if (res.ok) {
    return res;
  }
  return res.body

};

export const getProductToCart = async (token: any) => {

  const res = await jsonAsync(import.meta.env.VITE_VIEWPRODUCTCART, "GET", '', {
    Authorization: 'Bearer ' + token,
  });

  if (res.ok) {
    return res;
  } else{
    //sesion vencida
    localStorage.removeItem('user');
    //window.location.reload();
  }
  return res.body

};


export const setCheckout = async (token: any) => {

  const res = await jsonAsync(import.meta.env.VITE_CHECKOUT, "POST", '', {
    Authorization: 'Bearer ' + token,
  });

  if (res.ok) {
    return res;
  } else{
    //sesion vencida
    localStorage.removeItem('user');
    //window.location.reload();
  }
  return res.body

};