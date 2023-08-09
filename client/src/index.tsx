import React from "react";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import {QueryClientProvider, QueryClient} from "react-query";
import App from "./app";
import store from "./app/store";
import "./index.css";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient();
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <DevSupport ComponentPreviews={ComponentPreviews}
                            useInitialHook={useInitial}
                >
                    <App/>
                </DevSupport>
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>
);
