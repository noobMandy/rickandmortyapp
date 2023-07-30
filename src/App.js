import React, { Suspense,useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import CharacterList from "./components/CharacterList";
import EpisodeList from "./components/EpisodeList";
import LocationList from "./components/LocationList";

const queryClient = new QueryClient();

const App = () => {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Rick and Morty App</h1>

        <h2>Click any below options to choose</h2>
        <div className="btn-container">
          <button onClick={() => setSelectedOption("characters")}>
            Characters
          </button>
          <button onClick={() => setSelectedOption("episodes")}>
            Episodes
          </button>
          <button onClick={() => setSelectedOption("locations")}>
            Locations
          </button>
        </div>

        <div>
        <Suspense fallback={<div>Loading...</div>}>
          {selectedOption === "characters" && <CharacterList />}
          {selectedOption === "episodes" && <EpisodeList />}
          {selectedOption === "locations" && <LocationList />}
          </Suspense>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;
