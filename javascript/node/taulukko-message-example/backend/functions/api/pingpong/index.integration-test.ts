import axios, { AxiosInstance } from "axios";

const PORT = Number(process.env.PORT) || 8080;
const client = axios.create();
const wrongclient = axios.create();

const TAULUKKO_EMAIL_TEST: string = "minsc2019@gmail.com";
const TAULUKKO_APP_TOKEN: string = "000001-1lUw3sStt_JelyzdwrgR20zOycQ5IjcwBFZqQXUWRI";
const SERVICE_URL_ACCOUNT: string = `http://localhost:${PORT}/profile/`;
const SERVICE_URL_LOGIN: string = `http://localhost:${PORT}/signin/internal-login`;
const SERVICE_URL: string = `http://localhost:${PORT}/campaign`;

const beforeAll = async () => {

    for (let i = 0; i < 20; i++) {
        console.info("");
    }

    let parameters = { tokenApp: TAULUKKO_APP_TOKEN, tokenUser: undefined };

    wrongclient.interceptors.request.use((config) => {

        if (!config.data) {
            config.data = parameters;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const callback = await wrongclient.post(SERVICE_URL_LOGIN, { email: TAULUKKO_EMAIL_TEST });

    parameters = { tokenUser: callback.data.token, tokenApp: TAULUKKO_APP_TOKEN };

    client.interceptors.request.use((config) => {

        if (!config.data) {
            config.data = parameters;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

};

const printStartTest = (name: string) => {
    console.info(`==================================================================`);
    console.info(`==================================================================`);
    console.info(`======Iniciando testes para : ${name}===`);
    console.info(`==================================================================`);
    console.info(`==================================================================`);
};

const testCampaignAdd = async () => {

    printStartTest(`testCampaignAdd em ${SERVICE_URL_ACCOUNT}`);

    const argsWrong = { name: "wrong", description: "wrong" };

    const argsBase = {
        name: "Campaign 1",
        description: "Description 1",
    };

    console.info(`===Iniciando testes para : testCampaignAdd em ${SERVICE_URL}===`);

    console.info("Teste utilizando API KEY e API IDs corretos :");
    try {
        const callback = await client.put(SERVICE_URL, argsBase);

        console.info("Success!!!=>", callback.data);
    } catch (error) {
        console.info("Faill!!!=>", error.message);
    }

    console.info("Teste utilizando API KEY e API IDs errados :");

    try {
        const callback = await wrongclient.put(SERVICE_URL, argsWrong);
        console.info("Faill!!!=>", callback);
    } catch (error) {
        console.info("Success!!!=>", error.message);
    }
};

const testLoadCampaignByID = async () => {
    let callback = await client.post(SERVICE_URL_ACCOUNT);

    const cmpLink: string = callback.data.allcampaigns.contents[0];

    console.info(`===Iniciando testes para :testLoadCampaignByID em ${cmpLink}===`);

    console.info("Teste utilizando API KEY e API IDs corretos :");
    try {

        callback = await client.get(cmpLink);
        console.info("Success!!!=>", callback.data);

    } catch (error) {
        console.info("Faill!!!=>", error.message);
    }

    console.info("Teste utilizando API KEY e API IDs errados :");
    try {
        callback = await wrongclient.get(cmpLink + "wrong");
        console.info("Faill!!!=>", callback);
    } catch (error) {
        console.info("Success!!!=>", error.message);
    }
};

const testAll = async () => {
    await beforeAll();
    await testCampaignAdd();
    await testLoadCampaignByID();
};

testAll();
