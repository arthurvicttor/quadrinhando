import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
// import Home from "./pages/Home/Home";
// import Universes from "./pages/Universes/Universes";
// import UniverseDetail from "./pages/UniverseDetail/UniverseDetail";
// import Characters from "./pages/Characters/Characters";
// import CharacterDetail from "./pages/CharacterDetail/CharacterDetail";
// import ComicDetail from "./pages/ComicDetail/ComicDetail";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/universes" element={<Universes />} /> */}
          {/* <Route path="/universes/:id" element={<UniverseDetail />} /> */}
          {/* <Route path="/characters" element={<Characters />} /> */}
          {/* <Route path="/characters/:id" element={<CharacterDetail />} /> */}
          {/* <Route path="/comics/:id" element={<ComicDetail />} /> */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
