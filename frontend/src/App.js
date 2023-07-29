import logo from "./logo.svg";
import "./App.css";
import Books from "./Books";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Books />
      </QueryClientProvider>
    </div>
  );
}

export default App;
