import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './app'
import store from './app/store'
import './index.css'


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
const queryClient = new QueryClient()
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>

                <App />

            </QueryClientProvider>
        </Provider>
    </React.StrictMode>
)
