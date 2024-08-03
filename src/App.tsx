import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { CharacterList } from "./components/CharacterList";
import { SearchCharacter } from "./components/SearchCharacter";

const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <h1 className="my-10">Star Wars</h1>
      <QueryClientProvider client={queryClient}>
        <SearchCharacter />
        <CharacterList />
      </QueryClientProvider>
    </div>
  );
}

export default App;
