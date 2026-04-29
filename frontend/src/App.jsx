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
import SagaDetail from "./pages/SagaDetail/SagaDetail";
import AdminDashboard from "./pages/Admin/Dashboard/Dashboard";
import AdminUniverses from "./pages/Admin/Universes/AdminUniverses";
import AdminCharacters from "./pages/Admin/Characters/AdminCharacters";
import AdminComics from "./pages/Admin/Comics/AdminComics";
import AdminSagas from "./pages/Admin/Sagas/AdminSagas";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/universos" element={<Universes />} />
          <Route path="/universos/:slug" element={<UniverseDetail />} />
          <Route
            path="/universos/:universoSlug/sagas/:sagaSlug"
            element={<SagaDetail />}
          />
          <Route path="/personagens" element={<Characters />} />
          <Route path="/personagens/:slug" element={<CharacterDetail />} />
          <Route path="/hqs/:slug" element={<ComicDetail />} />

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
            path="/admin/universos"
            element={
              <PrivateRoute>
                <AdminUniverses />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/personagens"
            element={
              <PrivateRoute>
                <AdminCharacters />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/hqs"
            element={
              <PrivateRoute>
                <AdminComics />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/sagas"
            element={
              <PrivateRoute>
                <AdminSagas />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
