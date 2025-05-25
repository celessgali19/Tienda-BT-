import { jsonAsync } from "../../components/helpers/utils";


type Login = {
  email: string;
  password: string;
};

export const login = async (data: Login) => {

  const res = await jsonAsync(import.meta.env.VITE_LOGIN, "POST", data);
  if (res.ok) {
      return res;
  }
  return res.body
 
};