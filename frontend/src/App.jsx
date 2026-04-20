import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Universes from "./pages/Universes/Universes";
import UniverseDetail from "./pages/UniverseDetail/UniverseDetail";
import Characters from "./pages/Characters/Characters";
import CharacterDetail from "./pages/CharacterDetail/CharacterDetail";
import ComicDetail from "./pages/ComicDetail/ComicDetail";
import AdminDashboard from "./pages/Admin/Dashboard/Dashboard";
import AdminUniverses from "./pages/Admin/Universes/AdminUniverses";
import AdminCharacters from "./pages/Admin/Characters/AdminCharacters";
import AdminComics from "./pages/Admin/Comics/AdminComics";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          {/* Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/universes" element={<Universes />} />
          <Route path="/universes/:id" element={<UniverseDetail />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/:id" element={<CharacterDetail />} />
          <Route path="/comics/:id" element={<ComicDetail />} />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/universes"
            element={
              <PrivateRoute>
                <AdminUniverses />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/characters"
            element={
              <PrivateRoute>
                <AdminCharacters />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/comics"
            element={
              <PrivateRoute>
                <AdminComics />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
