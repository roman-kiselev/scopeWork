import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_URL_API,
    headers: {
        "Content-Type": "application/json",
    },
});

export const axiosInstanceIam = axios.create({
    baseURL: process.env.REACT_APP_URL_API_IAM,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export const axiosInstanceManager = axios.create({
    baseURL: process.env.REACT_APP_URL_API_MANAGER,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
});
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401) {
            const { data } = await axios.post(
                `${process.env.REACT_APP_URL_API_IAM}/authentication/refresh-tokens`,
                {},
                {
                    withCredentials: true,
                }
            );
            localStorage.setItem("token", data.data.accessToken);
            return axiosInstance.request(originalRequest);
        }
    }
);

axiosInstanceIam.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
});
axiosInstanceIam.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401) {
            const { data } = await axios.post(
                `${process.env.REACT_APP_URL_API_IAM}/authentication/refresh-tokens`,
                {},
                {
                    withCredentials: true,
                }
            );
            localStorage.setItem("token", data.data.accessToken);

            return axiosInstanceIam.request(originalRequest);
        }
    }
);

axiosInstanceManager.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

    return config;
});
axiosInstanceManager.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401) {
            const { data } = await axios.post(
                `${process.env.REACT_APP_URL_API_IAM}/authentication/refresh-tokens`,
                {},
                {
                    withCredentials: true,
                }
            );
            localStorage.setItem("token", data.data.accessToken);
            return axiosInstanceIam.request(originalRequest);
        }
    }
);
