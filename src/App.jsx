import { Posts } from "./Posts";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import "./App.css";

const queryClient = new QueryClient();

function App() {
    return (
        // provide React Query client to App
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <ReactQueryDevtools />
                <h1>Blog Posts</h1>
                <Posts />
            </div>
        </QueryClientProvider>
    );
}

export default App;
