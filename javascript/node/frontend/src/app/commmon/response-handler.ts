import {Response} from "./response";
 

/*
Trata erros do framework http
*/export async function responseHandler<T>(runnable: () => Promise<Response<T>>): Promise<Response<T>> {
    try {
        return await runnable();
    } catch (e) {
        console.log(e);
        return { code: 503, data: "Serviço Indisponível. Tente mais tarde." };
    }
};
