import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import App from "./app";
import store from "./app/store";
import "./index.css";
import AuthMiddleware from "./shared/middlewares/AuthMiddleware";
//  Hello
const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient();
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <CookiesProvider>
                    <AuthMiddleware>
                        <App />
                    </AuthMiddleware>
                </CookiesProvider>
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>
);
