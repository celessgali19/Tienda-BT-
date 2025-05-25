import { jsonAsync } from "../../components/helpers/utils";


export const getInformationProfile = async (id:number, token: any) => {

  const res = await jsonAsync(`${import.meta.env.VITE_GETUSER}${id}`, "GET", '', {
    Authorization: 'Bearer ' + token,
  });
  if (res.ok) {
    return res;
  }
  return res.body

};