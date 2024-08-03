import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { CharacterList } from "./components/CharacterList";
import { SearchCharacter } from "./components/SearchCharacter";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchCharacter />
      <CharacterList />
    </QueryClientProvider>
  );
}

export default App;
