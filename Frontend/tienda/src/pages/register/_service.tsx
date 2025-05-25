import { jsonAsync } from "../../components/helpers/utils";

type Register = {
    name: string,
    lastName: string,
    email: string,
    shippingAddress:string,
    birthDate: string,
    password: string
};
export const register = async (data: Register) => {

    const res = await jsonAsync(import.meta.env.VITE_REGISTER, "POST", data, {}, false);
    if (res.ok) {
        return res;
    }
    return res.body

};